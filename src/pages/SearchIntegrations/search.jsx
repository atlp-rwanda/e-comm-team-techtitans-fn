import { useState } from "react";
import "./search.scss";
import { SearchBar } from "../../components/SearchCompon/SearchBar";
import { SearchResultsList } from "../../components/SearchCompon/SearchResultsList";
const Searching = () => {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && (
          <SearchResultsList results={results} />
        )}
      </div>
    </div>
  );
};

export default Searching
