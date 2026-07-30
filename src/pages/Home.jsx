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
import GroupCompanies from '../Sections/groupCompanies/groupCompanies';
import Games from '../Sections/games/game'
import FeaturedPartnersCardLayout from '../Sections/FeaturedPartnrt/FeaturedPartnrt';
import ProjectsSection from '../Sections/ourProjects/ProjectsSection';
import ScholarshipSection from '../Sections/scholarship/ScholarshipSection';

export default function Home() {
  return (
    <>
      <CanvasBackground />
      <main className="main-content">
      
        <Hero />
        <About />
        <Map/>
        <GroupCompanies/>
        <FeaturedPartnersCardLayout />
        <Partners />
        <ScholarshipSection />
        <Products />
        <ProjectsSection />
        <Services />

        <Games/>
        <Clients />
        <Gallery />
        <Feedback/>
        <Contact />
      </main>
    </>
  );
}
