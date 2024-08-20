import React, { useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

import {
  validateName,
  validateEmail,
  validatePassword,
  validateCreate,
} from "../components/validation.js";
import useTransactionState from "../components/useTransactionState.js";

const CreateAccount = () => {


  const {
    currentUser,
    setCurrentUser,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    formValid: createFormValid,
    setFormValid: setCreateFormValid,
    showForm: showCreateForm,
    setShowForm: setShowCreateForm,
    inputRef: nameRef,
    continueButtonRef: createAnotherButtonRef,
    validateForm,
  } = useTransactionState({
    initialName: "",
    initialEmail: "",
    initialPassword: "",
    showFormInitially: true,
  });

  const capitalise = (string) =>
    string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const clearCreateForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShowCreateForm(true);
    nameRef.current && nameRef.current.focus();
  };

  const handleCreate = async (event) => {
    // Add event parameter
    event.preventDefault(); // Prevent default form submission behavior
    const capitalisedName = capitalise(name);

    try {
      const response = await fetch(
        `http://localhost:3333/account/create/${capitalisedName}/${email}/${password}`
      );
      const userData = await response.json();

      if (response.status === 201) {
        setShowCreateForm(false);
        logout();
      } else {
        alert(
          "Error: This email address is already linked to an existing account. Please enter a new email address, or navigate to the login page"
        );
        clearCreateForm();
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("There was an error creating the account. Please try again."); // Error handling
    }
  };

  useEffect(() => {
    console.log("useEffect1 starting");
    setCreateFormValid(validateCreate(name, email, password));
  }, [name, email, password]);

  useEffect(() => {
    console.log("useEffect2 starting");
    if (showCreateForm) {
      nameRef.current && nameRef.current.focus();
    } else {
      createAnotherButtonRef.current && createAnotherButtonRef.current.focus();
    }
  }, [showCreateForm]);

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
          {showCreateForm ? (
            <Form onSubmit={handleCreate}>
              {" "}
              {/* Change from onClick to onSubmit */}
              <h2>Create Account</h2>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ref={nameRef}
                  autoComplete="name"
                />
                {name === "" && <p>Please enter your name</p>}
                {name && !validateName(name) && (
                  <p>Name cannot contain numbers or special characters</p>
                )}
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                {email === "" && <p>Please enter your email</p>}
                {email && !validateEmail(email) && (
                  <p>Please enter a valid email</p>
                )}
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                {password === "" && <p>Please enter a password</p>}
                {password && !validatePassword(password) && (
                  <p>Password must be at least 8 characters long</p>
                )}
              </Form.Group>
              <br />
              <Button
                className="mr-2 mb-2"
                variant="light"
                type="submit"
                disabled={!createFormValid}
              >
                Create Account
              </Button>
            </Form>
          ) : (
            <Form>
              <Row>
                <Col xs={9}>
                  <h2>
                    Congratulations {capitalise(name)}!!! You have successfully
                    opened an account with us at Bad Bank.
                  </h2>
                  <br />
                  <p>Our deepest condolences</p>
                </Col>
                <Col xs={3} className="mb-2 text-right">
                  <Button
                    variant="light"
                    onClick={clearCreateForm}
                    ref={createAnotherButtonRef}
                  >
                    Create Another Account
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateAccount;
