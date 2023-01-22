import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { openSearchModal } from "../../store/ui";
import { fetchResults } from "../../store/search";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const [queryString, setQueryString] = useState("");
  const [queryType, setQueryType] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { body: queryString, type: queryType };
    dispatch(fetchResults(query));
    dispatch(openSearchModal());
  };

  useEffect(() => {
    setQueryString("");
    setQueryType("");
  }, [location.pathname]);

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <SearchIcon />
      <input
        type="text"
        name="queryString"
        placeholder="Search"
        autoComplete="off"
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
      />
      <select value={queryType} onChange={(e) => setQueryType(e.target.value)}>
        <option value="">Search Type</option>
        <option value="users">Users</option>
        <option value="photos">Photos</option>
        <option value="locations">Locations</option>
      </select>
      <button className="navbar-button">Search</button>
    </form>
  );
};

export default SearchBar;
