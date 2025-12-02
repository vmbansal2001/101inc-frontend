import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./locales";

const proxy = createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export default proxy;
