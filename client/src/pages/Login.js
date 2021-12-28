import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/user-context";
import { useContext } from "react";
import { login, getUser } from "../api-calls";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  let userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  let navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);

      if (response.status === 200) {
        const userInfo = await (await getUser()).json();
        userContext.resetName(userInfo.name);
        navigate("/");
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <main className="form-signin">
        <Form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal fr-text">Sign In</h1>

          <FloatingLabel label="Email" className="mb-3 fr-label">
            <Form.Control
              className="shadow-none fr-control"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {loginError && (
              <span className="error-message">Wrong email or password</span>
            )}
          </FloatingLabel>

          <FloatingLabel label="Password" className="mb-3 fr-label">
            <Form.Control
              className="shadow-none fr-control"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && (
              <span className="error-message">Wrong email or password</span>
            )}
          </FloatingLabel>

          <Button variant="outline-light" type="submit" className="shadow-none">
            Sign In
          </Button>
        </Form>
        <div className="user-link">
          <Link className="nav-link linkus" to="/register">
            Register Here...
          </Link>
        </div>
      </main>{" "}
    </>
  );
};

export default Login;
