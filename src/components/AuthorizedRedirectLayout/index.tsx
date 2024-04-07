import { Navigate } from 'react-router-dom';

import { useAuthorizedRedirectPath } from '@/hooks';

import { type AuthorizedRedirectLayoutProps } from './interfaces';

export default function AuthorizedRedirectLayout({
  children,
  isCheckForLoggedIn,
}: AuthorizedRedirectLayoutProps) {
  console.log('Rendered!');
  const redirectPath = useAuthorizedRedirectPath(isCheckForLoggedIn);

  return redirectPath ? <Navigate to={redirectPath} /> : children;
}
