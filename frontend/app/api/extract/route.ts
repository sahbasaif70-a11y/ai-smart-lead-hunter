import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import OpenAI from 'openai';
import Tesseract from 'tesseract.js';

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Groq/OpenAI Config
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function POST(req: Request) {
  try {
    const { image, cardType } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // 1. Local OCR with Buffer
    console.log("Step 1: Running OCR...");
    const base64Data = image.split(",")[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');

    // 2. Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, { folder: "lead_hunter_scans" });
    const imageUrl = uploadRes.secure_url;

    // 3. AI Parsing
    console.log(`Step 2: AI Parsing for ${cardType}...`);
    const systemPrompt = `
        You are a professional data extractor.
        The provided text is messy OCR output from a ${cardType}.
        Fix all spelling errors and identify fields based on patterns.
        Return ONLY a JSON object.
        Fields for CNIC: name, father_name, identity_number, date_of_birth, country_of_stay, gender
        Fields for Business Card: name, job_title, company, email, phone, website, address
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

    return NextResponse.json({ success: true, data: extractedData, imageUrl });

  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
