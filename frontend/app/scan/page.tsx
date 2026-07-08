"use client";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Zap, RotateCcw, Camera, Lightbulb, CreditCard, User, Globe, Car } from "lucide-react";
import Link from "next/link"; 
import { useRouter } from "next/navigation";

export default function ScanPage() {
    const router = useRouter();
    const webcamRef = useRef<Webcam>(null);
    const [status, setStatus] = useState("Initializing..");
    const [cardType, setCardType] = useState("business"); // Dynamic Type
    const [loading, setLoading] = useState(false);

    const cardOptions = [
      { id: 'business', label: 'Business', icon: <CreditCard size={18} /> },
      { id: 'cnic', label: 'CNIC', icon: <User size={18} /> },
      { id: 'passport', label: 'Passport', icon: <Globe size={18} /> },
      { id: 'license', label: 'License', icon: <Car size={18} /> },
    ];

    const capture = useCallback(async () => {
      const video = webcamRef.current?.video;
      if (video) {
        setLoading(true);
        try {
          // 1. Create a canvas to crop the image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas size to the card's aspect ratio (3:2)
          const outputWidth = 1200;
          const outputHeight = 800;
          canvas.width = outputWidth;
          canvas.height = outputHeight;

          if (ctx) {
            // Calculate cropping area from the video feed
            // We want to capture the central 85% width area as seen in the UI mask
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // On mobile, video might be portrait or landscape.
            // We assume horizontal card placement.
            const sourceWidth = videoWidth * 0.85;
            const sourceHeight = sourceWidth * (2/3);
            const sourceX = (videoWidth - sourceWidth) / 2;
            const sourceY = (videoHeight - sourceHeight) / 2;

            ctx.drawImage(
              video,
              sourceX, sourceY, sourceWidth, sourceHeight, // Source (webcam)
              0, 0, outputWidth, outputHeight             // Destination (canvas)
            );

            const croppedImage = canvas.toDataURL("image/jpeg", 0.9);

            const API_URL = "https://ai-smart-lead-hunter.onrender.com";
            const response = await fetch(`${API_URL}/api/extract`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: croppedImage, cardType: cardType })
            });

            const result = await response.json();
            if (result.success) {
              localStorage.setItem("scannedData", JSON.stringify(result.data));
              localStorage.setItem("scannedImage", result.imageUrl);
              localStorage.setItem("scannedType", cardType);
              router.push("/extract");
            } else {
              alert("AI Failed: " + result.error);
            }
          }
        } catch (error) {
          console.error("Capture Error:", error);
          alert("Error capturing card. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    }, [webcamRef, cardType, router]);

    useEffect(() =>{
        if(typeof window !== "undefined"){
            if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
                setStatus("Error:Browser does not support camera access.");
                alert("Browser Error: Camera access not supported on the browser.");
                }else {
                    setStatus("Camera ready. Waiting for permission...");
                    }
                }
        },[]);
    
  return (
    <main className="min-h-screen bg-[#020617] bg-grid flex flex-col items-center p-2 md:p-8 md:pt-20 ">
      <div className="max-w-4xl w-full  bg-[#020617] border border-white/5 rounded-3xl py-2 px-4 md:p-6 lg:px-8 shadow-3xl">

        {/* --- 1. HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8 w-full">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-space uppercase tracking-tight">Scan Card</h2>
            <p className="text-gray-500 text-[10px] md:text-xs">Select document type to start scanning</p>
          </div>

          {/* Visual Card Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {cardOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCardType(opt.id)}
                className={`flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] p-2 rounded-xl border transition-all ${
                  cardType === opt.id
                  ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                  : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                }`}
              >
                {opt.icon}
                <span className="text-[9px] mt-1 font-bold uppercase tracking-tighter">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- 2. MAIN SCANNER & CONTROLS --- */}

        <div className="flex flex-col lg:flex-row gap-6 w-full mb-8 md:mb-10">

          {/* A: CAMERA VIEWPORT (Left Side) */}
          <div className="flex-grow relative aspect-[3/2] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 group shadow-2xl bg-black">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
              className="w-full h-full object-cover"
              playsInline
              videoConstraints={{
                facingMode: "environment",
                width: { ideal: 1920 },
                height: { ideal: 1080 },
              }}
            />

            {/* Dark Overlay Mask */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full absolute inset-0 bg-black/40"></div>
              {/* Clear hole in the middle for the card */}
              <div className="w-[85%] aspect-[3/2] border-2 border-cyan-400/50 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] z-10 relative">
                {/* Viewfinder Corners */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-md"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-md"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-md"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-md"></div>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Auto-detect Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[8px] md:text-[10px] text-white font-medium uppercase tracking-wider">
                  Position Card <span className="text-emerald-400 font-bold">Inside Frame</span>
                </span>
              </div>

              {/* Animated Scan Line */}
              <div className="animate-scan"></div>
            </div>
          </div>

          {/* B: CONTROLS PANEL (Right Side) */}
          <div className="w-full lg:w-56 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6 flex flex-col items-center gap-6 md:gap-8 ">
              <p className="text-[10px]  text-left text-white font-bold uppercase tracking-widest">Controls</p>

              <div className="flex justify-between w-full px-2">
                <div className="flex flex-col items-center gap-1"><button className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 transition-colors">< Zap size={14}/></button><span className="text-[8px] text-gray-500 font-bold">FLASH</span></div>
                <div className="flex flex-col items-center gap-1"><button className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 transition-colors">< RotateCcw size={14} /></button><span className="text-[8px] text-gray-500 font-bold">AUTO</span></div>
                <div className="flex flex-col items-center gap-1"><button className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 transition-colors">< Camera size={14}/></button><span className="text-[8px] text-gray-500 font-bold">FLIP</span></div>
              </div>

              {/* Capture Button */}
              <button
              onClick={capture} disabled={loading}
              className="w-20 h-20 rounded-full border-4 border-white p-1 hover:scale-105 transition-all active:scale-95 shadow-xl">
                <div className="w-full h-full bg-blue-600 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)]"></div>
                { loading ? "Scanning...":"CAPTURE"}
              </button>
            </div>

            {/* Upload Box */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6 text-center">
              <p className="text-[10px] text-gray-500 mb-3 uppercase font-bold ">Or upload image</p>
              <div className="border-2 border-dashed border-white/10 rounded-xl py-4 hover:border-blue-500/50 transition-all cursor-pointer group">
                <p className="text-xs text-white font-medium group-hover:text-blue-400">Click to upload</p>
                <p className="text-[9px] text-gray-500 ">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. BOTTOM STEPPER --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">

          {/* Step 1 (Active) */}
          <div className="flex items-center gap-4 bg-blue-600/10 border border-blue-500/30 rounded-2xl p-3 md:p-4">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] md:text-xs font-bold shrink-0">1</div>
            <div>
              <h4 className="text-white text-[10px] md:text-xs font-bold">Position Card</h4>
              <p className="text-gray-500 text-[8px] md:text-[10px]">Place card in frame</p>
            </div>
          </div>

          {/* Steps 2, 3, 4 (Inactive Loop) */}
          {[
            { id: 2, title: "Capture", desc: "Auto-detect edges" },
            { id: 3, title: "Extract", desc: "AI extracts data" },
            { id: 4, title: "Save", desc: "Add to your records" }
          ].map((step) => (
            <div key={step.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3 md:p-4 opacity-70">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 text-[10px] md:text-xs font-bold shrink-0">{step.id}</div>
              <div>
                <h4 className="text-gray-400 text-[10px] md:text-xs font-bold">{step.title}</h4>
                <p className="text-gray-600 text-[8ox] md:text-[10px]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}