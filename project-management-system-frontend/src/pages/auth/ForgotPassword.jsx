import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSuccess(true);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Link to="/login" className="inline-flex items-center text-[13px] font-medium text-white/50 hover:text-white transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to login
      </Link>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-medium tracking-tight mb-2 text-white">Forgot password?</h2>
              <p className="text-white/40">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  icon={<Mail size={16} />}
                  error={errors.email}
                  {...register("email")}
                />
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
            <h2 className="text-2xl font-medium tracking-tight mb-2 text-white">Check your email</h2>
            <p className="text-white/40 mb-8">
              We've sent a password reset link to your email address.
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="secondary" className="w-full">
              Didn't receive the email? Click to resend
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
