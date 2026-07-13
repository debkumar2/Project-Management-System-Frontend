import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, error, icon, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white/80 transition-colors pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl border border-white/10 bg-[#1A1A1D] px-3 py-2 text-sm text-white placeholder:text-white/30",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20",
            "disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner",
            icon && "pl-10",
            error && "border-red-500/50 focus-visible:ring-red-500/50 focus-visible:border-red-500/50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[13px] text-red-400 font-medium ml-1">
          {error.message || error}
        </span>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
