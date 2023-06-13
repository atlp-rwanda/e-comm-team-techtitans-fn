import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Product from "./Product/Product";

function Home() {
  const navigate = useNavigate();
  let backgroundUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2s9HDKipReXD4JCwZtvwq21UdaVbif2z2QQ&usqp=CAU";
  let handleClick = () => {
    navigate("/chat");
  };
  return (
    <>
      <div className="homeContainer">
        <Carousel autoPlay infiniteLoop autoFocus showThumbs={false}>
          <div className="slider">
            <img src="https://w0.peakpx.com/wallpaper/991/598/HD-wallpaper-workspace-laptop-headphones-watch-ultra-computers-hardware-business-laptop-music-phone-modern-desk-background-minimalist-technology-mobile-computer-silver-clean-minimalism-headphones.jpg" />
            <div className="word-part">
              <p>High Quality</p>
              <h3>Electronics</h3>
              <a href="#" className="btn-shop">
                Shop now
              </a>
            </div>
          </div>
          <div className="slider">
            <img src="https://images.pexels.com/photos/2300334/pexels-photo-2300334.jpeg?" />
            <div className="word-part">
              <p>High Quality</p>
              <h3>Electronics</h3>
              <a href="#" className="btn-shop">
                Shop now
              </a>
            </div>
          </div>
          <div className="slider">
            <img src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?" />
            <div className="word-part">
              <p>High Quality</p>
              <h3>Electronics</h3>
              <a href="#" className="btn-shop">
                Shop now
              </a>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="chat-icon-fixed" onClick={handleClick}>
        <img src={backgroundUrl} alt="" srcset="" className="chat-icons" />
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
              <img src="https://w0.peakpx.com/wallpaper/371/602/HD-wallpaper-room-chair-window-interior-thumbnail.jpg" />
              <div className="category-name">
                <h3>Electronics</h3>
                <p>New Trends</p>
              </div>
            </div>
            <div className="category-card_one">
              <img src="https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600" />
              <div className="category-name">
                <h3>Electronics</h3>
                <p>New Trends</p>
              </div>
            </div>
          </div>
          <div className="slider part-0ne">
            <div className="category-card_one">
              <img src="https://w0.peakpx.com/wallpaper/138/1011/HD-wallpaper-of-a-laptop-and-a-tablet-on-the-table-thumbnail.jpg" />
              <div className="category-name">
                <h3>Electronics</h3>
                <p>New Trends</p>
              </div>
            </div>
            <div className="category-card_one">
              <img src="https://w0.peakpx.com/wallpaper/371/602/HD-wallpaper-room-chair-window-interior-thumbnail.jpg" />
              <div className="category-name">
                <h3>Electronics</h3>
                <p>New Trends</p>
              </div>
            </div>
            <div className="category-card_one">
              <img src="https://w0.peakpx.com/wallpaper/28/225/HD-wallpaper-op-shop-treasures-clothes-second-hand-dolls-vintage-wedding-dress-hand-made-old-op-shop-vintage-thumbnail.jpg" />
              <div className="category-name">
                <h3>Electronics</h3>
                <p>New Trends</p>
              </div>
            </div>
          </div>
          <div className="slider part-0ne">
            <div className="category-card_one">
              <img src="https://w0.peakpx.com/wallpaper/138/1011/HD-wallpaper-of-a-laptop-and-a-tablet-on-the-table-thumbnail.jpg" />
              <div className="category-name">
                <h3>Electronics</h3>
                <p>New Trends</p>
              </div>
            </div>
            <div className="category-card_one">
              <img src="https://w0.peakpx.com/wallpaper/371/602/HD-wallpaper-room-chair-window-interior-thumbnail.jpg" />
              <div className="category-name">
                <h3>Electronics</h3>
                <p>New Trends</p>
              </div>
            </div>
            <div className="category-card_one">
              <img src="https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600" />
              <div className="category-name">
                <h3>Electronics</h3>
                <p>New Trends</p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="product-container">
        <Product />
      </div>
    </>
  );
}

export default Home;
