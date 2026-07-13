import { Outlet } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Command, Check, ArrowUpRight, TrendingUp, Users, KanbanSquare, Zap, Bell, GitBranch, MessageSquare, Layers } from "lucide-react";

/* ── Animation Helpers ── */
const float = (delay, duration = 6) => ({
  animate: { y: [0, -6, 0] },
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

function Avatar({ color, initials, size = "w-6 h-6", textSize = "text-[9px]" }) {
  return (
    <div className={`${size} rounded-full bg-gradient-to-br ${color} flex items-center justify-center ${textSize} font-bold text-white ring-2 ring-black/50 shrink-0 shadow-lg`}>
      {initials}
    </div>
  );
}

/* ── Interactive 3D Card Wrapper ── */
function InteractiveCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

import { useMotionTemplate } from "framer-motion";

export default function AuthLayout() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.08), transparent 40%)`;

  return (
    <div className="min-h-screen h-screen bg-black text-white flex w-full relative font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* ── Global Mouse Spotlight ── */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{ background: spotlightBackground }}
      />

      {/* ── Animated Perspective Grid ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-30">
        <div 
          className="w-[200vw] h-[200vh] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 60%)'
          }}
        />
      </div>

      {/* ── Ambient Glows ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600 blur-[250px]" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.02, 0.06, 0.02] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600 blur-[200px]" />
      </div>

      {/* ═══ LEFT PANEL ═══ */}
      <div className="hidden lg:flex w-[55%] xl:w-[53%] relative flex-col p-8 xl:p-12 border-r border-white/[0.04] z-10">
        
        {/* Logo + Headline */}
        <div className="relative z-20 shrink-0 mb-8">
          <motion.div {...fadeIn(0)}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Command size={18} className="text-white relative z-10" />
              </div>
              <span className="text-xl font-medium tracking-tight text-white">Nexus</span>
            </div>
          </motion.div>
          <motion.div {...fadeIn(0.1)}>
            <h1 className="text-[3rem] xl:text-[3.5rem] font-bold leading-[1.05] tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                Design the future,
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
                ship it today.
              </span>
            </h1>
            <p className="text-[15px] text-white/40 max-w-[380px] font-light leading-relaxed">
              Experience the next generation of project management. Fluid, intelligent, and relentlessly fast.
            </p>
          </motion.div>
        </div>

        {/* ── Interactive Dashboard Scene ── */}
        <div className="relative z-20 flex-1 min-h-0 flex flex-col justify-center items-center">
          
          <InteractiveCard className="w-full max-w-[640px] relative">
            
            {/* Holographic Backing */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-transparent rounded-3xl blur-md opacity-50" />
            
            {/* Main App Window */}
            <motion.div {...fadeIn(0.3)} className="relative bg-[#050505]/80 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col h-[380px]">
              
              {/* macOS Chrome */}
              <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.02] border-b border-white/[0.05]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-black/50 border border-white/5 rounded-full px-8 py-1.5 flex items-center gap-2 backdrop-blur-md">
                    <Layers size={12} className="text-white/30" />
                    <span className="text-[11px] text-white/40 font-medium tracking-wide">nexus.app/sprint</span>
                  </div>
                </div>
                <div className="w-16" />
              </div>

              {/* App Content */}
              <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <div className="w-14 border-r border-white/[0.05] flex flex-col items-center py-4 gap-4 bg-black/20">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    <Command size={14} className="text-white" />
                  </div>
                  {[KanbanSquare, MessageSquare, Users, GitBranch, Bell].map((Icon, i) => (
                    <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${i === 0 ? "bg-white/10 text-white" : "text-white/30 hover:text-white/80 hover:bg-white/5"}`}>
                      <Icon size={16} />
                    </div>
                  ))}
                </div>

                {/* Board Area */}
                <div className="flex-1 p-6 flex flex-col min-h-0 bg-gradient-to-br from-white/[0.01] to-transparent">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-white tracking-tight">Active Sprint</h2>
                      <p className="text-xs text-white/40 mt-1">14 issues · 4 days remaining</p>
                    </div>
                    <div className="flex -space-x-2">
                      <Avatar color="from-violet-500 to-purple-600" initials="AK" size="w-8 h-8" textSize="text-xs" />
                      <Avatar color="from-sky-500 to-blue-600" initials="MR" size="w-8 h-8" textSize="text-xs" />
                      <Avatar color="from-rose-500 to-pink-600" initials="SJ" size="w-8 h-8" textSize="text-xs" />
                    </div>
                  </div>

                  {/* Glass Kanban Columns */}
                  <div className="flex gap-4 flex-1 min-h-0">
                    {[
                      { title: "To Do", dot: "bg-zinc-500", items: [
                        { t: "Design system", tag: "Design", tc: "bg-purple-500/20 text-purple-300" },
                        { t: "API rate limiting", tag: "Backend", tc: "bg-blue-500/20 text-blue-300" },
                      ]},
                      { title: "In Progress", dot: "bg-blue-500", items: [
                        { t: "Auth redesign", tag: "Frontend", tc: "bg-emerald-500/20 text-emerald-300" },
                      ]},
                      { title: "Done", dot: "bg-emerald-500", items: [
                        { t: "Onboarding v2", tag: "Product", tc: "bg-pink-500/20 text-pink-300" },
                        { t: "CI/CD pipeline", tag: "DevOps", tc: "bg-orange-500/20 text-orange-300" },
                      ]},
                    ].map((col, ci) => (
                      <div key={ci} className="flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`w-2 h-2 rounded-full ${col.dot} shadow-[0_0_8px_currentColor]`} />
                          <span className="text-xs font-medium text-white/60">{col.title}</span>
                          <span className="text-[10px] text-white/20 ml-auto bg-white/5 px-2 py-0.5 rounded-full">{col.items.length}</span>
                        </div>
                        <div className="space-y-2">
                          {col.items.map((item, ii) => (
                            <motion.div 
                              key={ii} 
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                              className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05] backdrop-blur-md cursor-pointer transition-colors"
                            >
                              <p className="text-xs text-white/80 font-medium mb-3">{item.t}</p>
                              <span className={`text-[9px] font-semibold px-2 py-1 rounded-md ${item.tc}`}>{item.tag}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Holographic Floating Elements ── */}
            
            {/* Stats Pill */}
            <motion.div {...fadeIn(0.5)} {...float(0, 4)} className="absolute -top-6 left-12 z-30" style={{ transform: "translateZ(50px)" }}>
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex gap-6 shadow-2xl">
                <div className="flex flex-col items-center">
                  <span className="text-emerald-400 font-bold text-lg leading-none">142</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-wider mt-1">Completed</span>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex flex-col items-center">
                  <span className="text-blue-400 font-bold text-lg leading-none">24%</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-wider mt-1">Velocity</span>
                </div>
              </div>
            </motion.div>

            {/* Notification */}
            <motion.div {...fadeIn(0.7)} {...float(1, 5)} className="absolute -bottom-4 right-8 z-30" style={{ transform: "translateZ(80px)" }}>
              <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-[0_20px_40px_rgba(16,185,129,0.15)] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Deployment Successful</h4>
                  <p className="text-xs text-white/60">Production build #492 is live</p>
                </div>
              </div>
            </motion.div>

          </InteractiveCard>
        </div>

        {/* Footer */}
        <motion.div {...fadeIn(1)} className="relative z-20 shrink-0 mt-8">
          <div className="flex items-center gap-6 text-[11px] text-white/30 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Systems Operational
            </span>
            <span>Enterprise Grade Security</span>
            <span>SOC 2 Type II</span>
          </div>
        </motion.div>
      </div>

      {/* ═══ RIGHT PANEL (Auth Form) ═══ */}
      <div className="w-full lg:w-[45%] xl:w-[47%] flex items-center justify-center p-6 sm:p-12 relative z-20">
        
        {/* Subtle grid on the right side only */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_left,black,transparent)] pointer-events-none opacity-50" />

        <div className="w-full max-w-[440px] relative">
          
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Command size={20} className="text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight text-white">Nexus</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden group"
          >
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            
            <div className="relative z-10">
              <Outlet />
            </div>
          </motion.div>

          <p className="text-center text-xs text-white/20 mt-8 font-medium">
            © 2026 Nexus Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
