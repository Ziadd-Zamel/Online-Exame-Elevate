import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        'relative z-10 mx-auto max-w-screen-2xl px-2 py-12 sm:px-3 md:px-10 lg:px-20',
        className,
      )}
    >
      {children}
    </div>
  );
};
