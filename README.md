# 🚀 SCANVAULT - AI-Smart Lead Hunter

**SCANVAULT** is a cutting-edge, full-stack AI SaaS application designed to revolutionize lead generation. By combining Optical Character Recognition (OCR) with Large Language Models (LLMs), it allows users to instantly convert physical business cards and documents into structured, actionable digital data.

---

## ✨ Core Features

### 🧠 1. Intelligent AI Extraction Engine
*   **Dual-Layer Processing:** Combines **Tesseract.js** for raw text extraction with **Groq (Llama 3.3 70B)** for intelligent data understanding.
*   **Context-Aware Parsing:** The AI doesn't just read text; it understands the difference between a person's name, a company name, and a job title, even in messy layouts.
*   **Auto-Correction:** Automatically fixes common OCR typos and structures data into a clean JSON format.

### 📸 2. Advanced Document Capture
*   **Live Webcam Scanner:** Integrated camera interface with a professional viewfinder and real-time scan animations.
*   **Dual-Side Scanning:** Capture both the front and back of cards to ensure every detail (like addresses or extra phone numbers) is recorded.
*   **Smart Uploads:** Supports drag-and-drop file uploads for existing images from your device.

### 📊 3. Pro Lead Management Dashboard
*   **Real-time Analytics:** Track your productivity with dynamic stats like "Total Documents," "OCR Accuracy," and "Average Scan Time."
*   **Activity Timeline:** A visual history of your recent scans to keep track of your workflow.
*   **Storage Monitoring:** Visual tracking of used storage capacity with high-quality circular progress indicators.

### 🔍 4. Professional Records System
*   **Instant Search:** Find any lead in milliseconds using the optimized search bar.
*   **Image Verification:** Every saved record displays the original scanned image (hosted on Cloudinary) for quick cross-referencing.
*   **Private Vault:** Multi-user support with secure data isolation—your leads are only visible to you.

### 📥 5. Enterprise-Grade Data Export
*   **One-Click Excel Export:** Download your entire lead database as `.xlsx` files, ready for CRM import (HubSpot, Salesforce, etc.).
*   **Professional PDF Reports:** Generate clean, formatted PDF tables for offline review or sharing.

---

## 🛠 Technical Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **AI / OCR** | Groq API (Llama 3.3), Tesseract.js |
| **Media Storage** | Cloudinary |
| **Security** | JWT (JSON Web Tokens), Bcrypt |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📱 Platform Support

SCANVAULT is built with a **Mobile-First Responsive Design**, ensuring a seamless experience across all devices:

*   **💻 Desktop:** Full-featured management and bulk export capabilities on Windows, macOS, and Linux.
*   **📱 Mobile:** Optimized camera integration for scanning leads on-the-go via iOS and Android browsers.
*   **📟 Tablet:** Spacious grid layouts for detailed record review and analytics.

---

## 🚀 Getting Started

1. **Clone the repo:** `git clone https://github.com/your-username/ai-smart-lead-hunter.git`
2. **Install Frontend:** `cd frontend && npm install`
3. **Install Backend:** `cd backend && npm install`
4. **Environment Variables:** Set up your `.env` files for MongoDB, Groq, Cloudinary, and JWT.
5. **Run Dev:** `npm run dev`