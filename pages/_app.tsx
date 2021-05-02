import Head from 'next/head';

import Layout from '@/components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>What I Decide</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
