import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Product from "./Product/Product";
import { ThemeContext } from "./Theme/ThemeContext";
import { useContext } from "react";
function Home() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  let backgroundUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2s9HDKipReXD4JCwZtvwq21UdaVbif2z2QQ&usqp=CAU";
  let handleClick = () => {
    navigate("/chat");
  };
  return (
    <>
      <div className="Home-content" id={theme}>
        <div className="homeContainer">
          <Carousel autoPlay infiniteLoop autoFocus showThumbs={false}>
            <div className="slider">
              <img src="https://w0.peakpx.com/wallpaper/991/598/HD-wallpaper-workspace-laptop-headphones-watch-ultra-computers-hardware-business-laptop-music-phone-modern-desk-background-minimalist-technology-mobile-computer-silver-clean-minimalism-headphones.jpg" />
              <div className="word-part">
                <p style={{ fontWeight: 800 }}>High Quality</p>
                <h3>Electronics</h3>
                <a href="#" className="btn-shop" style={{ color: "black" }}>
                  Shop now
                </a>
              </div>
            </div>
            <div className="slider">
              <img src="https://c4.wallpaperflare.com/wallpaper/488/747/592/design-sofa-interior-pillow-living-room-hd-wallpaper-preview.jpg" />
              <div className="word-part">
                <p style={{ fontWeight: 800 }}>High Quality</p>
                <h3>Furnitures</h3>
                <a href="#" className="btn-shop" style={{ color: "black" }}>
                  Shop now
                </a>
              </div>
            </div>
            <div className="slider">
              <img src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?" />
              <div className="word-part">
                <p style={{ fontWeight: 800 }}>High Quality</p>
                <h3>Clothes</h3>
                <a href="#" className="btn-shop" style={{ color: "black" }}>
                  Shop now
                </a>
              </div>
            </div>
          </Carousel>
        </div>
        <div className="chat-icon-fixed" onClick={handleClick}>
          <img src={backgroundUrl} alt="" srcSet="" className="chat-icons" />
        </div>
        <div className="category">
          <Carousel
            autoPlay
            infiniteLoop
            autoFocus
            showThumbs={false}
            showArrows={false}
          >
            <div className="slider part-0ne">
              <div className="category-card_one">
                <img src="https://w0.peakpx.com/wallpaper/138/1011/HD-wallpaper-of-a-laptop-and-a-tablet-on-the-table-thumbnail.jpg" />
                <div className="category-name">
                  <h3>Electronics</h3>
                  <p>New Trends</p>
                </div>
              </div>
              <div className="category-card_one">
                <img src="https://ii1.pepperfry.com/media/catalog/product/i/c/800x880/iconic-chair-in-white-colour-by-urbancart-iconic-chair-in-white-colour-by-urbancart-hlrkb3.jpg" />
                <div className="category-name">
                  <h3>Furnitures</h3>
                  <p>New Trends</p>
                </div>
              </div>
              <div className="category-card_one">
                <img src="https://i.pinimg.com/736x/44/3e/5a/443e5a85b8a3281d5b9a87b4931f650f.jpg" />

                <div className="category-name">
                  <h3>Clothes</h3>
                  <p>New Trends</p>
                </div>
              </div>
            </div>
            <div className="slider part-0ne">
              <div className="category-card_one">
                <img src="https://www.kantar.com/north-america/-/media/project/kantar/north-america/articles/images/2022/appleproducts.jpg?h=562&w=900&hash=D7D9B97290C4B196864AD871E24143B3" />
                <div className="category-name">
                  <h3>Electronics</h3>
                  <p>New Trends</p>
                </div>
              </div>
              <div className="category-card_one">
                <img src="https://i.pinimg.com/474x/1e/7a/f3/1e7af30905ad64657b1b03db8a49cd05--outdoor-chairs-outdoor-seating.jpg" />
                <div className="category-name">
                  <h3>Furnitures</h3>
                  <p>New Trends</p>
                </div>
              </div>
              <div className="category-card_one">
                <img src="https://spaceandtime.com.au/wp-content/uploads/Midyear-Wardrobe-Declutter-1.png" />
                <div className="category-name">
                  <h3>Clothes</h3>
                  <p>New Trends</p>
                </div>
              </div>
            </div>
            <div className="slider part-0ne">
              <div className="category-card_one">
                <img src="https://images.pexels.com/photos/2388569/pexels-photo-2388569.jpeg?cs=srgb&dl=pexels-brett-sayles-2388569.jpg&fm=jpg" />
                <div className="category-name">
                  <h3>Electronics</h3>
                  <p>New Trends</p>
                </div>
              </div>
              <div className="category-card_one">
                <img src="https://media.architecturaldigest.com/photos/55f9e1e39bff6eeb3a241b22/4:3/w_520,h_390,c_limit/dam-images-daily-2014-06-organic-exhibition-organic-furniture-exhibition-05-spaghetti-wall-pablo-reinoso-h545.jpg" />
                <div className="category-name">
                  <h3>Furnitures</h3>
                  <p>New Trends</p>
                </div>
              </div>
              <div className="category-card_one">
                <img src="https://ae01.alicdn.com/kf/Hbf16e91ea9cb42a780d381ff6539a5679/2020-New-Stock-V-neck-Butterfly-Flowers-Ball-Gowns-Long-Prom-Dress-Blue-Prom-Dress-Puffy.jpg_Q90.jpg_.webp" />
                <div className="category-name">
                  <h3>Clothes</h3>
                  <p>New Trends</p>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
        <div className="product-container">
          <Product />
        </div>
      </div>
    </>
  );
}

export default Home;
