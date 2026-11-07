import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // run on every page, but skip api routes, Next internals and files with an extension
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
