import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const schema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" }
  });

  const password = watch("password", "");

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.match(/[a-z]/)) score += 1;
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
    setIsSuccess(true);
    setIsLoading(false);
    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-medium tracking-tight mb-2 text-white">Set new password</h2>
              <p className="text-white/40">
                Your new password must be different from previous passwords.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
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
                    {[...Array(5)].map((_, i) => (
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
                    placeholder="Confirm your new password" 
                    icon={<Lock size={16} />}
                    className="pr-10"
                    error={errors.confirmPassword}
                    {...register("confirmPassword")}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                Reset password
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="mx-auto w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-medium tracking-tight mb-2 text-white">Password Reset</h2>
            <p className="text-white/40 mb-8">
              Your password has been successfully reset. Redirecting you to login...
            </p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Go to Login
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
