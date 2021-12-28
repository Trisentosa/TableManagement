import { useState, useContext } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import EntryContext from "../store/entry-context";
import { RiAddFill } from "react-icons/ri";
import "./modal.css";

const CreateButton = () => {
  const entryContext = useContext(EntryContext);
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [etd, setEtd] = useState("");
  const [eta, setEta] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = async (e) => {
    e.preventDefault();
    try {
      entryContext.createEntryGlobal(company, product, quantity, etd, eta);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        variant="outline-info"
        className="shadow-none mx-3 btn-add"
        onClick={handleShow}
      >
        <span className="centered-label">
          Add Entry
          <RiAddFill size={20} />
        </span>
      </Button>

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
                onChange={(e) => setCompany(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel label="Product" className="mb-3 fr-label">
              <Form.Control
                className="shadow-none fr-control"
                type="text"
                required
                onChange={(e) => setProduct(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel label="Quantity" className="mb-3 fr-label">
              <Form.Control
                className="shadow-none fr-control"
                type="number"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel label="ETD" className="mb-4 fr-label">
              <Form.Control
                className="shadow-none fr-control"
                type="date"
                required
                onChange={(e) => setEtd(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="ETA" className="mb-3 fr-label">
              <Form.Control
                className="shadow-none fr-control"
                type="date"
                required
                onChange={(e) => setEta(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="outline-light" type="submit">
              <span className="centered-label">
                Add <RiAddFill style={{ marginLeft: "5px" }} size={20} />
              </span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateButton;
