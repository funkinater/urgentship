import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';
import TrackingForm from '@/components/TrackingForm';
import AnimatedOnScroll from '@/components/AnimatedOnScroll';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <AnimatedOnScroll>
          <Hero />
        </AnimatedOnScroll>

        <AnimatedOnScroll delay={0.1}>
          <TrackingForm />
        </AnimatedOnScroll>

        <AnimatedOnScroll delay={0.2}>
          <FeatureSection />
        </AnimatedOnScroll>

        <AnimatedOnScroll delay={0.3}>
          <ServicesSection />
        </AnimatedOnScroll>
      </main>

      <AnimatedOnScroll delay={0.4}>
        <Footer />
      </AnimatedOnScroll>
    </>
  );
}
