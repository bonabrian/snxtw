import Link from 'next/link';

import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className={cn('relative z-10 w-full py-4', 'md:py-0')}>
      <div
        className={cn(
          'container flex flex-col items-center justify-between gap-4',
          'md:h-20',
          'md:flex-row',
        )}
      >
        <div className={cn('flex flex-col gap-2')}>
          <p
            className={cn(
              'text-center text-sm leading-loose text-muted-foreground',
              'md:text-left',
            )}
          ></p>
        </div>
        <div
          className={cn(
            'space-x-4 text-center text-sm leading-loose text-muted-foreground',
            'md:text-left',
          )}
        ></div>
      </div>
    </footer>
  );
};

export default Footer;
