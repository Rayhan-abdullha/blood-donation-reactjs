import { useState } from "react";

function PaymentMethod({ name, number, color }: { name: string, number: string, color: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // 1.5 seconds later reset
  };

  return (
    <div className={`p-4 rounded-2xl flex justify-between items-center ${color}`}>
      <div className="flex flex-col justify-start">
        <p className="text-[10px] font-black uppercase tracking-wider opacity-70">{name}</p>
        <p className="font-bold text-lg tracking-tight">{number}</p>
      </div>
      <button 
        onClick={handleCopy}
        className={`bg-white/50 px-3 py-1.5 ${copied && 'text-black'} rounded-xl text-xs font-bold hover:bg-white transition-all shadow-sm cursor-pointer`}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
export default PaymentMethod