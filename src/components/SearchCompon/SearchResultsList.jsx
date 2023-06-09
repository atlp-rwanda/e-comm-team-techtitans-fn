import "./SearchResultsList.scss";
import { SearchResult } from "./SearchResult";
import { Link } from "react-router-dom";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <Link to={`/buyer/product/${result.id}`}>
            <SearchResult
              name={result.name}
              price={result.price}
              images={result.images}
              key={id}
            />
          </Link>
        );
      })}
    </div>
  );
};
