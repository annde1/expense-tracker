import Form from "react-bootstrap/Form";
import { useState } from "react";

function SearchExpense({ onNameFilterChange }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onNameFilterChange(value);
  };

  return (
    <>
      <Form.Control
        type="search"
        placeholder="Search expenses..."
        className="me-2 expenseSearch"
        aria-label="Search"
        value={searchValue}
        onChange={handleSearch}
      />
    </>
  );
}
export default SearchExpense;
