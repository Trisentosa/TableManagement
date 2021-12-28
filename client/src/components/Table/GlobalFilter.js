import { useAsyncDebounce } from "react-table";
import { useState } from "react";
import "./table.css";

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter); //initial value = filter value

  // wait x ms before showing results
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 400);
  return (
    <div className="tableSearch input-group">
      <input
        type="search"
        id="searchForm"
        className="form-control shadow-none search-input"
        placeholder="Search an entry..."
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default GlobalFilter;
