import { useContext } from "react";
import { CurrentUserContext } from "./context.js";

const useUserBalance = () => {
  const currentUser = useContext(CurrentUserContext);
  const balance =
    currentUser && currentUser.balance !== undefined ? currentUser.balance : 0; 
  const formattedBalance = displayBalance(balance);

  return { balance, formattedBalance };
};

// Function to format and display the balance
const displayBalance = (balance) => {
  if (balance === undefined || balance === null) {
    console.warn("Balance is undefined or null, defaulting to 0.");
    return "0"; // Return "0" as a fallback
  }
  return balance.toLocaleString();
};

// Function to format and display amounts
const displayAmount = (amount) => Number(amount).toLocaleString();

// Function to get the current date as a string
const getDate = () => new Date().toString();

// Export all the functions at the end of the file
export { useUserBalance, displayBalance, displayAmount, getDate };
