import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import EntryContext from "../../store/entry-context";
import "../modal.css";
import { IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const EditDeleteModal = ({ show, setShow, rowInfo }) => {
  const handleClose = () => setShow(false);
  const entryContext = useContext(EntryContext);

  const [company, setCompany] = useState(rowInfo.company);
  const [product, setProduct] = useState(rowInfo.product);
  const [quantity, setQuantity] = useState(rowInfo.quantity);
  const [etd, setEtd] = useState(format(new Date(rowInfo.etd), "yyyy-MM-dd"));
  const [eta, setEta] = useState(format(new Date(rowInfo.eta), "yyyy-MM-dd"));

  useEffect(() => {
    setCompany(rowInfo.company);
    setProduct(rowInfo.product);
    setQuantity(rowInfo.quantity);
    setEtd(format(new Date(rowInfo.etd), "yyyy-MM-dd"));
    setEta(format(new Date(rowInfo.eta), "yyyy-MM-dd"));
  }, [rowInfo]);

  const submit = async (e) => {
    e.preventDefault();
    entryContext.updateEntryGlobal(
      rowInfo._id,
      company,
      product,
      quantity,
      etd,
      eta
    );
    handleClose();
  };

  const onDelete = async () => {
    entryContext.deleteEntryGlobal(rowInfo._id);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="modal-custom"
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Entry Information: </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submit}>
          <FloatingLabel label="Company Name" className="mb-3 fr-label">
            <Form.Control
              className="shadow-none fr-control"
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel label="Product" className="mb-3 fr-label">
            <Form.Control
              className="shadow-none fr-control"
              type="text"
              value={product}
              required
              onChange={(e) => setProduct(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel label="Quantity" className="mb-3 fr-label">
            <Form.Control
              className="shadow-none fr-control"
              type="number"
              value={quantity}
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel label="ETD" className="mb-4 fr-label">
            <Form.Control
              className="shadow-none fr-control"
              type="date"
              value={etd}
              required
              onChange={(e) => setEtd(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="ETA" className="mb-3 fr-label">
            <Form.Control
              className="shadow-none fr-control"
              type="date"
              value={eta}
              required
              onChange={(e) => setEta(e.target.value)}
            />
          </FloatingLabel>
          <div className="modal-buttons">
            <Button variant="outline-info" type="submit">
              <span className="centered-label">
                Update <IoIosSave style={{ marginLeft: "10px" }} />
              </span>
            </Button>

            <Button variant="outline-danger" onClick={onDelete}>
              <span className="centered-label">
                Delete <MdDelete style={{ marginLeft: "10px" }} />
              </span>
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditDeleteModal;
