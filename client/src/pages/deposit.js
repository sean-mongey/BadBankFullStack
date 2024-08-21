//deposit.js
import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { displayAmount } from "../components/transactionTools.js";
import useTransactionState from "../components/useTransactionState.js";
import {
  aboveZero,
  validNumber,
  validateDeposit,
} from "../components/validation.js";

const Deposit = () => {
  const {
    currentUser,
    setCurrentUser,
    balance,
    setBalance,
    displayBalance,
    setDisplayBalance,
    transactionAmount,
    setTransactionAmount,
    formValid: transactionFormValid,
    setFormValid: setTransactionFormValid,
    lastTransactionAmount,
    setLastTransactionAmount,
    showForm: showTransactionForm,
    setShowForm: setShowTransactionForm,
    inputRef,
    continueButtonRef,
    validateForm,
  } = useTransactionState({ initialAmount: "", showFormInitially: true });

  // Retrieve the balance and set it in the state
  const retrieveBalance = async () => {
    if (currentUser) {
      try {
        const response = await fetch(
          `http://localhost:3333/account/balance/${currentUser.email}`
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }

        const data = await response.json();
        const formattedBalance = displayAmount(data.balance); // Format the balance
        setBalance(data.balance);
        setDisplayBalance(formattedBalance); // Set the formatted balance
      } catch (error) {
        console.error("Error retrieving balance:", error);
      }
    }
  };
  useEffect(() => {
    retrieveBalance(); // Fetch balance when the component mounts
  }, [currentUser]);

  const handleDeposit = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3333/account/update/${currentUser.email}/${transactionAmount}`
      );
      const updatedUser = await response.json();

      if (response.status === 200) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          balance: updatedUser.balance,
        }));
        setBalance(updatedUser.balance);
        setLastTransactionAmount(transactionAmount);
        setTransactionAmount("");
        setShowTransactionForm(false);
      } else {
        console.error("Error updating balance:", updatedUser);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }
    console.log("handleDeposit - end");
  };

  useEffect(() => {
    validateForm(transactionAmount, validateDeposit);
  }, [transactionAmount]);

  return (
    <div>
      <Card
        style={{
          height: "100vh",
          width: "90vw",
          margin: "auto",
        }}
        bg="info"
        text="white"
      >
        <Card.Body>
          {currentUser && currentUser.loginStatus ? (
            showTransactionForm ? (
              <Form onSubmit={handleDeposit}>
                <h2>Deposit</h2>
                <h1>Balance: ${displayBalance}</h1>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    ref={inputRef}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                    value={transactionAmount}
                    type="text"
                    id="amount"
                    placeholder="Enter Amount"
                  />
                  {transactionAmount === "" && <p>Please enter an amount</p>}
                  {transactionAmount &&
                    !validNumber(transactionAmount) && ( 
                      <p>Please enter a valid number</p>
                    )}
                  {transactionAmount &&
                    validNumber(transactionAmount) &&
                    !aboveZero(transactionAmount) && ( 
                      <p>Amount must be greater than zero</p>
                    )}
                  {transactionAmount &&
                    validNumber(transactionAmount) &&
                    aboveZero(transactionAmount) &&
                    !validateDeposit(transactionAmount, balance) && ( 
                      <p>Insufficient funds</p>
                    )}
                </Form.Group>
                <br />
                <Button
                  disabled={!transactionFormValid}
                  variant="light"
                  type="submit"
                >
                  Deposit
                </Button>
              </Form>
            ) : (
              <>
                <h2>
                  Deposit of ${displayAmount(lastTransactionAmount)} Successful
                </h2>
                <br />
                <h2>New Balance ${displayBalance}</h2>
                <Button
                  ref={continueButtonRef}
                  onClick={() => setShowTransactionForm(true)}
                  variant="light"
                  type="button"
                >
                  Continue...
                </Button>
              </>
            )
          ) : (
            <div>
              <h3>Where are ya tryin to stash dat loot?</h3>
              <h2>LOGIN TO USE THIS FEATURE</h2>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Deposit;
