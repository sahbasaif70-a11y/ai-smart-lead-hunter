"use client";
import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { RotateCcw, CreditCard, Plus, Check, Upload, Image as LucideImage } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
    const router = useRouter();
    const webcamRef = useRef<Webcam>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [cardType, setCardType] = useState("business");
    const [loading, setLoading] = useState(false);
    const [capturedImages, setCapturedImages] = useState<string[]>([]);

    const handleCapture = useCallback(() => {
        const video = webcamRef.current?.video;
        if (video) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const outputWidth = 1200;
            const outputHeight = 800;
            canvas.width = outputWidth;
            canvas.height = outputHeight;

            if (ctx) {
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;

                const cropWidth = videoWidth * 0.85;
                const cropHeight = cropWidth * (2/3);
                const startX = (videoWidth - cropWidth) / 2;
                const startY = (videoHeight - cropHeight) / 2;

                ctx.drawImage(
                    video,
                    startX, startY, cropWidth, cropHeight,
                    0, 0, outputWidth, outputHeight
                );

                const croppedImage = canvas.toDataURL("image/jpeg", 0.95);
                setCapturedImages(prev => [...prev, croppedImage]);
            }
        }
    }, [webcamRef]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapturedImages(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleExtract = async () => {
        if (capturedImages.length === 0) return;
        setLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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
    <main className="min-h-screen bg-[#020617] bg-grid flex flex-col items-center p-4 md:p-10 pt-24">
      <div className="max-w-6xl w-full bg-[#020617] border border-white/5 rounded-[32px] p-6 md:p-10 shadow-3xl">

        {/* --- 1. HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-space uppercase tracking-tight">Scan Card</h2>
            <p className="text-gray-500 text-xs mt-1">Capture business card for AI extraction</p>
          </div>

          <div className="bg-blue-600/20 border border-blue-500/50 px-6 py-2.5 rounded-xl flex items-center gap-3 text-blue-400">
            <CreditCard size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Business Card</span>
          </div>
        </div>

        {/* --- 2. MAIN SCANNER & CONTROLS --- */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">

          {/* SCANNER WINDOW */}
          <div className="flex-grow relative aspect-[3/2] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 group shadow-2xl bg-black">
            {/* Animated Scan Line */}
            <div className="animate-scan"></div>

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
              <div className="w-[85%] aspect-[3/2] border-2 border-cyan-400/30 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] z-10 relative">
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>
              </div>
            </div>

            {loading && (
                <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-md">
                    <RotateCcw className="animate-spin text-blue-500 mb-4" size={48} />
                    <p className="text-white font-bold tracking-widest uppercase text-xs">AI Extraction in progress...</p>
                </div>
            )}
          </div>

          {/* CONTROLS COLUMN - Increased width slightly (320px) */}
          <div className="w-full lg:w-[320px] space-y-6 flex flex-col">

            {/* Capture Buttons Section */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col items-center justify-center gap-6 shadow-xl">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Images: {capturedImages.length} / 2</p>

                {capturedImages.length === 0 ? (
                    <button
                        onClick={handleCapture}
                        className="w-24 h-24 rounded-full border-4 border-white/20 p-2 hover:scale-105 transition-all group relative">
                        <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-blue-700 rounded-full flex items-center justify-center text-[10px] text-white font-extrabold shadow-lg shadow-blue-600/40 uppercase tracking-widest">FRONT</div>
                        <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping -z-10"></div>
                    </button>
                ) : capturedImages.length === 1 ? (
                    <div className="flex flex-col gap-4 w-full">
                        <button
                            onClick={handleCapture}
                            className="w-full py-4 bg-emerald-600/20 border border-emerald-500 text-emerald-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600/30 transition-all">
                            <Plus size={16} /> Scan Back Side
                        </button>
                        <button
                            onClick={handleExtract}
                            className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-700 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-blue-600/40">
                            <Check size={16} /> Finish & Parse
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 w-full">
                        <div className="text-emerald-400 text-[10px] font-bold text-center flex items-center justify-center gap-2 mb-2 uppercase tracking-widest">
                            <Check size={18} /> Both Sides Captured
                        </div>
                        <button
                            onClick={handleExtract}
                            className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-700 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-600/40 uppercase tracking-widest">
                            EXTRACT NOW
                        </button>
                    </div>
                )}

                {capturedImages.length > 0 && (
                    <button onClick={resetScan} className="text-[10px] text-gray-500 font-bold uppercase tracking-widest hover:text-red-400 transition-colors">Reset</button>
                )}
            </div>

            {/* Gallery Section - Now inside the sidebar column */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 flex flex-col items-center gap-4 text-center">
              <div className="p-3 bg-white/5 rounded-2xl text-gray-400">
                <Upload size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Upload Photo</h4>
                <p className="text-gray-500 text-[10px] mt-1">Choose card image from your device</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                <LucideImage size={16} /> Browse
              </button>
            </div>

            {/* Preview Section */}
            {capturedImages.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-6">
                    <p className="text-[9px] text-gray-600 uppercase font-extrabold text-center mb-4 tracking-widest">Preview</p>
                    <div className="flex gap-2 justify-center">
                        {capturedImages.map((img, i) => (
                            <div key={i} className="w-16 h-11 rounded-lg border border-white/10 overflow-hidden bg-black">
                                <img src={img} className="w-full h-full object-cover opacity-60" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
