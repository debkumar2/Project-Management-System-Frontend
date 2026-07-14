import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Phone, Briefcase, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../lib/api";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format").optional().or(z.literal('')),
  designation: z.string().max(100).optional(),
  profileImage: z.string().optional(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character"),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      designation: "",
      profileImage: "",
      password: "",
      confirmPassword: "",
    }
  });

  const password = watch("password", "");

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.match(/[A-Z]/)) score += 1;
    if (pass.match(/[0-9]/)) score += 1;
    if (pass.match(/[^a-zA-Z0-9]/)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);
  const getStrengthColor = () => {
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-orange-500";
    if (strength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post('/register', {
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        designation: data.designation,
        profile_image: data.profileImage,
        password: data.password,
        confirm_password: data.confirmPassword,
        accept_terms: data.acceptTerms,
      });

      toast.success(response.message || 'Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-medium tracking-tight mb-2 text-white">Create an account</h2>
        <p className="text-white/40">Join Nexus to manage your projects</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              icon={<User size={16} />}
              error={errors.firstName}
              {...register("firstName")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              icon={<User size={16} />}
              error={errors.lastName}
              {...register("lastName")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="johndoe123"
              icon={<User size={16} />}
              error={errors.username}
              {...register("username")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              icon={<Mail size={16} />}
              error={errors.email}
              {...register("email")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+1 555-0000"
              icon={<Phone size={16} />}
              error={errors.phone}
              {...register("phone")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white/80 transition-colors pointer-events-none">
                <Briefcase size={16} />
              </div>
              <select
                id="designation"
                className={`flex h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#1A1A1D] pl-10 pr-10 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 transition-all shadow-inner cursor-pointer ${errors.designation ? 'border-red-500/50 focus-visible:ring-red-500/50' : ''}`}
                {...register("designation")}
              >
                <option value="" disabled className="text-white/50 bg-[#1A1A1D]">Select your role...</option>
                <option value="Project Manager" className="bg-[#1A1A1D]">Project Manager</option>
                <option value="Product Manager" className="bg-[#1A1A1D]">Product Manager</option>
                <option value="Software Engineer" className="bg-[#1A1A1D]">Software Engineer</option>
                <option value="Frontend Developer" className="bg-[#1A1A1D]">Frontend Developer</option>
                <option value="Backend Developer" className="bg-[#1A1A1D]">Backend Developer</option>
                <option value="Full Stack Developer" className="bg-[#1A1A1D]">Full Stack Developer</option>
                <option value="UI/UX Designer" className="bg-[#1A1A1D]">UI/UX Designer</option>
                <option value="QA Engineer" className="bg-[#1A1A1D]">QA Engineer</option>
                <option value="DevOps Engineer" className="bg-[#1A1A1D]">DevOps Engineer</option>
                <option value="Data Scientist" className="bg-[#1A1A1D]">Data Scientist</option>
                <option value="Business Analyst" className="bg-[#1A1A1D]">Business Analyst</option>
                <option value="Scrum Master" className="bg-[#1A1A1D]">Scrum Master</option>
                <option value="Other" className="bg-[#1A1A1D]">Other</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </div>
            </div>
            {errors.designation && (
              <span className="text-[13px] text-red-400 font-medium ml-1">
                {errors.designation.message}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Profile Image (Optional)</Label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="profileImageInput"
              className="relative h-14 w-14 rounded-full border border-white/10 bg-[#1A1A1D] flex items-center justify-center overflow-hidden shrink-0 cursor-pointer group hover:border-white/20 transition-colors shadow-inner"
            >
              {watch("profileImage") ? (
                <img src={watch("profileImage")} alt="Profile preview" className="h-full w-full object-cover" />
              ) : (
                <User size={20} className="text-white/30 group-hover:text-white/50 transition-colors" />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera size={16} className="text-white" />
              </div>
            </label>
            <div className="flex flex-col justify-center">
              <label
                htmlFor="profileImageInput"
                className="cursor-pointer text-sm font-medium text-white hover:text-white/80 transition-colors"
              >
                Upload a photo
              </label>
              <p className="text-[12px] text-white/40 mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setValue("profileImage", reader.result, { shouldValidate: true });
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setValue("profileImage", "", { shouldValidate: true });
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  icon={<Lock size={16} />}
                  className="pr-10"
                  error={errors.password}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-white/40 hover:text-white transition-colors z-10"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative group">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  icon={<Lock size={16} />}
                  className="pr-10"
                  error={errors.confirmPassword}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-white/40 hover:text-white transition-colors z-10"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {password && (
            <div className="flex gap-1 mt-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i < strength ? getStrengthColor() : "bg-white/10"} transition-all duration-300`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded border-white/10 bg-[#1A1A1D] text-white focus:ring-1 focus:ring-white/20 focus:ring-offset-0 transition-all checked:bg-white checked:border-white accent-black"
              {...register("acceptTerms")}
            />
          </div>
          <div className="ml-2.5 text-sm">
            <Label htmlFor="terms" className="text-white/60 font-normal leading-tight">
              I agree to the{" "}
              <a href="#" className="text-white hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-white hover:underline">Privacy Policy</a>.
            </Label>
          </div>
        </div>
        {errors.acceptTerms && (
          <p className="text-[13px] text-red-400 font-medium ml-1">{errors.acceptTerms.message}</p>
        )}

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-white hover:underline transition-all">
          Log in instead
        </Link>
      </p>
    </motion.div>
  );
}
