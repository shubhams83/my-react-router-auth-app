// Store

import { createContext, useContext, useReducer } from "react";

// Container filled with Groceries
const initialState = { auth: false };

// Create a Store Room for Container
const authContext = createContext(initialState);

// Create a Function/Utility to alter the contents of the Groceries inside the Container.
export function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { auth: true };
    case "logout":
      return { auth: false };
    default:
      throw new Error();
  }
}

// Utility Hook => Incharge/Provider Function to access the Store Room
export function AuthProvider({ children }) {
  // Hook used to alter the state of the store using state and reducer functions
  // initial State === authed
  // dispatch is used to alter the state of the store/auth/authed/initialState
  const [authed, dispatch] = useReducer(reducer, initialState)
  return (
    <authContext.Provider value={[authed, dispatch]}>
      {children}
    </authContext.Provider>
  );
}

// Utility Hook => User/Consumer Component Function to avail the Groceries from Container
export default function AuthConsumer() {
  return useContext(authContext);
}
