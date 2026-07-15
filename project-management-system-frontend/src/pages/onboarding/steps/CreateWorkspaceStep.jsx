import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Building2, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

import api from "../../../lib/api";
import { toast } from "react-hot-toast";

const orgSchema = z.object({
  name: z.string().min(2, "Organization name is required"),
  industry: z.string().min(2, "Industry is required"),
  size: z.string().min(1, "Company size is required"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  country: z.string().min(2, "Country is required"),
  timezone: z.string().min(2, "Timezone is required"),
});

export default function CreateWorkspaceStep({ onBack, onNext }) {
  const [logoPreview, setLogoPreview] = useState(null);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(orgSchema),
    defaultValues: { name: "", industry: "", size: "", website: "", country: "", timezone: "" }
  });

  const orgName = watch("name");
  const slug = orgName ? orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") : "acme";

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/organizations', {
        name: data.name,
        industry: data.industry,
        website: data.website
      });
      toast.success(response.message || "Organization created successfully!");
      // Proceed to next step with response data
      onNext({ ...data, logo: logoPreview, slug, orgId: response.data?.id });
    } catch (error) {
      toast.error(error.message || "Failed to create organization");
    }
  };

  return (
    <div className="w-full">
      <button onClick={onBack} className="flex items-center text-white/40 hover:text-white transition-colors mb-8 text-sm font-medium">
        <ChevronLeft size={16} className="mr-1" />
        Back
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-medium tracking-tight text-white mb-2">Create your workspace</h2>
        <p className="text-white/40">Set up your organization's home base.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/[0.02] border border-white/[0.05] p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        <div className="flex items-start gap-6">
          <label className="shrink-0 group cursor-pointer">
            <div className="h-20 w-20 rounded-2xl bg-[#1A1A1D] border border-white/10 flex flex-col items-center justify-center overflow-hidden group-hover:border-white/20 transition-colors shadow-inner relative">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
              ) : (
                <Building2 size={24} className="text-white/20 group-hover:text-white/40 transition-colors" />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <UploadCloud size={18} className="text-white" />
              </div>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setLogoPreview(reader.result);
                  reader.readAsDataURL(file);
                }
              }} 
            />
          </label>
          <div className="flex-1 space-y-2 pt-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input id="name" placeholder="Acme Corp" error={errors.name} {...register("name")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <div className="relative">
              <select id="industry" className={`flex h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#1A1A1D] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 transition-all ${errors.industry ? 'border-red-500/50' : ''}`} {...register("industry")}>
                <option value="" disabled className="text-white/30">Select industry...</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Company Size</Label>
            <div className="relative">
              <select id="size" className={`flex h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#1A1A1D] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 transition-all ${errors.size ? 'border-red-500/50' : ''}`} {...register("size")}>
                <option value="" disabled className="text-white/30">Select size...</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input id="website" placeholder="https://acmecorp.com" error={errors.website} {...register("website")} />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="United States" error={errors.country} {...register("country")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" placeholder="America/New_York" error={errors.timezone} {...register("timezone")} />
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <Label className="text-white/40 mb-2 block">Workspace URL Preview</Label>
          <div className="h-11 w-full rounded-xl border border-white/5 bg-black/50 px-4 flex items-center text-sm font-mono text-white/50">
            flowforge.app/<span className="text-white">{slug}</span>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 h-11" isLoading={isSubmitting}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
