// export default AllData;
import React, { useState, useEffect } from "react";
import { Card, Button, FormControl, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import useTransactionState from "../components/useTransactionState.js";

function AllData() {

  const {
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
    searchTerm,
    setSearchTerm,
  } = useTransactionState({ initialAmount: "", showFormInitially: true });

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/"); // Redirect non-admin users to home page
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch("https://badbankfullstack-backend.onrender.com/account/all");
        const users = await response.json();
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewUserTransactions = (email) => {
    navigate(`/userTransactions/${encodeURIComponent(email)}`);
  };

  const filteredUsers = allUsers.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="mb-4">All Account Information</h2>
          <FormControl
            type="text"
            placeholder="Search by Email"
            className="mt-3 mb-3"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div style={{ overflowY: "auto", maxHeight: "60vh" }}>
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>${user.balance.toLocaleString()}</td>
                    <td>
                      <Button
                        variant="light"
                        onClick={() => handleViewUserTransactions(user.email)}
                      >
                        View Transactions
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AllData;
