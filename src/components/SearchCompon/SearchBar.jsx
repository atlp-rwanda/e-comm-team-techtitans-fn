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
      name: value,
    }).toString();

    axios
      .get(`${BASE_URL}/api/v1/${searchEndpoint}/${queryParams}`)
      .then((response) => {
        const results = response.data.data.filter((item) => {
          return (
            value &&
            item &&
            item.name &&
            item.name.toLowerCase().includes(value)
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
