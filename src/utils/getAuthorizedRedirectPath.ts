import { createPath, createSearchParams } from 'react-router-dom';

import { CHAT_ROUTE, LOGIN_ROUTE } from '@/constants/routes';
import { PAGE_STATUS } from '@/constants/pageStatus';

/**
  Returns redirect path for two scenarios:

  1. User not logged in and check for logged in is enabled (Login route)
  Example: User tries to access private parts of app without authorization
  2. User logged in and check for logged in is disabled (Chat route)
  Example: User tries to exit from private parts of app to Home/Login/Register routes

  This not covers other scenarios, which makes no sense:

  3. User logged in and check for logged in is enabled
  4. User not logged in and check for logged in is disabled
*/
export const getAuthorizedRedirectPath = (loggedInStatus: boolean, checkForLoggedIn: boolean) => {
  if (!loggedInStatus && checkForLoggedIn)
    return createPath({
      pathname: LOGIN_ROUTE,
      search: `?${createSearchParams({
        status: PAGE_STATUS.notLoggedIn,
      })}`,
    });

  if (loggedInStatus && !checkForLoggedIn) return CHAT_ROUTE;

  return null;
};
