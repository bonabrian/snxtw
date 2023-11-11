import { useTheme as useNextTheme } from 'next-themes';

import { useMounted } from './use-mounted';

export const useTheme = () => {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useNextTheme();

  return {
    theme: mounted ? resolvedTheme : undefined,
    mounted,
    setTheme,
  };
};
