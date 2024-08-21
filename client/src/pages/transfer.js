import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useCurrentUser } from "../components/context.js";
import { displayAmount } from "../components/transactionTools.js";
import useTransactionState from "../components/useTransactionState.js";
import {
  validNumber,
  aboveZero,
  validateEmail,
} from "../components/validation.js";

const Transfer = () => {
  const {
    currentUser,
    setCurrentUser,
    balance,
    setBalance,
    recipientEmail,
    setRecipientEmail,
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
        const formattedBalance = displayAmount(data.balance);
        setBalance(data.balance);
        setDisplayBalance(formattedBalance);
      } catch (error) {
        console.error("Error retrieving balance:", error);
      }
    }
  };

  useEffect(() => {
    retrieveBalance();
  }, [currentUser]);

  const handleTransfer = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      return;
    }
    try {
      const response = await fetch(
        `https://badbankfullstack-backend.onrender.com/account/transfer/${currentUser.email}/${recipientEmail}/${transactionAmount}`
      );
      let result;

      try {
        result = await response.json(); // +++++++++ Attempt to parse JSON
      } catch (e) {
        console.error("Invalid JSON response:", e); // +++++++++
        alert(
          "There was an error processing the transfer. Please try again later."
        ); // +++++++++
        return;
      }

      if (response.status === 404) {
        // +++++++++ Check if recipient not found
        alert(
          "Recipient's email not found. Please check the email and try again."
        ); // +++++++++ Trigger alert
        setRecipientEmail(""); // +++++++++ Clear the form
        setTransactionAmount(""); // +++++++++ Clear the form
        return;
      }

      if (response.status === 200) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          balance: result.sender.balance,
        }));
        setBalance(result.sender.balance);
        setLastTransactionAmount(transactionAmount);
        setTransactionAmount("");
        setShowTransactionForm(false);
      } else {
        console.error("Error in transfer:", result);
      }
    } catch (error) {
      console.error("Error in transfer:", error);
      alert(
        "There was an error processing the transfer. Please try again later."
      ); // +++++++++
    }
  };

  useEffect(() => {
    validateForm(
      transactionAmount,
      (amount) =>
        validNumber(amount) &&
        aboveZero(amount) &&
        amount <= balance &&
        validateEmail(recipientEmail) // +++++++++ Added email validation
    );
  }, [transactionAmount, balance, recipientEmail, validateForm]); // +++++++++ Added recipientEmail to dependencies

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
              <Form onSubmit={handleTransfer}>
                <h2>Transfer</h2>
                <h1>Balance: ${displayBalance}</h1>
                <Form.Group>
                  <Form.Label>Recipient's Email</Form.Label>
                  <Form.Control
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    value={recipientEmail}
                    type="email"
                    placeholder="Enter Recipient's Email"
                  />
                  {recipientEmail === "" && (
                    <p>Please enter the recipient's email</p>
                  )}
                  {recipientEmail && !validateEmail(recipientEmail) && (
                    <p>Please enter a valid email address</p>
                  )}
                </Form.Group>
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
                  {transactionAmount && !validNumber(transactionAmount) && (
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
                    transactionAmount > balance && <p>Insufficient funds</p>}
                </Form.Group>
                <br />
                <Button
                  disabled={!transactionFormValid}
                  variant="light"
                  type="submit"
                >
                  Transfer
                </Button>
              </Form>
            ) : (
              <>
                <h2>
                  Successfully transferred $
                  {displayAmount(lastTransactionAmount)} to {recipientEmail}
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
              <h3>Please log in to transfer funds.</h3>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Transfer;
