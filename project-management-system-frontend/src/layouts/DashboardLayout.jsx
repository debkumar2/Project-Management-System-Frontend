import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Inbox, LayoutDashboard, CheckSquare, 
  Clock, Calendar, Users, FileText, BarChart2,
  Settings, Search, Command, ChevronDown, 
  Bell, Plus, HelpCircle, Briefcase, PlusCircle
} from "lucide-react";

export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const navGroups = [
    {
      label: "Workspace",
      items: [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Projects", icon: Briefcase, path: "/projects" },
        { name: "My Tasks", icon: CheckSquare, path: "/tasks" },
        { name: "Boards", icon: Inbox, path: "/boards" },
        { name: "Sprints", icon: Clock, path: "/sprints" },
        { name: "Calendar", icon: Calendar, path: "/calendar" },
      ]
    },
    {
      label: "Organization",
      items: [
        { name: "Team", icon: Users, path: "/team" },
        { name: "Files", icon: FileText, path: "/files" },
        { name: "Reports", icon: BarChart2, path: "/reports" },
      ]
    }
  ];

  const bottomNav = [
    { name: "Notifications", icon: Bell, path: "/notifications" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Support", icon: HelpCircle, path: "/support" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-[#023020] text-white/90 selection:bg-emerald-500/30">
      
      {/* ─── LEFT SIDEBAR ─── */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        className="h-full shrink-0 flex flex-col z-20 bg-[#023020] border-r border-white/10"
      >
        {/* Workspace Switcher */}
        <div className="h-16 px-4 flex items-center shrink-0 border-b border-white/5">
          <button className="flex items-center gap-3 w-full p-2 rounded-xl transition-colors hover:bg-white/5 group">
            <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-white/90 flex items-center justify-center shrink-0 font-bold text-sm shadow-sm group-hover:border-emerald-500/50 transition-colors">
              F
            </div>
            {!isSidebarCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0 flex items-center justify-between">
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-sm truncate text-white/90">FlowForge HQ</span>
                  <span className="text-[11px] font-medium text-white/50">Enterprise Plan</span>
                </div>
                <ChevronDown size={14} className="text-white/40 group-hover:text-white/70" />
              </motion.div>
            )}
          </button>
        </div>

        {/* Quick Create */}
        <div className="px-4 py-4 shrink-0">
          <button className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all shadow-sm bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Plus size={16} />
            {!isSidebarCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>New Issue</motion.span>}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2 px-3 flex flex-col gap-6 no-scrollbar">
          {navGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-0.5">
              {!isSidebarCollapsed && (
                <div className="px-3 pb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    {group.label}
                  </span>
                  <button className="text-white/30 hover:text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlusCircle size={12} />
                  </button>
                </div>
              )}
              {group.items.map((item) => {
                const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');
                return (
                  <Link key={item.name} to={item.path} className="block relative group">
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-white/10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-r-full bg-emerald-500"
                      />
                    )}
                    <div className={`relative flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors
                      ${isActive 
                        ? 'text-white font-medium' 
                        : 'text-white/50 hover:text-white/90 hover:bg-white/5'
                      }`}
                    >
                      <item.icon size={16} className={isActive ? 'opacity-100 text-emerald-400' : 'opacity-70'} />
                      {!isSidebarCollapsed && (
                        <span className="text-[13px]">{item.name}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 shrink-0 flex flex-col gap-0.5 border-t border-white/5">
          {bottomNav.map((item) => {
             const isActive = location.pathname === item.path;
             return (
              <Link key={item.name} to={item.path} className="block relative group">
                <div className={`relative flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors
                  ${isActive 
                    ? 'text-white bg-white/10 font-medium' 
                    : 'text-white/50 hover:text-white/90 hover:bg-white/5'
                  }`}
                >
                  <item.icon size={16} className={isActive ? 'opacity-100 text-emerald-400' : 'opacity-70'} />
                  {!isSidebarCollapsed && (
                    <span className="text-[13px]">{item.name}</span>
                  )}
                </div>
              </Link>
             )
          })}
        </div>
      </motion.aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10 bg-black/10">
        
        {/* Top Navbar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-8 bg-[#023020] border-b border-white/10 z-30">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-md transition-colors hover:bg-white/5 text-white/50 border border-transparent hover:border-white/10"
            >
              <LayoutDashboard size={16} />
            </button>
            <div className="flex items-center gap-2 text-[13px] font-medium">
              <span className="text-white/50">FlowForge HQ</span>
              <span className="text-white/30">/</span>
              <span className="text-white/90">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] transition-all bg-black/20 hover:bg-white/5 text-white/50 border border-white/5 hover:border-white/10">
              <Search size={14} />
              <span className="w-40 text-left">Search...</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                <Command size={10} />
                <span className="text-[10px] font-medium text-white/50">K</span>
              </div>
            </button>

            <div className="h-4 w-px bg-white/10" />

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-md transition-colors relative hover:bg-white/5 text-white/60">
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </button>
              
              <div className="ml-3 h-7 w-7 rounded bg-gradient-to-tr from-emerald-500 to-teal-600 border border-emerald-400/20 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all">
                <span className="text-[11px] font-bold text-white">D</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
