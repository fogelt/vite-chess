import { useEffect, useState, ReactNode } from 'react';

interface AutoDismissProps {
  children: ReactNode;
  delay?: number;
  onDismiss?: () => void;
}

export function AutoDismiss({ children, delay = 2000, onDismiss }: AutoDismissProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsExiting(false);

    const exitTimer = setTimeout(() => setIsExiting(true), delay);
    const removeTimer = setTimeout(() => {
      onDismiss?.();
    }, delay + 500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [delay, onDismiss, children]);

  return (
    <div className={
      isExiting
        ? 'animate-out fade-out slide-out-to-bottom-10 duration-500 fill-mode-forwards'
        : 'animate-in fade-in slide-in-from-bottom-10 duration-500 fill-mode-forwards'
    }>
      {children}
    </div>
  );
}