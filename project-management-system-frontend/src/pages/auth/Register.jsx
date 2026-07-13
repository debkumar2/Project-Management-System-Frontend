import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone is required"),
  country: z.string().min(2, "Country is required"),
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
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <Label htmlFor="country">Country</Label>
            <Input 
              id="country" 
              placeholder="United States" 
              icon={<Globe size={16} />}
              error={errors.country}
              {...register("country")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative group">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Create a strong password" 
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
          {password && (
            <div className="flex gap-1 mt-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 flex-1 rounded-full ${i < strength ? getStrengthColor() : "bg-white/10"} transition-all duration-300`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative group">
            <Input 
              id="confirmPassword" 
              type={showPassword ? "text" : "password"} 
              placeholder="Confirm your password"
              icon={<Lock size={16} />}
              className="pr-10"
              error={errors.confirmPassword}
              {...register("confirmPassword")}
            />
          </div>
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
