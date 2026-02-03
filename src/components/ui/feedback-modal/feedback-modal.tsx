import { memo } from 'react';
import { PrimaryContainer, LoadingSpinner } from '@/components/ui';
import { Check, TriangleAlert, Timer } from 'lucide-react';
import { AutoDismiss } from '@/components/animations';

interface FeedbackModalProps {
  isLoading: boolean;
  isOpen: boolean;
  message: string;
  type: 'success' | 'error' | 'timedOut';
  onClose?: () => void;
}

const TYPE_CONFIG = {
  success: {
    Icon: Check,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    textColor: 'text-green-900',
  },
  error: {
    Icon: TriangleAlert,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-100',
    textColor: 'text-red-900',
  },
  timedOut: {
    Icon: Timer,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-900'
  }
};

export const FeedbackModal = memo(({ isLoading, isOpen, message, type, onClose }: FeedbackModalProps) => {
  if (!isOpen) return null;

  const { Icon, iconColor, bgColor, textColor } = TYPE_CONFIG[type];

  return (
    <div className="fixed inset-x-0 bottom-5 flex items-center justify-center z-50 pointer-events-none">
      <div className="w-full max-w-md p-4 pointer-events-auto">
        <AutoDismiss delay={1500} onDismiss={onClose}>
          <PrimaryContainer>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-4 p-4">
                <Icon className={iconColor} size={48} />
                <div className={`py-2 px-4 rounded-lg ${bgColor}`}>
                  <p className={`font-medium ${textColor}`}>{message}</p>
                </div>
              </div>)}
          </PrimaryContainer>
        </AutoDismiss>
      </div>
    </div>
  );
}, (prev, next) => {
  return (
    prev.isOpen === next.isOpen &&
    prev.message === next.message &&
    prev.isLoading === next.isLoading
  );
});

FeedbackModal.displayName = 'FeedbackModal';