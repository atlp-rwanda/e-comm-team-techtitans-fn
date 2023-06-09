import "./SearchResult.scss";

export const SearchResult = ({ name, price, images }) => {
  const firstImage = images[0];

  return (
    <div className="search-result">
      <div className="image-container">
        <img src={firstImage} alt={`Image 0`} />
      </div>
      <div className="text-container">
        <div className="name">{name}</div>
        <div className="search-price">${price}</div>
      </div>
    </div>
  );
};
