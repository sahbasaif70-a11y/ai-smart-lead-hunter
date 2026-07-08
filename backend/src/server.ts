import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import OpenAI from 'openai';
import Tesseract from 'tesseract.js';
import mongoose from 'mongoose';
import Lead from './models/Lead';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lead_hunter')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// Groq Setup
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: '10mb'}));

app.get('/api/health', (req, res) => {
    res.json({ status: "ok", db: mongoose.connection.readyState });
});

app.post('/api/extract', async (req: any, res: any) => {
    try {
        const { images, cardType } = req.body; // Expects an array: [frontImage, backImage]
        if (!images || images.length === 0) return res.status(400).json({ error: "No images provided" });

        let combinedText = "";
        console.log(`Step 1: Running OCR on ${images.length} images...`);

        for (const [index, img] of images.entries()) {
            const imageBuffer = Buffer.from(img.split(",")[1], 'base64');
            const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
            combinedText += `\n--- IMAGE ${index + 1} ---\n${text}`;
        }

        console.log("--- COMBINED OCR OUTPUT ---");
        console.log(combinedText);
        console.log("---------------------------");

        // Upload first image (front) for preview
        const uploadRes = await cloudinary.uploader.upload(images[0], { folder: "lead_hunter_scans" });
        const imageUrl = uploadRes.secure_url;

        // 3. AI Intelligent Parsing
        console.log(`Step 2: AI Parsing for ${cardType}...`);

        const systemPrompt = `
            You are an elite data extraction AI. Your task is to extract information from messy OCR text of a ${cardType}.
            The text may come from multiple sides (front and back) of a card. Combine all information.

            EXTRACTION RULES:
            - NAME: Look for the most prominent person's name. It's usually at the top or center-left.if multiple names ()such as partners or sub manager or sub manager) exist, then enter all names and separated them with comma.
            - JOB TITLE: Check the line directly below the name. Look for "Manager", "Executive", "Director", "Engineer", "Officer" Please accurately fetch the job title.
            - COMPANY: Look for branding at the top or near the logo. Also look for names containing "Petroleum", "Service", "Corporation", "LTD", "PVT", "Group", "Industries", "TGPS", "Taj".
            - EMAIL: Find ALL strings with "@". Even if they look broken (e.g., "pervez.sohu@tgps.pk"). Combine multiple with commas.
            - PHONE: Extract ALL numerical patterns that look like phone numbers (e.g., +92-XX-XXXXXXX, 03XX-XXXXXXX, (+92), (92-21)like patterns,. Look for labels like "Tel", "Mob", "Cell", "Ph", "Fax". If multiple numbers exist, prioritize the Mobile number. Combine them with slashes if needed.
            - WEBSITE: Look for strings containing "www" or ".com", ".pk", ".net".
            - ADDRESS: Combine all location data found (Street, Road, Building, City, Country). Look for "Head Office", "Karachi Office", "Sukkur".

            CLEANING:
            - If a field is not found, return "No [field] detected".
            - Fix OCR typos (e.g., 'v' for 'u', '0' for 'O', '1' for 'I', 'S' for '5').

            Return ONLY a valid JSON object.
            Keys: ${cardType === 'cnic' ? 'name, father_name, identity_number, date_of_birth, country_of_stay, gender' : 'name, job_title, company, email, phone, website, address'}
        `;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Raw OCR Text:\n${combinedText}` }
            ],
            response_format: { type: "json_object" },
            temperature: 0
        });

        const extractedData = JSON.parse(completion.choices[0]?.message?.content || "{}");

        console.log("Success! Extracted:", extractedData);
        res.json({ success: true, data: extractedData, imageUrl });

    } catch (error: any) {
        console.error("System Error:", error.message);
        res.status(500).json({
            success: false,
            error: error.message || "Extraction failed."
        });
    }
});

app.post('/api/save-lead', async (req: any, res: any) => {
    try {
        console.log("Saving new lead to database...");
        const { cardType, extractedData, imageUrl } = req.body;

        // DUPLICATE PROTECTION: Check if email or phone already exists
        const email = extractedData.email;
        const phone = extractedData.phone;

        if (email && !email.includes("No email detected")) {
            const existingByEmail = await Lead.findOne({ "extractedData.email": email });
            if (existingByEmail) {
                return res.status(400).json({ success: false, error: "A lead with this email already exists!" });
            }
        }

        if (phone && !phone.includes("No phone detected")) {
            const existingByPhone = await Lead.findOne({ "extractedData.phone": phone });
            if (existingByPhone) {
                return res.status(400).json({ success: false, error: "A lead with this phone number already exists!" });
            }
        }

        const newLead = new Lead({
            cardType,
            extractedData,
            imageUrl
        });

        const savedLead = await newLead.save();
        console.log("Lead saved successfully:", savedLead._id);
        res.json({ success: true, message: "Lead saved successfully!" });
    } catch (error: any) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to save lead." });
    }
});

app.get('/api/get-leads', async (req: any, res: any) => {
    try {
        console.log("Fetching leads from database...");
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json({ success: true, data: leads });
    } catch (error: any) {
        console.error("Error fetching leads:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
