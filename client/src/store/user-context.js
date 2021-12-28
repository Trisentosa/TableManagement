import { createContext, useState } from "react";

const UserContext = createContext({
  name: "",
  resetName: (name) => {},
});

export function UserContextProvider(props) {
  const [name, setName] = useState("");
  function resetName(name) {
    setName(name);
  }

  const context = {
    name,
    resetName: resetName,
  };
  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
