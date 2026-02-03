import { memo } from 'react';
import { createPortal } from 'react-dom';
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
  },
  error: {
    Icon: TriangleAlert,
    iconColor: 'text-red-600',
  },
  timedOut: {
    Icon: Timer,
    iconColor: 'text-amber-600',
  }
};

export const FeedbackModal = memo(({ isLoading, isOpen, message, type, onClose }: FeedbackModalProps) => {
  if (!isOpen) return null;

  const { Icon, iconColor } = TYPE_CONFIG[type];

  return createPortal(
    <div className="fixed inset-x-0 bottom-5 flex items-center justify-center z-[9999] pointer-events-none p-4">
      <div className="w-full max-w-md pointer-events-auto">
        <AutoDismiss delay={1500} onDismiss={onClose}>
          <PrimaryContainer>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-4 p-4">
                <Icon className={iconColor} size={48} />
                <div className={`py-2 px-4 rounded-lg`}>
                  <p className={`font-medium ${iconColor}`}>{message}</p>
                </div>
              </div>
            )}
          </PrimaryContainer>
        </AutoDismiss>
      </div>
    </div>,
    document.body
  );
}, (prev, next) => {
  return (
    prev.isOpen === next.isOpen &&
    prev.message === next.message &&
    prev.isLoading === next.isLoading &&
    prev.type === next.type
  );
});

FeedbackModal.displayName = 'FeedbackModal';