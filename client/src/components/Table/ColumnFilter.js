import "./table.css";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="tableSearch">
      <input
        type="search"
        id="searchForm"
        className="form-control shadow-none"
        placeholder="Search..."
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default ColumnFilter;
