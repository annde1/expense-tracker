import Form from "react-bootstrap/Form";
import { useState } from "react";
function SortExpenses({ onSortChange }) {
  const [sortBy, setSortBy] = useState("");
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    onSortChange(selectedSort);
  };
  return (
    <Form.Select
      aria-label="Default select example"
      className="sortSelect"
      value={sortBy}
      onChange={handleSortChange}
    >
      <option>Sort expenses by</option>
      <option value="show-all">Show All</option>
      <option value="value-asc">Value ASC</option>
      <option value="value-desc">Value DES</option>
      <option value="o-t-n">Oldest To Newest</option>
      <option value="n-t-o">Newest To Oldest</option>
    </Form.Select>
  );
}
export default SortExpenses;
