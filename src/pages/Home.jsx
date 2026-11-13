import { useEffect } from 'react';
import CanvasBackground from '../components/CanvasBackground/CanvasBackground';
import Hero from '../Sections/Hero/Hero';
import About from '../Sections/about/About';
import Products from '../Sections/products/Products';
import Services from '../Sections/services/Services';
import Clients from '../Sections/clients/Clients';
import Partners from '../Sections/partners/Partners';
import Contact from '../Sections/contact/Contact';
import Gallery from '../Sections/gallery/Gallery';
import Feedback from '../Sections/feedback/Feedback';
import Map from '../Sections/map/Map';
import MapGlobeSection from '../Sections/map/MapGlobeSection';
import GroupCompanies from '../Sections/groupCompanies/groupCompanies';
import Games from '../Sections/games/game'
import FeaturedPartnersCardLayout from '../Sections/FeaturedPartnrt/FeaturedPartnrt';
import PartnersSpotlight from '../Sections/FeaturedPartnrt/PartnersSpotlight';
import ProjectsSection from '../Sections/ourProjects/ProjectsSection';
import SoftwareDev from '../Sections/softwareDev/SoftwareDev';
import CyberSecurity from '../Sections/cyberSecurity/CyberSecurity';
import Telecom from '../Sections/telecom/Telecom';
import ClientsShowcase from '../Sections/clientsCarousel/ClientsShowcase';

// "Reveal on scroll": these blocks fade and slide up as they come into view.
// (About has its own reveal; the Hero is always visible.)
const REVEAL_SELECTORS = [
  '.main-content .section-header',
  '.globe-container', '.globe-legend',
  '.sw-bento', '.coming-soon-wrap',
  '.cy-companies', '.cy-services', '.cy-clients',
  '.tc-primer', '.tc-tabs', '.tc-products', '.tc-projects', '.tc-clients',
  '.ps-layout', '.partners-section .partners-slider, .partners-section .logos-slider',
  '.s3d-root', '.gallery-section',
  '.ct-cards', '.contact-content',
].join(',');

function useRevealOnScroll() {
  useEffect(() => {
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const els = Array.from(document.querySelectorAll(REVEAL_SELECTORS));
    els.forEach((el) => el.classList.add('rv'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('rv-in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  useRevealOnScroll();
  return (
    <>
      <CanvasBackground />
      <main className="main-content">
      
        {/* Hero + About: About slides up over the Hero (stacking effect) */}
        <div className="hero-stack">
          <Hero />
          <About />
        </div>
        {/* <Map/>  flat map — replaced by the globe, kept as its fallback */}
        <MapGlobeSection />
        <SoftwareDev />
        <Games/>
        <CyberSecurity />
        <Telecom />
        {/* <GroupCompanies/>  hidden for now — code kept in Sections/groupCompanies */}
        {/* <FeaturedPartnersCardLayout />  story cards — replaced by PartnersSpotlight, code kept */}
        <PartnersSpotlight />
        <Partners />
        
        {/* <Products />  replaced by Telecom — code kept in Sections/products */}
        {/* <ProjectsSection />  replaced by Telecom — code kept in Sections/ourProjects */}
        {/* <Services />  replaced by CyberSecurity — code kept in Sections/services */}

        {/* <Clients />  orbit version — replaced by ClientsShowcase, code kept in Sections/clients */}
        <ClientsShowcase />
        <Gallery />

        <Contact />
      </main>
    </>
  );
}
