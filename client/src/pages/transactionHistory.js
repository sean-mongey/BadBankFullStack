import React, { useEffect, useState } from "react";
import { Card, Table, FormControl, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useTransactionState from "../components/useTransactionState.js";

const TransactionHistory = () => {
  const {
    currentUser,
    setCurrentUser,
    transactions,
    setTransactions,
    searchTerm,
    setSearchTerm,
  } = useTransactionState();

  const navigate = useNavigate();

  const fetchTransactionHistory = async () => {
    if (currentUser) {
      try {
        const response = await fetch(
          `https://badbankfullstack-backend.onrender.com/account/transactions/${currentUser.email}`
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }

        let data = await response.json();

        data.forEach((transaction) => {
          transaction.timestamp = new Date(
            `${transaction.date}T${transaction.time}`
          );
        });

        // Sort transactions by timestamp descending
        data.sort((a, b) => b.timestamp - a.timestamp);

        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, [currentUser]);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm) ||
      (transaction.date && transaction.date.includes(searchTerm)) ||
      (transaction.time && transaction.time.includes(searchTerm))
  );

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
          <h2>Transaction History</h2>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search transactions"
              aria-label="Search transactions"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {currentUser && currentUser.loginStatus ? (
            <div style={{ overflowY: "auto", maxHeight: "60vh" }}>
              <Table striped bordered hover variant="light">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.date}</td>
                      <td>{transaction.time}</td>
                      <td>{transaction.type}</td>
                      <td>${Math.abs(transaction.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div>
              <h3>Please log in to view your transaction history.</h3>
              <Button onClick={() => navigate("/login")} variant="light">
                Go to Login
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TransactionHistory;
