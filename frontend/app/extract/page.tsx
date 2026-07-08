"use client";
import { useState, useEffect } from "react";
import { RotateCcw, Check, Camera, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ExtractScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        job_title: "",
        company: "",
        email: "",
        phone: "",
        website: "",
        address: ""
    });
    const [imageUrl, setImageUrl] = useState("/card-sample.png");
    const [cardType, setCardType] = useState("business");

    useEffect(() => {
        const savedData = localStorage.getItem("scannedData");
        const savedImage = localStorage.getItem("scannedImage");
        const savedType = localStorage.getItem("scannedType") || "business";

        if (savedData) setFormData(JSON.parse(savedData));
        if (savedImage) setImageUrl(savedImage);
        setCardType(savedType);
    }, []);

    // Fields definition based on card type
    const getFields = () => {
        switch(cardType) {
            case 'cnic':
                return [
                    { label: "Full Name", name: "name" },
                    { label: "Father Name", name: "father_name" },
                    { label: "CNIC Number", name: "identity_number" },
                    { label: "Date of Birth", name: "date_of_birth" },
                    { label: "Country of Stay", name: "country_of_stay" },
                    { label: "Gender", name: "gender" }
                ];
            case 'passport':
                return [
                    { label: "Passport Number", name: "passport_number" },
                    { label: "Surname", name: "surname" },
                    { label: "Given Names", name: "given_names" },
                    { label: "Nationality", name: "nationality" },
                    { label: "Date of Birth", name: "date_of_birth" },
                    { label: "Expiry Date", name: "date_of_expiry" }
                ];
            case 'license':
                return [
                    { label: "License Number", name: "license_number" },
                    { label: "Full Name", name: "name" },
                    { label: "Father/Husband Name", name: "father_husband_name" },
                    { label: "Expiry Date", name: "date_of_expiry" },
                    { label: "Address", name: "address", full: true }
                ];
            default:
                return [
                    { label: "Full Name", name: "name" },
                    { label: "Job Title", name: "job_title" },
                    { label: "Company", name: "company" },
                    { label: "Email", name: "email" },
                    { label: "Phone", name: "phone" },
                    { label: "Website", name: "website" },
                    { label: "Address", name: "address", full: true }
                ];
        }
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const API_URL = "https://ai-smart-lead-hunter.onrender.com";
      const response = await fetch(`${API_URL}/api/save-lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cardType,
                    extractedData: formData,
                    imageUrl
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Server responded with an error");
            }

            const result = await response.json();
            if (result.success) {
                alert("Lead Saved Successfully to Database!");
                router.push("/records");
            } else {
                alert("Database Error: " + result.error);
            }
        } catch (error: any) {
            console.error("Save Error:", error);
            alert("Error: " + (error.message || "Could not connect to backend server. Check if backend is running on port 5000."));
        }
    };

    return (
        <main className="min-h-screen p-4 md:p-10 bg-[#020617] bg-grid">
            <div className="max-w-6xl mx-auto">
                <Link href="/scan" className="text-gray-500 hover:text-white flex items-center gap-2 mb-6 transition-colors">
                    <ArrowLeft size={16} /> Back to Scanner
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white font-space">Review Lead</h2>
                        <p className="text-gray-500 text-sm mt-1">Verify and refine the extracted business card info</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* LEFT SIDE - Card Preview */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-10 space-y-6">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl">
                                <div className="rounded-xl overflow-hidden bg-black/40 border border-white/5">
                                    <img src={imageUrl} className="w-full h-full object-cover aspect-[3/2] md:aspect-auto" alt="Scanned Card" />
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-white font-bold uppercase tracking-wider">Source</span>
                                        <span className="text-gray-500 uppercase">{cardType} Card</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-white font-bold uppercase tracking-wider">Status</span>
                                        <span className="text-emerald-400 font-bold">Processed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Form Fields */}
                    <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {getFields().map((field) => (
                                <div key={field.name} className={`space-y-2 ${field.full ? "md:col-span-2" : ""}`}>
                                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-1">
                                        {field.label}
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name={field.name}
                                            value={(formData as any)[field.name] || ""}
                                            onChange={handleChange}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                                            placeholder={`No ${field.label} detected`}
                                        />
                                        {(formData as any)[field.name] && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <Check className="text-emerald-500" size={16} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-10">
                            <button className="flex-1 py-4 rounded-xl border border-white/10 text-sm font-bold text-gray-400 hover:bg-white/10 transition-all">
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition-all">
                                Save Lead
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
