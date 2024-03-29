// import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";

import styles from '~/styles/main.css';
import MainNavigation from '~/components/MainNavigation';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: styles }
  // ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <title>An error occurred!</title>
        </head>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main className='error'>
            <h1>An error occurred!</h1>
            <p>This error {error.data}</p>
            <p>Back to <Link to="/">safety</Link>!</p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  } else if (error instanceof Error) {
    return(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <title>An error occurred!</title>
        </head>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main className='error'>
            <h1>An error occurred!</h1>
            <p>{error.message}</p>
            <p>Back to <Link to="/">safety</Link>!</p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    ) 
  } else {
    return (<h1>Unknown Error</h1>)
  }
}
