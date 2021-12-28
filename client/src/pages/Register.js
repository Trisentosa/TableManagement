import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api-calls";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import validator from "validator";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Validations
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [emailValidMessage, setEmailValidMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [nameValidMessage, setNameValidMessage] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);

  const validatePassword = (value) => {
    setPassword(value);
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      setIsStrongPassword(true);
      setPasswordStrength("Strong password!");
    } else {
      setIsStrongPassword(false);

      setPasswordStrength("(min 8 chars, at least 1 capital and number)");
    }
  };

  const validateEmail = (value) => {
    setEmail(value);
    if (validator.isEmail(value)) {
      setIsEmailValid(true);
      setEmailValidMessage("Valid Email!");
    } else {
      setIsEmailValid(false);
      setEmailValidMessage("Email is Invalid!");
    }
  };

  const validateName = (value) => {
    setName(value);
    if (value.length > 0) {
      setNameValidMessage("Valid Name!");
      setIsNameValid(true);
    } else {
      setNameValidMessage("");
      setIsNameValid(false);
    }
  };

  let navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(name, email, password);
      console.log(response);
      if (response.status === 200) {
        return navigate("/login");
      } else if (response.status === 406) {
        setIsEmailValid(false);
        setEmailValidMessage("Email already exists!");
      } else {
        alert("Invalid user entry!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="form-signin">
      <Form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal fr-text">Register</h1>
        <FloatingLabel label="Name" className="mb-3 fr-label">
          <Form.Control
            className="shadow-none fr-control"
            type="text"
            required
            onChange={(e) => validateName(e.target.value)}
          />
          <span className={isNameValid ? "ok-message" : undefined}>
            {nameValidMessage}
          </span>
        </FloatingLabel>

        <FloatingLabel label="Email" className="mb-3 fr-label">
          <Form.Control
            className="shadow-none fr-control"
            type="email"
            required
            onChange={(e) => validateEmail(e.target.value)}
          />
          <span className={isEmailValid ? "ok-message" : "error-message"}>
            {emailValidMessage}
          </span>
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-3 fr-label">
          <Form.Control
            className="shadow-none fr-control"
            type="password"
            required
            onChange={(e) => validatePassword(e.target.value)}
          />
          <span className={isStrongPassword ? "ok-message" : "error-message"}>
            {passwordStrength}
          </span>
        </FloatingLabel>

        <Button variant="outline-light" type="submit" className="shadow-none">
          Register
        </Button>
        <div className="user-link">
          <Link className="nav-link linkus" to="/login">
            Login Here...
          </Link>
        </div>
      </Form>
    </main>
  );
};

export default Register;
