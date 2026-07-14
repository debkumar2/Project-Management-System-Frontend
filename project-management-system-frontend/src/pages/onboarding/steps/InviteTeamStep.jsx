import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Plus, X, Mail } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function InviteTeamStep({ onBack, onNext }) {
  const [invites, setInvites] = useState([{ email: "", role: "Developer" }]);

  const addInvite = () => {
    setInvites([...invites, { email: "", role: "Developer" }]);
  };

  const removeInvite = (index) => {
    setInvites(invites.filter((_, i) => i !== index));
  };

  const updateInvite = (index, field, value) => {
    const newInvites = [...invites];
    newInvites[index][field] = value;
    setInvites(newInvites);
  };

  return (
    <div className="w-full">
      <button onClick={onBack} className="flex items-center text-white/40 hover:text-white transition-colors mb-8 text-sm font-medium">
        <ChevronLeft size={16} className="mr-1" />
        Back
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-medium tracking-tight text-white mb-2">Invite your team</h2>
        <p className="text-white/40">Bring your team to your new workspace.</p>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        <div className="space-y-4 mb-6">
          {invites.map((invite, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  className="flex h-11 w-full rounded-xl border border-white/10 bg-[#1A1A1D] pl-10 pr-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 transition-all shadow-inner"
                  value={invite.email}
                  onChange={(e) => updateInvite(index, "email", e.target.value)}
                />
              </div>
              <div className="w-40 relative shrink-0">
                <select
                  className="flex h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#1A1A1D] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 transition-all shadow-inner"
                  value={invite.role}
                  onChange={(e) => updateInvite(index, "role", e.target.value)}
                >
                  <option value="Organization Admin">Admin</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="QA">QA</option>
                  <option value="Designer">Designer</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              {invites.length > 1 && (
                <button onClick={() => removeInvite(index)} className="w-10 h-10 rounded-xl flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-colors shrink-0">
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={addInvite}
          className="flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors mb-8"
        >
          <Plus size={16} className="mr-1" />
          Add another
        </button>

        <div className="flex items-center gap-4 pt-6 border-t border-white/5">
          <Button variant="ghost" className="flex-1 h-11 hover:bg-white/5 text-white/60" onClick={onNext}>
            Skip for now
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11" onClick={onNext}>
            Send Invitations
          </Button>
        </div>
      </div>
    </div>
  );
}
