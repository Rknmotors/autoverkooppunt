import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Steps from '@/components/Steps';
import Customers from '@/components/Customers';
import Buy from '@/components/Buy';
import Why from '@/components/Why';
import Faq from '@/components/Faq';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

/** De volledige one-pager, secties in dezelfde volgorde als de originele index.html. */
export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Steps />
        <Customers />
        <Buy />
        <Why />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
