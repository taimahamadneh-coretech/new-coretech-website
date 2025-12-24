import "./gallery.css";

const images = [
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image01.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image02.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image03.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image04.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image05.jpeg",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image06.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image07.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image08.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image09.jpg",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image10.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image11.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image12.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image13.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image14.png",
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
 
