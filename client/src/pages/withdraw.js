//withdraw.js
import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useCurrentUser } from "../components/context.js";
import { displayAmount } from "../components/transactionTools.js";
import {
  validNumber,
  aboveZero,
  validateWithdrawal,
} from "../components/validation.js";
import useTransactionState from "../components/useTransactionState.js";

const Withdraw = () => {
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

  const handleWithdrawal = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      alert("You must be logged in to perform this action.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3333/account/update/${currentUser.email}/-${transactionAmount}`
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
    console.log("handleWithdrawal - end");
  };

  useEffect(() => {
    if (balance !== 0 || transactionAmount !== "") {
      validateForm(transactionAmount, validateWithdrawal, balance);
    }
  }, [transactionAmount, balance]);

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
              <Form onSubmit={handleWithdrawal}>
                <h2>Withdraw</h2>
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
                    !validNumber(transactionAmount) && ( // ++++++++++++
                      <p>Please enter a valid number</p>
                    )}
                  {transactionAmount &&
                    validNumber(transactionAmount) &&
                    !aboveZero(transactionAmount) && ( // ++++++++++++
                      <p>Amount must be greater than zero</p>
                    )}
                  {transactionAmount &&
                    validNumber(transactionAmount) &&
                    aboveZero(transactionAmount) &&
                    !validateWithdrawal(transactionAmount, balance) && ( // ++++++++++++
                      <p>Insufficient funds</p>
                    )}
                </Form.Group>
                <br />
                <Button
                  disabled={!transactionFormValid}
                  variant="light"
                  type="submit"
                >
                  Withdraw
                </Button>
              </Form>
            ) : (
              <>
                <h2>
                  Withdrawal of ${displayAmount(lastTransactionAmount)}{" "}
                  Successful
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
              <h3>This isn't a free cash giveaway!</h3>
              <h2>LOGIN TO USE THIS FEATURE</h2>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Withdraw;
