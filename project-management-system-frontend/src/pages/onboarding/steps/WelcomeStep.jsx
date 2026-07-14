import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function WelcomeStep({ onNext }) {
  return (
    <div className="flex flex-col items-center text-center max-w-lg mx-auto">
      <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-8 border border-white/10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      </div>
      
      <h1 className="text-3xl font-medium tracking-tight text-white mb-4">Welcome to FlowForge</h1>
      <p className="text-white/60 mb-10 text-lg leading-relaxed">
        Let's get your workspace set up. A workspace is where your team collaborates, manages projects, and drives success together.
      </p>

      <div className="w-full space-y-4">
        <Button onClick={onNext} className="w-full h-12 text-base font-medium flex items-center justify-between px-6 bg-white text-black hover:bg-white/90">
          <span>Create new workspace</span>
          <ArrowRight size={18} />
        </Button>
        <button className="w-full h-12 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white/80 font-medium transition-colors flex items-center justify-center gap-2">
          <Users size={18} />
          <span>Join existing workspace</span>
        </button>
      </div>
    </div>
  );
}
