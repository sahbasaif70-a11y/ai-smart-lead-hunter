import Link from "next/link";
export default function Home(){
  return(

    <main className="min-h-screen bg-grid flex flex-col items-center overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-6 py-12 lg:p-10 lg:px-18 ">

  {/* --- LEFT SIDE: TEXT CONTENT --- */}
  <div className="text-center lg:text-left space-y-6 md:space-y-8 ">
    {/* Badge (Pehle wala hi use karein) */}
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[9px] md:text-[10px] font-medium tracking-widest text-blue-400 uppercase">
       <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
       AI-Powered Document Intelligence
    </div>

    {/* Heading */}
    <h1 className="text-4xl md:text-5xl sm:text-5xl font-extrabold text-white leading-tight font-space">
      Scan Extract. <br />
      <span className="bg-gradient-to-r from-cyan-400 to-blue-700 bg-clip-text text-transparent">Store Anywhere.</span>
    </h1>

    {/* Description */}
    <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
      Scan business cards, invoices and documents with AI. Automatically extract  information and save everything securely in your CRM.
    </p>

    {/* Two Buttons Group */}
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
    {/* Navigation Link ADDED */}
    <Link href="scan" className="w-full sm:w-auto">
      <button className=" sm:w-auto bg-gradient-to-r from-[#0bb9b9] to-[blue] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20 text-sm">
        Start Scanning
      </button>
      </Link>
      <button className=" sm:w-auto flex items-center gap-2 text-white border border-white/14 rounded-lg hover:bg-cyan-400 font-semibold px-7 py-3 transition-all shadow-lg shadow-blue-500/20 text-sm">
        Watch Demo <span className="text-xl">→</span>
      </button>
    </div>
  </div>


  {/* --- RIGHT SIDE: SCANNER VISUAL --- */}
  <div className="relative px-6 py-4 md:px-10 md:py-4 rounded-[32px] border border-white/14 bg-[#020617]/40 backdrop-blur-2xl shadow-[0_0_50px_-8px_rgba(34,211,238,0.3)] max-w-md w-full mx-auto lg:justify-self-end">
      {/* Top ROW: Live Preview & AI OCR */}
  {/* Top Badges */}
  <div className="flex justify-between items-center mb-6 md:mb-8">
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/30  border border-emerald-500/20 text-emerald-400 text-[9px] md:text-[10px] font-bold">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      LIVE PREVIEW
    </div>
    <div className="text-gray-500 text-[10px] md:text-[12px] font-bold tracking-widest">AI OCR</div>
  </div>

  {/* 2. SCANNING AREA (The Viewfinder)*/}
  <div className="relative p-4 md:p-8 bg-gradient-to-br from-[#02071c] to-[#020617] rounded-2xl border border-white/14 mb-6">

     {/* Blue Corners (Viewfinder) */}
     <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-500/90 "></div>
     <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-500/90"></div>
     <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-500/90"></div>
     <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-500/90"></div>

     { /* 3. ACTUAL BUSINESS CARD(The Inner Card) */}
     <div className="relative bg-gradient-to-br from-[#1e293b] to-[#00f172a] rounded-xl p-4 md:p-6 shadow-2xl border border-white/10 overflow-hidden">

     {/* Moving Scan Line */}
     <div className="animate-scan"></div>
          <div className="flex justify-between items-start">
          {/* Left Side: Info */}
          <div className="space-y-3 md:space-y-4">
            <div>
             <h4 className="text-white text-base md:text-lg font-bold">Alex Morgan</h4>
             <p className="text-[10px] md:text-xs mt-0.5">Sales Manager</p>
            </div>
            <div className="space-y-2 text-[9px] md:text-[11px]">
            <div className="flex items-center gap-2">
            <span className="opacity-70">📧</span> alex@example.com</div>
            <div className="flex items-center gap-2">
            <span className="opacity-70">🌐</span> www.scanvault.com
            </div>
            <div className="flex items-center gap-2">
             <span className="opacity-70">📍</span> New York, USA </div>
            </div>
        </div>
             {/* Right Side: Large 'M' Logo */}

            <div className="font-bold text-cyan-500 text-3xl md:text-4xl opacity-80 mt-1">M</div>
          </div>
     </div>
  </div>

 {/* BOTTOM ROW: Status & Ready Badge */}
  <div className="flex justify-between items-center px-2">
    <div className="flex text-[9px] md:text-[10px] text-emerald-400 flex items-center gap-2">
       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
       Auto detecting edges...
    </div>
    <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] md:text-[10px] font-bold">
       OCR Ready
    </div>
  </div>


</div>
</div>

    </main>
  );
}