import { format } from "date-fns";

//not all fields should be included (e.g. password should be left out)
export const COLUMNS = [
  {
    Header: "Id",
    accessor: "_id",
    disableFilters: true,
    disableGlobalFilter: true,
  },
  {
    Header: "Company",
    accessor: "company",
  },
  {
    Header: "Product",
    accessor: "product",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "ETD",
    accessor: "etd",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "ETA",
    accessor: "eta",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Company",
    accessor: "company",
  },
  {
    Header: "Product",
    accessor: "product",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Date",
    columns: [
      {
        Header: "EDA",
        accessor: "eda",
      },
      {
        Header: "ETA",
        accessor: "eta",
      },
    ],
  },
];
