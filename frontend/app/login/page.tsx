"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowRight, User } from "lucide-react";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const API_URL = "http://localhost:5000";
            const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.success) {
                if (isLogin) {
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("user", JSON.stringify(result.user));
                    router.push("/dashboard");
                } else {
                    alert("Registration successful! Please login.");
                    setIsLogin(true);
                }
            } else {
                alert(result.error);
            }
        } catch (error) {
            alert("Connection Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#0f172a] border border-white/10 rounded-[32px] p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2 font-space uppercase tracking-tight">
                        {isLogin ? "Welcome Back" : "Sign Up"}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Access your scan records
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                                placeholder="Full Name"
                            />
                        </div>
                    )}

                    <div>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-700 hover:opacity-90 disabled:opacity-50 text-white py-3 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? "Sign In" : "Register")}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-gray-400 text-sm hover:text-white"
                    >
                        {isLogin ? "New here? Create account" : "Have an account? Sign In"}
                    </button>
                </div>
            </div>
        </main>
    );
}
