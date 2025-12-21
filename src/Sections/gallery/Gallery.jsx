import "./gallery.css";
 
import img1 from "../../assets/images/image1.png";
import img2 from "../../assets/images/image2.png";
import img3 from "../../assets/images/image3.png";
import img4 from "../../assets/images/image4.png";
import img5 from "../../assets/images/image5.png";
import img6 from "../../assets/images/image6.png";
import img7 from "../../assets/images/image7.jpeg";
import img8 from "../../assets/images/image8.png";
import img9 from "../../assets/images/image9.png";
import img10 from "../../assets/images/image10.png";
import img11 from "../../assets/images/image11.png";
import img12 from "../../assets/images/image12.png";
import img13 from "../../assets/images/image13.png";
 
const images = [
  img1, img2, img3, img4, img5, img6,
  img7, img8, img9, img10, img11, img12, img13
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
 