import { useState } from "react";
import { 
  Briefcase, CheckSquare, Users, Database, 
  MoreVertical, Calendar as CalendarIcon, Clock, 
  ArrowUpRight, ArrowDownRight, Activity, MessageSquare, 
  CheckCircle2, AlertCircle
} from "lucide-react";

// Mock Data
const kpis = [
  { label: "Active Projects", value: "12", trend: "+2 this week", trendUp: true, icon: Briefcase, color: "text-[#2563EB]" },
  { label: "Assigned Tasks", value: "48", trend: "+12 this week", trendUp: true, icon: CheckSquare, color: "text-[#D97706]" },
  { label: "Completed", value: "156", trend: "+24 this week", trendUp: true, icon: CheckCircle2, color: "text-[#16A34A]" },
  { label: "Overdue", value: "3", trend: "-2 this week", trendUp: false, icon: AlertCircle, color: "text-[#DC2626]" },
  { label: "Team Members", value: "24", trend: "No change", trendUp: true, icon: Users, color: "text-[#6B7280]" },
  { label: "Storage Used", value: "45.2 GB", trend: "+1.2 GB this week", trendUp: false, icon: Database, color: "text-[#6B7280]" },
];

const projects = [
  { id: 1, name: "Website Redesign", status: "On Track", progress: 75, team: 4, dueDate: "Oct 24, 2026", priority: "High" },
  { id: 2, name: "Mobile App V2", status: "At Risk", progress: 45, team: 6, dueDate: "Nov 12, 2026", priority: "Critical" },
  { id: 3, name: "Marketing Campaign", status: "On Track", progress: 90, team: 3, dueDate: "Oct 15, 2026", priority: "Medium" },
  { id: 4, name: "Infrastructure Upgrade", status: "Delayed", progress: 20, team: 5, dueDate: "Dec 01, 2026", priority: "High" },
];

const schedule = [
  { id: 1, title: "Design Sync", time: "10:00 AM - 11:00 AM", attendees: 4, type: "meeting" },
  { id: 2, title: "Product Review", time: "1:30 PM - 2:30 PM", attendees: 8, type: "meeting" },
  { id: 3, title: "1:1 with Alex", time: "3:00 PM - 3:30 PM", attendees: 2, type: "1:1" },
];

const tasks = [
  { id: 1, title: "Update component library", project: "Website Redesign", status: "In Progress", priority: "High" },
  { id: 2, title: "Review API documentation", project: "Mobile App V2", status: "To Do", priority: "Medium" },
  { id: 3, title: "Prepare Q3 report", project: "Marketing Campaign", status: "Done", priority: "Low" },
];

