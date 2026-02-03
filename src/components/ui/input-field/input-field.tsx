interface TextInputProps {
  label: string;
  type?: "text" | "password";
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
  isInvalid?: boolean;
}

export function InputField({ label, type = "text", value, onChange, className, isInvalid = false }: TextInputProps) {
  return (
    <div className={`relative ${className} ${isInvalid ? 'animate-shake' : ''}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder=''
        className={`peer w-full p-3 ring-2 ring-white/50 rounded-lg transition-all shadow-lg bg-slate-400 outline-none
          ${isInvalid
            ? 'border-orange-500 ring-2 ring-red-200'
            : 'border-slate-300 focus:ring-2 focus:ring-white/80 focus:border-transparent'
          }`}
      />

      <label
        className={`absolute left-4 bg-slate-400 rounded-sm top-3 text-white/50 text-sm transition-all duration-200 pointer-events-none uppercase tracking-[0.1em]
           peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-white/80 
           peer-focus:ring-2 peer-focus:ring-white/80 peer-focus:px-1 
           peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2
           peer-[:not(:focus)]:ring-white/50 peer-[:not(:placeholder-shown)]:ring-2
           peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1
        ${isInvalid && 'text-red-400'}`}
      >
        {isInvalid ? "Required" : label}
      </label>
    </div>
  );
}