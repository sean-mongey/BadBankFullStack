//userTransactions.js
import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import useTransactionState from "../components/useTransactionState.js";

const UserTransactions = () => {
  const { email } = useParams();

  const { transactions, setTransactions } = useTransactionState();
  const navigate = useNavigate();

  const fetchUserTransactions = async () => {
    if (email) {
      try {
        const response = await fetch(
          `http://localhost:3333/account/transactions/${email}`
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }

        let data = await response.json();

        // Ensure that the timestamp is a valid Date object
        data.forEach((transaction) => {
          transaction.timestamp = new Date(
            `${transaction.date}T${transaction.time}`
          );
        });

        // Sort transactions by timestamp descending
        data.sort((a, b) => b.timestamp - a.timestamp);

        setTransactions(data);
      } catch (error) {
        console.error("Error fetching user transactions:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, [email]);

  return (
    <div>
      <Card
        style={{
          height: "100vh",
          width: "90vw",
          margin: "auto",
          overflowY: "auto",
        }}
        bg="info"
        text="white"
      >
        <Card.Body>
          <h2>Transaction History for {email}</h2>
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
                {transactions.map((transaction, index) => (
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
          <Button variant="light" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserTransactions;
