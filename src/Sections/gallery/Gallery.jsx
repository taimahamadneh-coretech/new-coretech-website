import "./gallery.css";

const images = [
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image01_g81lxq.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image02_crz9yp.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image03_qemn8j.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image04_j0oisg.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image05_w9zxjz.jpg",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image06_cjhjal.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image07_a33rwa.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image08_xzrdhm.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image09_sy1fbs.jpg",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image10_fovzva.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image11_w393wk.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image12_t5xwcq.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image13_fzfvkj.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image14_vdpqb3.png",
];
export default function Gallery() {
  return (
    <section className="gallery-section section">
      <div className="gallery-slider">
        <div className="gallery-track">
          {[...images, ...images].map((src, index) => (
            <div className="gallery-item" key={index}>
              <img src={src} alt={`gallery-${index}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
