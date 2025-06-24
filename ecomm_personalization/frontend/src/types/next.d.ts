import { NextComponentType, NextPage, NextPageContext } from 'next';
import { AppProps } from 'next/app';

declare module 'next' {
  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
    auth?: boolean;
  };
}

declare module 'next/app' {
  export type AppPropsWithLayout = AppProps & {
    Component: NextComponentType<NextPageContext, any, any> & {
      getLayout?: (page: ReactElement) => ReactNode;
      auth?: boolean;
    };
  };
}
