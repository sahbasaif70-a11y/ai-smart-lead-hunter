import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import OpenAI from 'openai';
import Tesseract from 'tesseract.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function POST(req: Request) {
  try {
    const { image, cardType } = await req.json();
    const base64Data = image.split(",")[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // OCR
    const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');

    // Cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, { folder: "lead_hunter_scans" });
    const imageUrl = uploadRes.secure_url;

    // AI
    const systemPrompt = `Extract ${cardType} data to JSON: name, father_name, identity_number, date_of_birth, country_of_stay, gender or name, job_title, company, email, phone, website, address`;
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: text }],
      response_format: { type: "json_object" }
    });

    return NextResponse.json({ success: true, data: JSON.parse(completion.choices[0].message.content || "{}"), imageUrl });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
