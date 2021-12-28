import { Modal } from "react-bootstrap";

const InfoModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="modal-custom"
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Information: </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <strong className="text-white">Description:</strong>
        <p className="text-white">
          A straight-forward table management application that implements a REST
          API. This is a full-stack application created using the MERN Stack.{" "}
        </p>
        <strong className="text-white">Functions and Features:</strong>
        <ul className="text-white">
          <li>
            <strong>Add</strong> click "Add Entry" button and fill the form
            appropiately
          </li>
          <li>
            <strong>Delete</strong> to delete an entry, click on an entry and
            click "Delete" button
          </li>
          <li>
            <strong>Edit</strong> to edit an entry, click on an entry and change
            the information. Click "Update" button when finsihed
          </li>
          <li>
            <strong>Download</strong> "Download" button to export data to .csv
            file
          </li>
          <li>
            <strong>Table</strong> All table functionalities are implemented
            using react-table library
          </li>
          <li>
            <strong>Authentication</strong> Standard MERN authentication
            implementation, user information is stored in JWT
          </li>
        </ul>
        <strong className="text-white">Made by: </strong>
        <a
          href="https://www.linkedin.com/in/trisentosa-wisesa-a568361a3/"
          target="_blank"
          className="text-white"
        >
          Trisentosa Wisesa
        </a>
      </Modal.Body>
    </Modal>
  );
};

export default InfoModal;
