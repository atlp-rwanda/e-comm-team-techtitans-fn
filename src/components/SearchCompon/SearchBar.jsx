import { useState, useRef } from "react";
import axios from "axios";
import { MdSearch } from "react-icons/md";
import { BASE_URL } from "../../utils/apiUtilis";
import { searchEndpoint } from "../../Constants";
import "./SearchBar.scss";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const fetchData = (value) => {
    const queryParams = new URLSearchParams({
      value: value,
    }).toString();

    axios
      .get(`${BASE_URL}/api/v1/${searchEndpoint}/${queryParams}`)
      .then((response) => {
        const results = response.data.data.filter((item) => {
          const lowerCaseValue = value.toLowerCase();
          return (
            value &&
            item &&
            (item.name.toLowerCase().includes(lowerCaseValue) ||
              item.price === parseInt(value) ||
              item.Category.name.toLowerCase().includes(lowerCaseValue))
          );
        });
        setResults(results);
      })
      .catch((error) => {
        console.error("Error occurred during API request:", error);
        setResults([]);
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
          placeholder="Search by name, price, or category..."
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