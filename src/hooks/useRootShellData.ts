import { em } from '@mantine/core';
import { useHeadroom, useMediaQuery } from '@mantine/hooks';

import { USE_ROOT_SHELL_DATA_DEFAULTS } from '@/constants/defaultOptions';

export function useRootShellData(
  fixedAt = USE_ROOT_SHELL_DATA_DEFAULTS.fixedAt,
  maxWidth = USE_ROOT_SHELL_DATA_DEFAULTS.maxWidth
) {
  const pinned = useHeadroom({ fixedAt });
  const isMobile = useMediaQuery(`(max-width: ${em(maxWidth)})`);

  return { pinned, isMobile };
}
