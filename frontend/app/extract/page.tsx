"use client";
import { useState, useEffect } from "react";
import { Check, ArrowLeft, Loader2 } from "lucide-react";
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
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem("scannedData");
        const savedImage = localStorage.getItem("scannedImage");
        const savedType = localStorage.getItem("scannedType") || "business";

        if (savedData) setFormData(JSON.parse(savedData));
        if (savedImage) setImageUrl(savedImage);
        setCardType(savedType);
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to save leads.");
                router.push("/login");
                return;
            }
            const API_URL = "http://localhost:5000";
            const response = await fetch(`${API_URL}/api/save-lead`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    cardType,
                    extractedData: formData,
                    imageUrl
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Server error");
            }

            const result = await response.json();
            if (result.success) {
                alert("Lead Saved Successfully!");
                router.push("/records");
            } else {
                alert("Error: " + result.error);
            }
        } catch (error: any) {
            console.error("Save Error:", error);
            alert("Error: " + (error.message || "Connection failed."));
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#020617] p-4 md:p-10 pt-20 bg-grid">
            <div className="max-w-6xl mx-auto">
                <Link href="/scan" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-10 font-bold uppercase tracking-widest text-[10px]">
                    <ArrowLeft size={16} /> Back to Scanner
                </Link>

                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-white font-space uppercase tracking-tight">Review Result</h2>
                    <p className="text-gray-500 text-sm mt-1">Verify and save extracted business card data</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* LEFT SIDE - Preview */}
                    <div className="lg:col-span-5 bg-[#020617]">
                        <div className="bg-white/5 border border-white/10 rounded-[40px] p-6 shadow-2xl sticky top-24 bg-[#020617]">
                            <div className="aspect-[3/2] rounded-3xl overflow-hidden bg-black/40 border border-white/5 shadow-inner mb-8">
                                <img src={imageUrl} className="w-full h-full object-cover scale-110" alt="Scanned Card" />
                            </div>
                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-[0.2em]">
                                    <span className="text-gray-500">Document Type</span>
                                    <span className="text-white px-3 py-1 bg-white/5 rounded-lg border border-white/5">Business Card</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-[0.2em]">
                                    <span className="text-gray-500">Status</span>
                                    <span className="text-emerald-400">Processed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Data Form */}

                    <div className="lg:col-span-7 bg-[#020617] bg-[#0f172a]/40 border border-white/5 rounded-[48px] p-8 md:p-12 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                            <FormField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                            <FormField label="Job Title" name="job_title" value={formData.job_title} onChange={handleChange} />
                            <FormField label="Company" name="company" value={formData.company} onChange={handleChange} />
                            <FormField label="Email" name="email" value={formData.email} onChange={handleChange} />
                            <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                            <FormField label="Website" name="website" value={formData.website} onChange={handleChange} />
                            <FormField label="Address" name="address" value={formData.address} onChange={handleChange} full />
                        </div>

                        <div className="flex gap-4 mt-12">
                            <button
                                onClick={() => router.push("/scan")}
                                className="flex-1 py-4 rounded-2xl border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 py-4 bg-gradient-to-r from-cyan-400 to-blue-700 hover:opacity-90 disabled:opacity-50 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest text-white shadow-2xl shadow-blue-600/40 transition-all flex items-center justify-center gap-2">
                                {saving ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                                {saving ? "Saving..." : "Save Lead"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

function FormField({ label, name, value, onChange, full }: any) {
    return (
        <div className={`space-y-2.5 ${full ? "md:col-span-2" : ""}`}>
            <label className="text-[10px] text-gray-600 uppercase font-extrabold tracking-[0.2em] ml-2">
                {label}
            </label>
            <div className="relative group">
                <input
                    type="text"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                    placeholder={`No ${label.toLowerCase()} found`}
                />
                {value && (
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                        <Check className="text-emerald-500" size={16} />
                    </div>
                )}
            </div>
        </div>
    );
}
