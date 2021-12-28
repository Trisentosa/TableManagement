import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import { useMemo, useState, useEffect } from "react";
import "./table.css";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";

import GlobalFilter from "./GlobalFilter";
import CreateButton from "../CreateButton";
import DownloadButton from "../DownloadButton";
import { Button, ButtonGroup } from "react-bootstrap";
import EditDeleteModal from "./EditDeleteModal";

const Table = ({ columns, data }) => {
  columns = useMemo(() => columns, []);
  data = useMemo(() => data, [data]);

  const [modalShow, setModalShow] = useState(false);
  const [rowInfo, setRowInfo] = useState(false);

  //set show and the row info
  const showModal = (row) => {
    setRowInfo(row.values);
    setModalShow(!modalShow);
  };

  //object as argument (columns and rows)
  //useTable creates a table instance
  const {
    allColumns,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, //rows
    rows,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["_id"],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { globalFilter, pageIndex } = state;
  useEffect(() => {
    setPageSize(15);
  }, []);

  return (
    <div className="tableDiv">
      {rowInfo && (
        <EditDeleteModal
          show={modalShow}
          setShow={setModalShow}
          rowInfo={rowInfo}
        />
      )}

      <div className="flex-arrange mb-3">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <CreateButton />
        <DownloadButton />
      </div>
      <table {...getTableProps()} className="mb-3">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="tr-header">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TiArrowSortedDown />
                      ) : (
                        <TiArrowSortedUp />
                      )
                    ) : (
                      <TiArrowUnsorted />
                    )}
                  </span>{" "}
                  <br />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="tr-content"
                {...row.getRowProps()}
                onClick={() => showModal(row)} // console.log(' row click ', row)
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="page-options">
        <span style={{ color: "white" }} className="mx-3 py-2">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <ButtonGroup className="mx-3 btn-group-sm">
          <Button
            variant="outline-danger"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            style={{ borderRadius: "0%" }}
          >
            <BsFillSkipStartFill />
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Prev
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            style={{ borderRadius: "0%" }}
          >
            <BsFillSkipEndFill />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Table;
