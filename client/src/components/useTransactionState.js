import { useState, useRef, useEffect } from "react";
import { useCurrentUser } from "./context.js";
const useTransactionState = (initialState = {}) => {
  const {
    initialAmount = "",
    initialName = "",
    initialEmail = "",
    initialPassword = "",
    showFormInitially = true,
  } = initialState;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [balance, setBalance] = useState(0);
  const [displayBalance, setDisplayBalance] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(initialAmount);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [formValid, setFormValid] = useState(false);
  const [lastTransactionAmount, setLastTransactionAmount] = useState(null);
  const [showForm, setShowForm] = useState(showFormInitially);
  const [recipientEmail, setRecipientEmail] = useState("");
  const inputRef = useRef(null);
  const continueButtonRef = useRef(null);

  const validateForm = (value, validationFn, extraParam = null) => {
    if (extraParam !== null) {
      setFormValid(validationFn(value, extraParam));
    } else {
      setFormValid(validationFn(value));
    }
  };

  useEffect(() => {
    if (showForm) {
      inputRef.current && inputRef.current.focus();
    } else {
      continueButtonRef.current && continueButtonRef.current.focus();
    }
  }, [showForm]);

  return {
    transactions,
    setTransactions,
    recipientEmail,
    setRecipientEmail,
    allUsers,
    setAllUsers,
    searchTerm,
    setSearchTerm,
    loading,
    setLoading,
    loginAttempted,
    setLoginAttempted,
    currentUser,
    setCurrentUser,
    balance,
    setBalance,
    displayBalance,
    setDisplayBalance,
    transactionAmount,
    setTransactionAmount,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    formValid,
    setFormValid,
    lastTransactionAmount,
    setLastTransactionAmount,
    showForm,
    setShowForm,
    inputRef,
    continueButtonRef,
    validateForm,
  };
};

export default useTransactionState;
