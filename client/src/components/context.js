import React, { useContext, useState, createContext } from "react";

// Create the contexts
const CurrentUserContext = createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    const response = await fetch(
      `https://badbankfullstack-backend.onrender.com/account/login/${email}/${password}`
    );
    const user = await response.json();
    if (response.status === 200) {
      setCurrentUser({ ...user, loginStatus: true });
      return true;
    } else {
      alert("Login failed. Please check your credentials.");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const retrieveBalance = async () => {
    if (currentUser) {
      try {
        const response = await fetch(
          `https://badbankfullstack-backend.onrender.com/account/balance/${currentUser.email}`
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setCurrentUser((prevUser) => ({
          ...prevUser,
          balance: data.balance,
        }));
      } catch (error) {
        console.error("Error retrieving balance:", error);
      }
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, login, logout, retrieveBalance }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};

// Export the contexts for use in other components
export { CurrentUserProvider, useCurrentUser, CurrentUserContext };
