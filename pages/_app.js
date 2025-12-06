import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";

import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";
import { SWRConfig } from "swr";
import { getToken } from "@/lib/authenticate";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `jwt ${getToken()}`,
    },
  }).then((res) => res.json());

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}
