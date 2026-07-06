import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import OpenAI from 'openai';
import Tesseract from 'tesseract.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(cors());
app.use(express.json({ limit: '10mb'}));

app.post('/api/extract', async (req: any, res: any) => {
    try {
        const { image, cardType } = req.body;
        if (!image) return res.status(400).json({ error: "No image provided" });

        // 1. Local OCR with Buffer (Better reliability)
        console.log("Step 1: Running Local OCR...");
        const imageBuffer = Buffer.from(image.split(",")[1], 'base64');
        const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');

        console.log("--- OCR RAW OUTPUT ---");
        console.log(text); // Check your terminal to see this!
        console.log("----------------------");

        // 2. Upload for preview
        const uploadRes = await cloudinary.uploader.upload(image, { folder: "lead_hunter_scans" });
        const imageUrl = uploadRes.secure_url;

        // 3. AI Intelligent Parsing
        console.log(`Step 2: AI Parsing for ${cardType}...`);

        const systemPrompt = `
            You are a professional data extractor.
            The provided text is messy OCR output from a ${cardType}.
            Fix all spelling errors and identify fields based on patterns.

            RULES for CNIC:
            - Find a 13-digit number (e.g. 35405-0743082-6) -> identity_number.
            - Name is usually the first clean line. Father name is the second.
            - Find "Pakistan" -> country_of_stay.

            Return ONLY a JSON object with these keys:
            ${cardType === 'cnic' ? 'name, father_name, identity_number, date_of_birth, country_of_stay, gender' : 'name, job_title, company, email, phone, website, address'}
        `;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Raw OCR Text: ${text}` }
            ],
            response_format: { type: "json_object" }
        });

        const extractedData = JSON.parse(completion.choices[0].message.content || "{}");

        console.log("Success! Extracted:", extractedData);
        res.json({ success: true, data: extractedData, imageUrl });

    } catch (error: any) {
        console.error("System Error:", error.message);
        res.status(500).json({ success: false, error: "Extraction failed. Please ensure the card is clear." });
    }
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
