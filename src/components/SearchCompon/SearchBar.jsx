import { useState, useRef } from "react";
import { MdSearch } from "react-icons/md";
import "./SearchBar.scss";
import { BASE_URL } from "../../utils/apiUtilis";
import { productsEndpoint } from "../../Constants";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const fetchData = (value) => {
    fetch(`${BASE_URL}/api/v1/${productsEndpoint}`)
      .then((response) => response.json())
      .then((json) => {
        const results = json.data.filter((item) => {
          return (
            value &&
            item &&
            item.name &&
            item.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };
  const handleChange = (value) => {
    inputRef.current.focus();
    setInput(value);
    fetchData(value);
  };
  const handleIconClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="input-wrapper">
      <div className="input-container">
        <input
          id="search-input"
          placeholder="Search something..."
          className="search-input"
          name="text"
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <MdSearch className="search-icon" onClick={handleIconClick} />
      </div>
    </div>
  );
};
