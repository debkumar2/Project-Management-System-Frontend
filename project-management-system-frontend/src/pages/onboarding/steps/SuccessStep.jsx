import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SuccessStep({ workspaceName }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
        className="h-24 w-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 relative"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-20" />
        <CheckCircle2 size={48} className="text-emerald-500" />
      </motion.div>
      
      <h1 className="text-3xl font-medium tracking-tight text-white mb-3">Workspace Created</h1>
      <p className="text-white/50 mb-10 text-lg leading-relaxed">
        <span className="font-semibold text-white/90">{workspaceName}</span> has been set up successfully. You're ready to start managing projects.
      </p>

      <Button 
        onClick={() => navigate("/dashboard")} 
        className="w-full h-12 text-base font-medium flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
      >
        <span>Go to Workspace</span>
        <ArrowRight size={18} />
      </Button>
    </div>
  );
}
