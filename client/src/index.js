import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./store/user-context";
import { EntryContextProvider } from "./store/entry-context";

ReactDOM.render(
  <UserContextProvider>
    <EntryContextProvider>
      <App />
    </EntryContextProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
