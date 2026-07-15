import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Briefcase, CheckSquare, Clock, Calendar,
  FileText, Users, BarChart2, Activity, Settings, HelpCircle,
  LifeBuoy, Search, Bell, Plus, ChevronDown, Moon, Sun,
  Menu, X
} from "lucide-react";

import api from "../lib/api";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [activeOrg, setActiveOrg] = useState(null);
  const [isLoadingOrgs, setIsLoadingOrgs] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setIsLoadingOrgs(true);
        const response = await api.get('/organizations');
        if (response.data && Array.isArray(response.data)) {
          setOrganizations(response.data);
          if (response.data.length > 0) {
            setActiveOrg(response.data[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      } finally {
        setIsLoadingOrgs(false);
      }
    };
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Workspace", icon: Briefcase, path: "/workspace" },
    { name: "Projects", icon: Briefcase, path: "/projects" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Sprints", icon: Clock, path: "/sprints" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Documents", icon: FileText, path: "/documents" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Reports", icon: BarChart2, path: "/reports" },
    { name: "Activity", icon: Activity, path: "/activity" },
  ];

  const bottomNavItems = [
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Help", icon: HelpCircle, path: "/help" },
    { name: "Support", icon: LifeBuoy, path: "/support" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F4F6F8] dark:bg-[#111827] text-[#111827] dark:text-[#F3F4F6] font-sans transition-colors duration-300">

      {/* ─── LEFT SIDEBAR ─── */}
      <aside
        className={`${isSidebarOpen ? 'w-[260px]' : 'w-[80px]'
          } shrink-0 flex flex-col z-20 bg-[#F8FAFC] dark:bg-[#1F2937] border-r border-[#E5E7EB] dark:border-[#374151] transition-all duration-300 overflow-hidden shadow-[1px_0_10px_rgba(0,0,0,0.02)]`}
      >
        {/* Workspace Switcher */}
        <div className="h-16 px-4 flex items-center shrink-0 border-b border-[#E5E7EB] dark:border-[#374151] relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 w-full p-2 rounded-xl transition-all hover:bg-white dark:hover:bg-[#374151]/50 group overflow-hidden shadow-sm hover:shadow border border-transparent hover:border-[#E5E7EB] dark:hover:border-[#4B5563]"
          >
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] dark:from-[#3B82F6] dark:to-[#2563EB] text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-inner">
              {activeOrg ? activeOrg.name.charAt(0).toUpperCase() : "F"}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0 flex items-center justify-between opacity-100 whitespace-nowrap transition-opacity duration-300">
                <div className="flex flex-col items-start text-left w-full overflow-hidden">
                  <span className="font-semibold text-[14px] truncate text-[#111827] dark:text-white leading-snug max-w-[130px]">
                    {activeOrg ? activeOrg.name : "FlowForge"}
                  </span>
                  <span className="text-[11px] font-medium text-[#6B7280] dark:text-[#9CA3AF] leading-none">
                    {activeOrg ? activeOrg.industry || "Enterprise" : "Enterprise"}
                  </span>
                </div>
                <ChevronDown size={14} className={`shrink-0 text-[#9CA3AF] group-hover:text-[#6B7280] dark:group-hover:text-white transition-all ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && isSidebarOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
              <div className="absolute top-[68px] left-4 w-[228px] bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-xl shadow-lg z-50 py-2 flex flex-col max-h-[300px] overflow-y-auto">
                <div className="px-3 pb-2 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Your Workspaces
                </div>
                {isLoadingOrgs ? (
                  <div className="px-4 py-3 text-sm text-[#6B7280] dark:text-[#9CA3AF]">Loading...</div>
                ) : organizations.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-[#6B7280] dark:text-[#9CA3AF]">No workspaces found</div>
                ) : (
                  organizations.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => {
                        setActiveOrg(org);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#F4F6F8] dark:hover:bg-[#374151]/50 transition-colors text-left"
                    >
                      <div className="h-8 w-8 rounded bg-[#F4F6F8] dark:bg-[#374151] text-[#111827] dark:text-white flex items-center justify-center shrink-0 font-semibold text-xs border border-[#E5E7EB] dark:border-[#4B5563]">
                        {org.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-medium text-[#111827] dark:text-white truncate">
                          {org.name}
                        </span>
                      </div>
                    </button>
                  ))
                )}

                <div className="h-px w-full bg-[#E5E7EB] dark:bg-[#374151] my-1" />

                <Link
                  to="/onboarding"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#F4F6F8] dark:hover:bg-[#374151]/50 transition-colors text-left group"
                >
                  <div className="h-8 w-8 rounded bg-transparent flex items-center justify-center shrink-0">
                    <Plus size={16} className="text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6]" />
                  </div>
                  <span className="text-[13px] font-medium text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6]">
                    Create Workspace
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-5 px-4 flex flex-col gap-1.5 no-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');
            return (
              <Link key={item.name} to={item.path} title={!isSidebarOpen ? item.name : undefined} className="block relative group">
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-[#E5E7EB]/50 dark:bg-[#374151]/60 font-semibold text-[#111827] dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5'
                    : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:bg-white dark:hover:bg-[#374151]/40'
                  }`}
                >
                  <item.icon size={18} className={`transition-colors duration-200 ${isActive ? 'text-[#2563EB] dark:text-[#3B82F6]' : 'text-[#9CA3AF] group-hover:text-[#6B7280] dark:group-hover:text-[#D1D5DB]'}`} />
                  {isSidebarOpen && (
                    <span className="text-[13px] whitespace-nowrap">{item.name}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 shrink-0 flex flex-col gap-1.5 border-t border-[#E5E7EB] dark:border-[#374151]">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path} title={!isSidebarOpen ? item.name : undefined} className="block relative group">
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-[#E5E7EB]/50 dark:bg-[#374151]/60 font-semibold text-[#111827] dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5'
                    : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white hover:bg-white dark:hover:bg-[#374151]/40'
                  }`}
                >
                  <item.icon size={18} className={`transition-colors duration-200 ${isActive ? 'text-[#2563EB] dark:text-[#3B82F6]' : 'text-[#9CA3AF] group-hover:text-[#6B7280] dark:group-hover:text-[#D1D5DB]'}`} />
                  {isSidebarOpen && (
                    <span className="text-[13px] whitespace-nowrap">{item.name}</span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">

        {/* Top Navbar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-[#FFFFFF] dark:bg-[#1E293B] border-b border-[#E5E7EB] dark:border-[#374151] z-30 transition-colors duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg transition-colors hover:bg-[#F4F6F8] dark:hover:bg-[#374151]/50 text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white border border-transparent hover:border-[#E5E7EB] dark:hover:border-[#4B5563]"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[13px] font-medium">
              <span className="text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors cursor-pointer">FlowForge HQ</span>
              <span className="text-[#D1D5DB] dark:text-[#4B5563]">/</span>
              <span className="text-[#111827] dark:text-white font-semibold">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center relative group">
              <Search size={16} className="absolute left-3 text-[#9CA3AF] group-focus-within:text-[#2563EB] dark:group-focus-within:text-[#3B82F6] transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 w-64 bg-[#F4F6F8] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#374151] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 dark:focus:ring-[#3B82F6]/20 focus:border-[#2563EB] dark:focus:border-[#3B82F6] transition-all text-[#111827] dark:text-white shadow-inner"
              />
            </div>

            {/* Create Button */}
            <Link to="/onboarding" className="hidden sm:flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all shadow-[0_2px_4px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_8px_rgba(37,99,235,0.3)]">
              <Plus size={16} />
              <span>New Workspace</span>
            </Link>

            <div className="h-6 w-px bg-[#E5E7EB] dark:bg-[#374151] mx-2" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg transition-colors hover:bg-[#F4F6F8] dark:hover:bg-[#374151]/50 text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button className="p-2 rounded-lg transition-colors relative hover:bg-[#F4F6F8] dark:hover:bg-[#374151]/50 text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#DC2626] border-2 border-white dark:border-[#1E293B]" />
              </button>

              <button className="ml-2 h-8 w-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] dark:from-[#3B82F6] dark:to-[#2563EB] border border-transparent flex items-center justify-center text-[13px] font-bold text-white shadow-sm hover:shadow transition-shadow ring-2 ring-transparent hover:ring-[#2563EB]/30 dark:hover:ring-[#3B82F6]/30">
                DK
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative w-full flex justify-center bg-[#F4F6F8] dark:bg-[#111827] transition-colors duration-300">
          <div className="w-full px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
