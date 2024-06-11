import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { HeroBullets } from '../components/Hero/HeroBullets';


export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="Banco de conhecimento do Centro de Informática da UFPB">
        <MantineProvider>
          <HeroBullets/>
        </MantineProvider>
      
    </Layout>
  );
}
