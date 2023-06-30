import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ViewCategory } from "../Redux/Features/Product/CategorySlice";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "./Product/FilterProduct";
import { ThemeContext } from "./Theme/ThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.category);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = dispatch(ViewCategory());
        console.log("response data", response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
  const productCategories = product?.data?.categories;
  console.log("response of categories", product?.data?.categories[0]);
  console.log(
    "response of categories products",
    product?.data?.categories[0]?.categoryProducts[0].images[0]
  );

  const navigate = useNavigate();
  let backgroundUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2s9HDKipReXD4JCwZtvwq21UdaVbif2z2QQ&usqp=CAU";
  let handleClick = () => {
    navigate("/chat");
  };
  const renderSlides = () => {
    if (status === "loading....") {
      return <div>Loading...</div>;
    }

    if (productCategories?.length > 0) {
      const slides = [];
      for (let i = 0; i < productCategories.length; i += 3) {
        const categoriesSlice = productCategories.slice(i, i + 3);

        slides.push(
          <div className="slider part-0ne" key={`slide-${i}`}>
            {categoriesSlice.map((category) => (
              <div className="category-card_one" key={category?.id}>
                <Link to={`/category/product/${category?.id}`}>
                  {category?.categoryProducts[0]?.images[0] && (
                    <img
                      src={
                        category?.categoryProducts &&
                        category?.categoryProducts.length > 0
                          ? category?.categoryProducts[0]?.images[0]
                          : "https://placehold.co/600x400"
                      }
                      alt="Product"
                    />
                  )}
                  <div className="category-name">
                    <h3>{category?.name}</h3>
                    <p>New Trends</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        );
      }

      return slides;
    }

    return <div>Empty</div>;
  };
  return (
    <>
      <div className="Home-content" id={theme}>
        <div className="homeContainer">
          <Carousel
            autoPlay
            infiniteLoop
            autoFocus
            showThumbs={false}
            showStatus={false}>
            <div className="slider">
              <img src="https://w0.peakpx.com/wallpaper/991/598/HD-wallpaper-workspace-laptop-headphones-watch-ultra-computers-hardware-business-laptop-music-phone-modern-desk-background-minimalist-technology-mobile-computer-silver-clean-minimalism-headphones.jpg" />
              <div className="word-part">
                <p>High Quality</p>
                <h3>Electronics</h3>
                <a href="#" className="btn-shop" style={{ color: "white" }}>
                  Shop now
                </a>
              </div>
            </div>
            <div className="slider">
              <img src="https://c4.wallpaperflare.com/wallpaper/488/747/592/design-sofa-interior-pillow-living-room-hd-wallpaper-preview.jpg" />
              <div className="word-part">
                <p>High Quality</p>
                <h3>Furnitures</h3>
                <a href="#" className="btn-shop" style={{ color: "white" }}>
                  Shop now
                </a>
              </div>
            </div>
            <div className="slider">
              <img src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?" />
              <div className="word-part">
                <p>High Quality</p>
                <h3>Clothes</h3>
                <a href="#" className="btn-shop" style={{ color: "white" }}>
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
            infiniteLoop
            autoFocus
            showStatus={false}
            showThumbs={false}
            showArrows={false}>
            {renderSlides()}
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
