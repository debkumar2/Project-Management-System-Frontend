import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeStep from "./steps/WelcomeStep";
import CreateWorkspaceStep from "./steps/CreateWorkspaceStep";
import InviteTeamStep from "./steps/InviteTeamStep";
import SuccessStep from "./steps/SuccessStep";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [workspaceData, setWorkspaceData] = useState(null);

  const steps = [
    <WelcomeStep onNext={() => setStep(1)} />,
    <CreateWorkspaceStep onBack={() => setStep(0)} onNext={(data) => { setWorkspaceData(data); setStep(2); }} />,
    <InviteTeamStep onBack={() => setStep(1)} onNext={() => setStep(3)} />,
    <SuccessStep workspaceName={workspaceData?.name || "Workspace"} />
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute top-10 flex gap-2 z-20">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 w-10 rounded-full transition-colors duration-500 ${i <= step ? 'bg-white' : 'bg-white/10'}`} />
        ))}
      </div>

      <div className="w-full max-w-2xl relative z-10 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
