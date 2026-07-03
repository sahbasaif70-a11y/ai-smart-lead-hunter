import { RotateCcw, Check, Camera } from "lucide-react";

export default function extractScreen(){
    return(
        <main className=" p-4 md:p-10 bg-grid">
       <div className="flex justify-between items-center  md:px-8 mb-6">
        <div>
            <h2 className="text-xl font-bold text-white font-space">Extracted Data</h2>
            <p className="text-gray-500 text-xs mt-1">Review and edit the extracted information</p>
        </div>
        { /* AI Confidence Badge */}
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"> </div>
        <span className="text-[8px] md:text-[10px] text-emerald-400 font-bold uppercase ">
            AI Confidence: 98%
        </span>
        </div>
       </div> 
       {/* Main Content Area */}
       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:pl-8  ">
        {/* A: LEFT SIDE -Card Preview(Col-span 4) */}
        <div className="md:col-span-5 space-y-6  bg-[#020617]/80">
            <div className=" border border-white/10 overflow-hidden rounded-xl p-4 pt-15">
            <div className="aspect-[3/2] rounded-2xl border border-white/10 overflow-hidden bg-white/5 shadow-2xl">
            <img src="/card-sample.png" className="w-full h-full object-cover opacity-80" alt="Scanned Card"/>
            </div>
            <hr className="border-t border-white/10 my-5" />
            <div className="space-y-3 px-1">
                <div className="flex j text-[15px] ">
                    <span className="  text-white font-bold">Source:</span>
                    <span className="text-gray-500 pl-2" >Business Card</span>
                </div>
                <div className="flex j text-[15px] ">
                    <span className="  text-white font-bold">Scanned:</span>
                    <span className="text-gray-500 pl-2" >JULY 2, 2026 . 04:41 PM</span>
                </div>
                <button className="mx-auto w-60 mt-4 mb-3 py-2   rounded-xl border border-white/10  text-[13px] text-gray-400 hover:bg-white/10 flex items-center justify-center gap-2 transition-all">
                <Camera size={14}/> Replace Image
                </button>
            </div>
            </div>
        </div>
        {/* B: RIGHT SIDE - Form Fields(Col-span 8) */}
        <div className="md:col-span-6 span-y-3  bg-[#020617]/80 ">
            {/* Form Fields */}
            <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                    <input type="text" defaultValue={"Alex Morgan"} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"/>
                    {/* Success Checkmark Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emarald-500">
                    <Check className="text-emerald-500 " size={20} />
                        </div>
                </div>
            </div>
             <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider ml-1">Job Title</label>
                <div className="relative group">
                    <input type="text" defaultValue={"Sales Manager"} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"/>
                    {/* Success Checkmark Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emarald-500">
                    <Check className="text-emerald-500 " size={20} />
                        </div>
                </div>
            </div>
             <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider ml-1">Company</label>
                <div className="relative group">
                    <input type="text" defaultValue={"Example Inc."} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"/>
                    {/* Success Checkmark Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emarald-500">
                    <Check className="text-emerald-500 " size={20}/>
                        </div>
                </div>
            </div>
             <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider ml-1">Email</label>
                <div className="relative group">
                    <input type="text" defaultValue={"alex_morgan@gmail.com"} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"/>
                    {/* Success Checkmark Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emarald-500">
                    <Check className="text-emerald-500 " size={20} />
                        </div>
                </div>
            </div>
             <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider ml-1">Phone</label>
                <div className="relative group">
                    <input type="text" defaultValue={"+1(555)123-4567"} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"/>
                    {/* Success Checkmark Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emarald-500">
                    <Check className="text-emerald-500 " size={20} />
                        </div>
                </div>
            </div>
             <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider ml-1">Website</label>
                <div className="relative group">
                    <input type="text" defaultValue={"www.example.com"} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"/>
                    {/* Success Checkmark Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2  text-emarald-500">
                    <Check className="text-emerald-500 " size={20} />
                        </div>
                </div>
            </div>
             <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider ml-1">Address</label>
                <div className="relative group">
                    <input type="text" defaultValue={"123 Business, New York, Ny"} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"/>
                    {/* Success Checkmark Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emarald-500">
                    <Check className="text-emerald-500 " size={20} />
                        </div>
                </div>
            </div>
            <div className="flex gap-4 mt-4">
                <button className="flex-1 py-3 rounded-xl border border-white/10 border-white/5 text-sm font-bold text-gray-400 hover:bg-white/10 transition-all">
                Save to Draft
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-cyan-400 to-blue-700 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all px-8">
                Save to CRM
                </button>
            </div>
        </div>
       </div>
       </main>
    );
}