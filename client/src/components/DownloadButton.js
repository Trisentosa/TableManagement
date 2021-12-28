import { FiDownload } from "react-icons/fi";
import EntryContext from "../store/entry-context";
import { useContext, useState } from "react";
import { CSVLink } from "react-csv";

const DownloadButton = () => {
  const entryContext = useContext(EntryContext);
  const [downloadData, setDownloadData] = useState([]);

  const download = async () => {
    const data = entryContext.entries;
    const headers = ["Company", "Product", "Quantity", "ETD", "ETA"]; //Headers for download only
    const dataArray = [headers];
    data.forEach((entry) => {
      const entryArray = [
        entry.company,
        entry.product,
        entry.quantity,
        entry.etd,
        entry.eta,
      ];
      dataArray.push(entryArray);
    });
    setDownloadData(dataArray);
  };
  return (
    <CSVLink
      className="btn btn-add btn-outline-success download-link shadow-none"
      onClick={download}
      data={downloadData}
      filename={"table-management.csv"}
    >
      <span className="centered-label">
        Download <FiDownload size={20} style={{ marginLeft: "5px" }} />
      </span>
    </CSVLink>
  );
};

export default DownloadButton;
