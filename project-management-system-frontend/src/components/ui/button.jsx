import * as React from "react"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const Button = React.forwardRef(({
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    destructive: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
    outline: "border border-white/10 bg-transparent hover:bg-white/5 text-white shadow-sm",
    secondary: "bg-white/5 text-white hover:bg-white/10 border border-white/5",
    ghost: "hover:bg-white/5 text-white/70 hover:text-white",
    link: "text-white/70 underline-offset-4 hover:underline hover:text-white",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-lg px-3",
    lg: "h-11 rounded-xl px-8 text-base",
    icon: "h-10 w-10",
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  )
})
Button.displayName = "Button"

export { Button }
