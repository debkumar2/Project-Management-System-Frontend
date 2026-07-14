import { motion } from "framer-motion";
import { 
  CheckSquare, Inbox, FolderPlus, 
  Settings, Users, Clock, ArrowRight,
  Plus, Calendar, Briefcase, FileText,
  TrendingUp, BarChart2, Zap, ArrowUpRight
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function EmptyWorkspace() {
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  const stats = [
    { label: "Active Projects", value: "12", icon: Briefcase, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "+2 this week" },
    { label: "Tasks Completed", value: "64", icon: CheckSquare, color: "text-teal-400", bg: "bg-teal-500/10", trend: "+14% vs last week" },
    { label: "Team Members", value: "8", icon: Users, color: "text-lime-400", bg: "bg-lime-500/10", trend: "2 pending invites" },
    { label: "Upcoming Deadlines", value: "3", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", trend: "Due in next 48h" },
  ];

  const quickActions = [
    { label: "Create Project", icon: Plus, color: "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/50" },
    { label: "Invite Team", icon: Users, color: "bg-white/5 hover:bg-white/10 text-white/90 border border-white/10" },
    { label: "Create Task", icon: CheckSquare, color: "bg-white/5 hover:bg-white/10 text-white/90 border border-white/10" },
    { label: "Schedule Meeting", icon: Calendar, color: "bg-white/5 hover:bg-white/10 text-white/90 border border-white/10" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-8 font-sans">
      
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        
        {/* ─── HERO SECTION ─── */}
        <motion.div variants={item} className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-8 md:p-10 shadow-sm backdrop-blur-md">
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/70">
                <Calendar size={12} className="text-emerald-400" />
                {today}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-white/90 tracking-tight leading-tight">
                Welcome back, Debkumar
              </h1>
              <p className="text-[15px] text-white/50 max-w-xl">
                Here's what's happening in <strong className="text-white/80 font-medium">FlowForge HQ</strong> today. You have 3 tasks due and 2 meetings scheduled.
              </p>
            </div>

            {/* Productivity Ring */}
            <div className="shrink-0 flex items-center gap-5 bg-black/20 rounded-xl p-4 border border-white/5">
              <div className="relative h-16 w-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-emerald-500" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-sm font-semibold text-white/90 leading-none">75%</span>
                </div>
              </div>
              <div>
                <h3 className="text-white/90 font-medium text-sm mb-1">Productivity</h3>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <TrendingUp size={12} /> +12% from yesterday
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── QUICK ACTIONS & STATS ─── */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              className="bg-white/5 border border-white/5 rounded-xl p-5 hover:border-white/20 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`h-8 w-8 rounded-lg ${stat.bg} flex items-center justify-center border border-white/5`}>
                  <stat.icon size={16} className={stat.color} />
                </div>
                <button className="text-white/40 group-hover:text-white/80 transition-colors">
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <h3 className="text-2xl font-semibold text-white/90 mb-1">{stat.value}</h3>
              <p className="text-[13px] font-medium text-white/50 mb-3">{stat.label}</p>
              <div className="text-[11px] font-medium text-white/60 bg-black/20 border border-white/5 inline-block px-2 py-1 rounded">
                {stat.trend}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          {quickActions.map((action, i) => (
            <button key={i} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[13px] transition-all shadow-sm ${action.color}`}>
              <action.icon size={14} />
              {action.label}
            </button>
          ))}
        </motion.div>

        {/* ─── MAIN CONTENT GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Area (Projects & Timeline) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Recent Projects */}
            <motion.div variants={item} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/10">
                <h2 className="text-[15px] font-semibold text-white/90">Active Projects</h2>
                <button className="text-[13px] font-medium text-emerald-400 hover:text-emerald-300">View All</button>
              </div>
              <div className="p-1.5">
                {[
                  { name: "Frontend Redesign", tag: "Design", progress: 78, team: 4, status: "On Track", color: "bg-emerald-500" },
                  { name: "API Rate Limiting", tag: "Backend", progress: 45, team: 2, status: "At Risk", color: "bg-amber-500" },
                  { name: "Mobile App V2", tag: "Product", progress: 12, team: 5, status: "Planning", color: "bg-teal-500" },
                ].map((project, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3.5">
                      <div className="h-10 w-10 rounded-lg bg-black/20 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/30 transition-colors">
                        <FolderPlus size={16} className="text-white/40 group-hover:text-white/80 transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-white/90 mb-1">{project.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] font-medium">
                          <span className="text-white/60 bg-black/20 border border-white/5 px-1.5 py-0.5 rounded">{project.tag}</span>
                          <span className="text-white/50 flex items-center gap-1"><Users size={10}/> {project.team}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="hidden md:flex flex-col items-end gap-1.5 w-28">
                        <div className="flex justify-between w-full text-[11px] font-medium text-white/50">
                          <span>Progress</span>
                          <span className="text-white/80">{project.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-black/30 overflow-hidden border border-white/5">
                          <div className={`h-full rounded-full ${project.color}`} style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                      <div className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                        project.status === 'On Track' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        project.status === 'At Risk' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-black/20 text-white/50 border-white/10'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Empty State Showcase for visual variety */}
            <motion.div variants={item} className="bg-white/[0.03] border border-white/10 rounded-xl p-10 flex flex-col items-center justify-center text-center backdrop-blur-md">
              <div className="h-12 w-12 bg-black/20 rounded-lg flex items-center justify-center mb-4 border border-white/10">
                <Zap size={20} className="text-emerald-400/80" />
              </div>
              <h3 className="text-[15px] font-semibold text-white/90 mb-1.5">You're all caught up!</h3>
              <p className="text-[13px] text-white/50 max-w-sm mb-6 leading-relaxed">
                You have no pending assignments or mentions. Enjoy your clean inbox, or create a new task to get started.
              </p>
              <button className="bg-white/10 text-white hover:bg-white/20 font-medium px-4 py-2 rounded-lg text-[13px] transition-colors border border-white/10 shadow-sm">
                Create New Task
              </button>
            </motion.div>

          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-6">
            
            <motion.div variants={item} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 backdrop-blur-md">
              <h3 className="text-[14px] font-semibold text-white/90 mb-4">Upcoming Meetings</h3>
              <div className="space-y-2">
                {[
                  { title: "Design Sync", time: "10:00 AM", duration: "45 min", participants: 4 },
                  { title: "Weekly Standup", time: "1:30 PM", duration: "15 min", participants: 8 },
                  { title: "Product Review", time: "3:00 PM", duration: "1 hr", participants: 3 },
                ].map((meeting, i) => (
                  <div key={i} className="flex gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-md bg-black/20 shrink-0 text-emerald-400 font-semibold border border-white/5">
                      <span className="text-[10px] uppercase">{meeting.time.split(' ')[0]}</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[13px] font-medium text-white/90">{meeting.title}</h4>
                      <p className="text-[11px] text-white/50 mt-0.5">{meeting.duration} · {meeting.participants} joining</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 rounded-lg border border-white/10 text-[13px] font-medium text-white/60 hover:text-white/90 hover:bg-white/5 transition-colors">
                Open Calendar
              </button>
            </motion.div>

            <motion.div variants={item} className="bg-white/[0.03] border border-white/10 rounded-xl p-6 relative overflow-hidden backdrop-blur-md">
              <h3 className="text-[14px] font-semibold text-white/90 mb-2 relative z-10">Invite your team</h3>
              <p className="text-[13px] text-white/50 mb-4 relative z-10 leading-relaxed">
                Project management works best when the whole team is involved.
              </p>
              <div className="flex flex-col gap-2 relative z-10">
                <input type="email" placeholder="colleague@company.com" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-white/90 placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                <button className="w-full bg-emerald-600 text-white px-3 py-2 rounded-lg text-[13px] font-medium shadow-sm hover:bg-emerald-500 transition-colors border border-emerald-500/50">
                  Send Invite
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