export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col gap-8">
      
      {/* ─── WELCOME SECTION ─── */}
      <section className="bg-[#FFFFFF] dark:bg-[#1E293B] rounded-2xl p-8 border border-[#E5E7EB] dark:border-[#374151] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gradient-to-br from-[#2563EB]/5 to-transparent dark:from-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-[#111827] dark:text-white mb-3 tracking-tight">
            Good Morning, Debkumar.
          </h1>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] text-[15px] flex items-center gap-2 flex-wrap">
            Today you have: 
            <span className="font-semibold text-[#111827] dark:text-white bg-[#F4F6F8] dark:bg-[#0F172A] px-2.5 py-0.5 rounded-md border border-[#E5E7EB] dark:border-[#374151]">3 tasks due</span>
            <span className="font-semibold text-[#111827] dark:text-white bg-[#F4F6F8] dark:bg-[#0F172A] px-2.5 py-0.5 rounded-md border border-[#E5E7EB] dark:border-[#374151]">2 meetings</span>
            <span className="font-semibold text-[#DC2626] bg-[#DC2626]/10 px-2.5 py-0.5 rounded-md border border-[#DC2626]/20">1 project at risk</span>
          </p>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-[#6B7280] dark:text-[#9CA3AF] md:border-l border-[#E5E7EB] dark:border-[#374151] pl-8 relative z-10">
          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold mb-1.5 text-[#9CA3AF] dark:text-[#6B7280]">Current Workspace</p>
            <p className="font-semibold text-[#111827] dark:text-white">FlowForge HQ</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold mb-1.5 text-[#9CA3AF] dark:text-[#6B7280]">Role</p>
            <p className="font-semibold text-[#111827] dark:text-white">Organization Owner</p>
          </div>
          <div className="hidden lg:block">
            <p className="text-[11px] uppercase tracking-wider font-semibold mb-1.5 text-[#9CA3AF] dark:text-[#6B7280]">Date</p>
            <p className="font-semibold text-[#111827] dark:text-white">{currentDate}</p>
          </div>
        </div>
      </section>

      {/* ─── QUICK ACTIONS ─── */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
        {['Create Project', 'Invite Team', 'New Sprint', 'Create Task', 'Upload File', 'Schedule Meeting'].map(action => (
          <button key={action} className="whitespace-nowrap px-4 py-2.5 bg-[#FFFFFF] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151] rounded-lg text-[13px] font-semibold text-[#111827] dark:text-[#E5E7EB] hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/50 hover:border-[#D1D5DB] dark:hover:border-[#4B5563] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-md">
            {action}
          </button>
        ))}
      </div>

      {/* ─── KPI SECTION ─── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-[#FFFFFF] dark:bg-[#1E293B] rounded-2xl p-6 border border-[#E5E7EB] dark:border-[#374151] shadow-sm flex flex-col group hover:border-[#2563EB]/40 dark:hover:border-[#3B82F6]/40 transition-all duration-300 hover:shadow-md">
            <div className="flex items-start justify-between mb-5">
              <div className={`p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#374151] shadow-inner ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              {kpi.trendUp ? (
                <div className="flex items-center gap-1 text-[#16A34A] bg-[#16A34A]/10 px-1.5 py-0.5 rounded-md text-[11px] font-semibold border border-[#16A34A]/20">
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </div>
              ) : (
                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-semibold border ${kpi.label === 'Overdue' || kpi.label === 'Storage Used' ? 'text-[#DC2626] bg-[#DC2626]/10 border-[#DC2626]/20' : 'text-[#D97706] bg-[#D97706]/10 border-[#D97706]/20'}`}>
                  <ArrowDownRight size={14} strokeWidth={2.5} />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-[28px] font-bold text-[#111827] dark:text-white leading-none mb-1.5 tracking-tight">
                {kpi.value}
              </h3>
              <p className="text-[14px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1">
                {kpi.label}
              </p>
              <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] font-medium">
                {kpi.trend}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── 12-COLUMN GRID MAIN LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Active Projects Table */}
          <div className="bg-[#FFFFFF] dark:bg-[#1E293B] rounded-2xl border border-[#E5E7EB] dark:border-[#374151] shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-[#E5E7EB] dark:border-[#374151] flex items-center justify-between bg-[#F8FAFC]/50 dark:bg-[#1F2937]/20">
              <h2 className="text-[16px] font-bold text-[#111827] dark:text-white">Active Projects</h2>
              <button className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#3B82F6] dark:hover:text-[#60A5FA] transition-colors">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F4F6F8] dark:bg-[#0F172A]/50 border-b border-[#E5E7EB] dark:border-[#374151]">
                    <th className="px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">Project Name</th>
                    <th className="px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">Status</th>
                    <th className="px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">Progress</th>
                    <th className="px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">Due Date</th>
                    <th className="px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#374151]">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors group">
                      <td className="px-6 py-4.5">
                        <div className="font-semibold text-[14px] text-[#111827] dark:text-white">{project.name}</div>
                        <div className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] mt-1">{project.team} members</div>
                      </td>
                      <td className="px-6 py-4.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-semibold border ${
                          project.status === 'On Track' ? 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20' :
                          project.status === 'At Risk' ? 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20' :
                          'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 w-48">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-[#E5E7EB] dark:bg-[#374151] rounded-full overflow-hidden shadow-inner">
                            <div 
                              className={`h-full rounded-full ${project.progress >= 70 ? 'bg-[#16A34A]' : project.progress >= 40 ? 'bg-[#D97706]' : 'bg-[#DC2626]'}`} 
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-[13px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] w-8">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-[14px] text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                        {project.dueDate}
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <button className="text-[#9CA3AF] hover:text-[#111827] dark:text-[#6B7280] dark:hover:text-white p-1.5 rounded-lg hover:bg-[#E5E7EB] dark:hover:bg-[#4B5563] transition-colors opacity-0 group-hover:opacity-100">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Assigned Tasks */}
          <div className="bg-[#FFFFFF] dark:bg-[#1E293B] rounded-2xl border border-[#E5E7EB] dark:border-[#374151] shadow-sm flex flex-col">
            <div className="px-6 py-5 border-b border-[#E5E7EB] dark:border-[#374151] flex items-center justify-between bg-[#F8FAFC]/50 dark:bg-[#1F2937]/20">
              <h2 className="text-[16px] font-bold text-[#111827] dark:text-white">Assigned Tasks</h2>
              <button className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#3B82F6] dark:hover:text-[#60A5FA] transition-colors">
                View All
              </button>
            </div>
            <div className="flex flex-col">
              {tasks.map((task, idx) => (
                <div key={task.id} className={`flex items-start gap-4 p-5 hover:bg-[#F8FAFC] dark:hover:bg-[#374151]/30 transition-colors group cursor-pointer ${idx !== tasks.length - 1 ? 'border-b border-[#E5E7EB] dark:border-[#374151]' : ''}`}>
                  <button className="mt-0.5 text-[#D1D5DB] hover:text-[#16A34A] dark:text-[#4B5563] dark:hover:text-[#16A34A] transition-colors">
                    {task.status === 'Done' ? <CheckCircle2 size={20} className="text-[#16A34A]" /> : <CheckCircle2 size={20} />}
                  </button>
                  <div className="flex-1">
                    <p className={`text-[15px] font-semibold ${task.status === 'Done' ? 'text-[#9CA3AF] line-through dark:text-[#6B7280]' : 'text-[#111827] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors'}`}>
                      {task.title}
                    </p>
                    <p className="text-[13px] font-medium text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                      {task.project}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                    task.priority === 'High' ? 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20' :
                    task.priority === 'Medium' ? 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20' :
                    'bg-[#F4F6F8] text-[#6B7280] border-[#E5E7EB] dark:bg-[#0F172A] dark:text-[#9CA3AF] dark:border-[#374151]'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Today's Schedule */}
          <div className="bg-[#FFFFFF] dark:bg-[#1E293B] rounded-2xl border border-[#E5E7EB] dark:border-[#374151] shadow-sm flex flex-col">
            <div className="px-6 py-5 border-b border-[#E5E7EB] dark:border-[#374151] flex items-center justify-between bg-[#F8FAFC]/50 dark:bg-[#1F2937]/20">
              <h2 className="text-[16px] font-bold text-[#111827] dark:text-white flex items-center gap-2">
                <CalendarIcon size={18} className="text-[#6B7280] dark:text-[#9CA3AF]" />
                Today's Schedule
              </h2>
            </div>
            <div className="p-6 flex flex-col gap-5">
              {schedule.map((event) => (
                <div key={event.id} className="flex gap-4 relative">
                  <div className="flex flex-col items-center gap-1 min-w-[65px] pt-1">
                    <span className="text-[13px] font-bold text-[#111827] dark:text-white">{event.time.split('-')[0].trim()}</span>
                  </div>
                  <div className="flex-1 bg-[#F4F6F8] dark:bg-[#0F172A] rounded-xl p-4 border border-[#E5E7EB] dark:border-[#374151] relative overflow-hidden group hover:border-[#2563EB]/40 dark:hover:border-[#3B82F6]/40 transition-colors shadow-sm hover:shadow-md">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2563EB] dark:bg-[#3B82F6]" />
                    <h4 className="text-[14px] font-bold text-[#111827] dark:text-white mb-2">{event.title}</h4>
                    <div className="flex items-center gap-4 text-[12px] text-[#6B7280] dark:text-[#9CA3AF] font-semibold">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {event.time}</span>
                      <span className="flex items-center gap-1.5"><Users size={14} /> {event.attendees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#FFFFFF] dark:bg-[#1E293B] rounded-2xl border border-[#E5E7EB] dark:border-[#374151] shadow-sm flex flex-col">
            <div className="px-6 py-5 border-b border-[#E5E7EB] dark:border-[#374151] flex items-center justify-between bg-[#F8FAFC]/50 dark:bg-[#1F2937]/20">
              <h2 className="text-[16px] font-bold text-[#111827] dark:text-white flex items-center gap-2">
                <Activity size={18} className="text-[#6B7280] dark:text-[#9CA3AF]" />
                Recent Activity
              </h2>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {[
                { user: 'Sarah Jenks', action: 'completed task', target: 'Homepage Hero Section', time: '10m ago' },
                { user: 'Mike Ross', action: 'commented on', target: 'API Specs', time: '1h ago', isComment: true },
                { user: 'Elena Gil', action: 'uploaded file', target: 'Q3_Report.pdf', time: '2h ago' }
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#F4F6F8] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#374151] flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-[12px] font-bold text-[#6B7280] dark:text-[#9CA3AF]">{act.user.split(' ').map(n=>n[0]).join('')}</span>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-[14px] text-[#111827] dark:text-[#E5E7EB] leading-tight">
                      <span className="font-bold">{act.user}</span> <span className="text-[#6B7280] dark:text-[#9CA3AF] font-medium">{act.action}</span> <span className="font-bold">{act.target}</span>
                    </p>
                    <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] font-semibold mt-1">{act.time}</p>
                    {act.isComment && (
                      <div className="mt-2.5 p-3 rounded-xl bg-[#F4F6F8] dark:bg-[#0F172A] text-[13px] font-medium text-[#6B7280] dark:text-[#9CA3AF] border border-[#E5E7EB] dark:border-[#374151] flex items-start gap-2 shadow-inner">
                        <MessageSquare size={14} className="mt-0.5 shrink-0 text-[#9CA3AF]" />
                        <span>Looks good to me, ready for merge.</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
