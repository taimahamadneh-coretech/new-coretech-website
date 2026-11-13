import CoverflowCarousel from "../clientsCarousel/CoverflowCarousel";
import "../clientsCarousel/clientsShowcase.css";
import "./gallery.css";
import software1 from "../../assets/images/gallery/software-1.jpg";
import software2 from "../../assets/images/gallery/software-2.jpg";
import software3 from "../../assets/images/gallery/software-3.jpg";
import software4 from "../../assets/images/gallery/software-4.jpg";
// import software5 from "../../assets/images/gallery/software-5.jpg";
import cyber1 from "../../assets/images/gallery/cyber-1.jpg";
import cyber2 from "../../assets/images/gallery/cyber-2.jpg";
import cyber3 from "../../assets/images/gallery/cyber-3.jpg";
import cyber4 from "../../assets/images/gallery/cyber-4.jpg";
import cyber5 from "../../assets/images/gallery/cyber-5.jpg";
import telecom1 from "../../assets/images/gallery/telecom-1.jpg";
import telecom2 from "../../assets/images/gallery/telecom-2.jpg";
import telecom3 from "../../assets/images/gallery/telecom-3.jpg";
import telecom4 from "../../assets/images/gallery/telecom-4.jpg";
import telecom5 from "../../assets/images/gallery/telecom-5.jpg";

// Balanced gallery: 5 Software + 5 Cybersecurity + 5 Telecom, alternating
const images = [
  { src: software1, alt: "Software development — code on screen" },
  { src: cyber1, alt: "Cybersecurity — digital shield" },
  { src: telecom1, alt: "Telecom — wooden utility poles" },
  { src: software2, alt: "Software development — React code" },
  { src: cyber2, alt: "Cybersecurity — threat detection" },
  { src: telecom2, alt: "Telecom — poles storage yard" },
  { src: software3, alt: "Software development — our developer at work" },
  { src: cyber3, alt: "Cybersecurity — security dashboard" },
  { src: telecom3, alt: "Telecom — poles shipment" },
  { src: software4, alt: "Software development — workstation" },
  { src: cyber4, alt: "Cybersecurity — locked keyboard" },
  { src: telecom4, alt: "Telecom — treated poles" },
  // { src: software5, alt: "Software development — website design" }, // hidden: low-resolution image
  { src: cyber5, alt: "Cybersecurity — secure cloud on tablet" },
  { src: telecom5, alt: "Telecom — loading poles" },
];

// Old gallery list (Cloudinary) — kept for reference:
// const images = [
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image01_g81lxq.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image02_crz9yp.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image03_qemn8j.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image04_j0oisg.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image05_w9zxjz.jpg",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image06_cjhjal.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image07_a33rwa.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image08_xzrdhm.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image09_sy1fbs.jpg",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image10_fovzva.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image11_w393wk.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image12_t5xwcq.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image13_fzfvkj.png",
//   "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image14_vdpqb3.png",
// ];

const items = images;

export default function Gallery() {
  return (
    <section className="gallery-section section">
      <CoverflowCarousel items={items} variant="image" ariaLabel="Gallery" />
    </section>
  );
}