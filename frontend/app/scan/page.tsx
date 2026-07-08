"use client";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Zap, RotateCcw, Camera, Lightbulb, CreditCard, User, Globe, Car, Plus, Check } from "lucide-react";
import Link from "next/link"; 
import { useRouter } from "next/navigation";

export default function ScanPage() {
    const router = useRouter();
    const webcamRef = useRef<Webcam>(null);
    const [status, setStatus] = useState("Initializing..");
    const [cardType, setCardType] = useState("business");
    const [loading, setLoading] = useState(false);
    const [capturedImages, setCapturedImages] = useState<string[]>([]);

    const cardOptions = [
      { id: 'business', label: 'Business', icon: <CreditCard size={18} /> },
      { id: 'cnic', label: 'CNIC', icon: <User size={18} /> },
      { id: 'passport', label: 'Passport', icon: <Globe size={18} /> },
      { id: 'license', label: 'License', icon: <Car size={18} /> },
    ];

    const handleCapture = useCallback(() => {
        const video = webcamRef.current?.video;
        if (video) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Set canvas size to a high resolution for better OCR
            const outputWidth = 1200;
            const outputHeight = 800;
            canvas.width = outputWidth;
            canvas.height = outputHeight;

            if (ctx) {
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;

                // Crop the central 85% area (matching our UI mask)
                const cropWidth = videoWidth * 0.85;
                const cropHeight = cropWidth * (2/3);
                const startX = (videoWidth - cropWidth) / 2;
                const startY = (videoHeight - cropHeight) / 2;

                ctx.drawImage(
                    video,
                    startX, startY, cropWidth, cropHeight, // Source
                    0, 0, outputWidth, outputHeight       // Destination
                );

                const croppedImage = canvas.toDataURL("image/jpeg", 0.95);
                setCapturedImages(prev => [...prev, croppedImage]);
            }
        }
    }, [webcamRef]);

    const handleExtract = async () => {
        if (capturedImages.length === 0) return;
        setLoading(true);
        try {
            const API_URL = "https://ai-smart-lead-hunter.onrender.com";
            const response = await fetch(`${API_URL}/api/extract`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ images: capturedImages, cardType: cardType })
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
        } catch (error) {
            alert("Connection Error. Please check your internet.");
        } finally {
            setLoading(false);
        }
    };

    const resetScan = () => {
        setCapturedImages([]);
    };

  return (
    <main className="min-h-screen bg-[#020617] bg-grid flex flex-col items-center p-2 md:p-8 md:pt-20 ">
      <div className="max-w-4xl w-full  bg-[#020617] border border-white/5 rounded-3xl py-2 px-4 md:p-6 lg:px-8 shadow-3xl">

        {/* --- 1. HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8 w-full">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-space uppercase tracking-tight">Scan Card</h2>
            <p className="text-gray-500 text-[10px] md:text-xs">Capture front and back for better results</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {cardOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCardType(opt.id)}
                className={`flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] p-2 rounded-xl border transition-all ${
                  cardType === opt.id
                  ? "bg-blue-600/20 border-blue-500 text-blue-400"
                  : "bg-white/5 border-white/10 text-gray-500"
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

            {/* Viewfinder Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] aspect-[3/2] border-2 border-cyan-400/50 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] z-10 relative">
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>
              </div>
            </div>

            {loading && (
                <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
                    <p className="text-white font-bold">Processing AI Extraction...</p>
                </div>
            )}
          </div>

          {/* CONTROLS */}
          <div className="w-full lg:w-56 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col items-center gap-4">
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">Captured: {capturedImages.length}</p>

                {capturedImages.length === 0 ? (
                    <button
                        onClick={handleCapture}
                        className="w-20 h-20 rounded-full border-4 border-white p-1 hover:scale-105 transition-all">
                        <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">FRONT</div>
                    </button>
                ) : capturedImages.length === 1 ? (
                    <div className="flex flex-col gap-3 w-full">
                        <button
                            onClick={handleCapture}
                            className="w-full py-3 bg-emerald-600/20 border border-emerald-500 text-emerald-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                            <Plus size={14} /> SCAN BACK SIDE
                        </button>
                        <button
                            onClick={handleExtract}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                            <Check size={14} /> FINISH & EXTRACT
                        </button>
                        <button onClick={resetScan} className="text-[10px] text-gray-500 underline">Reset</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 w-full">
                        <div className="text-emerald-400 text-xs font-bold text-center flex items-center justify-center gap-2 mb-2">
                            <Check size={16} /> BOTH SIDES READY
                        </div>
                        <button
                            onClick={handleExtract}
                            className="w-full py-4 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-xl shadow-blue-900/40">
                            EXTRACT NOW
                        </button>
                        <button onClick={resetScan} className="text-[10px] text-gray-500 underline text-center">Start Over</button>
                    </div>
                )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
                <p className="text-[10px] text-gray-500 uppercase font-bold text-center mb-2">Gallery</p>
                <div className="flex gap-2 justify-center">
                    {capturedImages.map((img, i) => (
                        <div key={i} className="w-12 h-8 rounded border border-white/10 overflow-hidden">
                            <img src={img} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Loader2({ className, size }: any) {
    return <RotateCcw className={`${className}`} size={size} />;
}
