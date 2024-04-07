import { useTokensStore } from '@/store';

import { getAuthorizedRedirectPath } from '@/utils/getAuthorizedRedirectPath';
import { useMemo } from 'react';

export function useAuthorizedRedirectPath(isCheckForLoggedIn = true) {
  const accessToken = useTokensStore.use.accessToken();

  return useMemo(
    () => getAuthorizedRedirectPath(accessToken !== null, isCheckForLoggedIn),
    [accessToken, isCheckForLoggedIn]
  );
}
