import React, { createContext, useState } from "react";

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [username, setUsername] = useState("");

  return (
    <LoginContext.Provider value={{ username, setUsername }}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
