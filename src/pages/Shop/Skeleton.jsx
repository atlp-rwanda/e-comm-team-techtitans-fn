import "../../styles/Skeleton.scss";

function Skeleton() {
  return (
    <>
      <div className="buyer-product-wrapper-3">
        <div className="left-side-3">
          <div className="main-image-3">
            <img />
          </div>
          <div className="image-wrapper-3"></div>
          <div className="other-images"></div>
        </div>
        <div className="right-side-3">
          <div className="right-side-3-h2"></div>
          <div className="right-side-3-h3"></div>
          <div className="right-side-3-p right-side-3-p-animation"></div>
          <div className="buyer-choice-3">
            <div className="color-picker-3">
              <label></label>
            </div>
            <div className="size-dropdown-3">
              <label></label>
            </div>
            <div className="quantity-dial-3">
              <label></label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skeleton;
