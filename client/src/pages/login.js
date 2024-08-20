import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useCurrentUser } from "../components/context.js";
import useTransactionState from "../components/useTransactionState.js";
import { validateEmail } from "../components/validation.js";

const Login = () => {
  const { currentUser, login, logout } = useCurrentUser();

  const {
    loading,
    setLoading,
    loginAttempted,
    setLoginAttempted,
    email,
    setEmail,
    password,
    setPassword,
    formValid: loginFormValid,
    setFormValid: setLoginFormValid,
    showForm: showLoginForm,
    setShowForm: setShowLoginForm,
    inputRef: emailInputRef,
    continueButtonRef: logoutButtonRef,
  } = useTransactionState({
    initialEmail: "",
    initialPassword: "",
    showFormInitially: !currentUser?.loginStatus,
  });

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setShowLoginForm(true);
  };

  // Asynchronous function to handle user login
  const handleLogin = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Log the start of the login process for debugging purposes
    console.log("handleLogin starting");

    // Start the try block to catch any errors
    try {
      // Set loading state to true to indicate the login process is ongoing
      setLoading(true);
      // Mark that a login attempt has been made
      setLoginAttempted(true);

      // Await the login function that uses the provided email and password
      await login(email, password);
      clearForm();
    } catch (error) {
      // Log any errors that occur during the login process
      console.error("Error during login:", error);
      emailInputRef.current && emailInputRef.current.focus();
    } finally {
      // Stop the loading state after processing the login attempt or error
      setLoading(false);
    }
  };

  // useEffect hook to validate the login form whenever email or password changes
  useEffect(() => {
    // Set login form validity based on email and password inputs
    setLoginFormValid(validateEmail(email) && password.trim() !== "");
  }, [email, password]);

  // useEffect hook to handle actions after a login attempt has been made
  useEffect(() => {
    // Check if a login attempt has been made and if there's a current user
    if (loginAttempted && currentUser) {
      // If the user is logged in successfully
      if (currentUser.loginStatus) {
        // Hide the login form
        setShowLoginForm(false);
        // If the logout button exists, focus on it
        logoutButtonRef.current && logoutButtonRef.current.focus();
      } else {
        // Clear the form fields
        clearForm();
        // If the email input field exists, focus on it
        emailInputRef.current && emailInputRef.current.focus();
      }
      // Stop the loading state after processing the login attempt
      setLoading(false);
      // Reset the login attempted state
      setLoginAttempted(false);
    }
  }, [currentUser, loginAttempted]);
  const userLogout = () => {
    logout();
    clearForm();
  };

  const forgottenPassword = () => {
    alert("Seriously!........");
    alert("You forgot your password!!!");
    alert("What an idiot!");
    alert("Let this be a lesson");
    alert(
      "We are keeping all the money until you get your s#*@ together and remember your details."
    );
    alert("Surely you wrote them down somewhere...");
    alert("Maybe check under the bed...?");
  };

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
          {showLoginForm ? (
            <Form onSubmit={handleLogin}>
              <h2>Login</h2>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="input"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  ref={emailInputRef}
                  autoComplete="email"
                  disabled={loading}
                />
                {email === "" && <p>Please enter your email</p>}
                {email && !validateEmail(email) && (
                  <p>Please enter a valid email</p>
                )}
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  autoComplete="password"
                  disabled={loading}
                />
                {password === "" && <p>Please enter your password</p>}
              </Form.Group>
              <br />
              <Row>
                <Col xs={6}>
                  <Button
                    className="mr-2 mb-2"
                    variant="light"
                    type="submit"
                    disabled={!loginFormValid || loading}
                    ref={logoutButtonRef}
                  >
                    {loading ? "Logging in..." : "Login"}{" "}
                    {/* Show loading text */}
                  </Button>
                </Col>
                <Col xs={6} className="text-right">
                  <Button
                    variant="light"
                    type="button"
                    onClick={forgottenPassword}
                    disabled={loading}
                  >
                    Forgot email/password
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <Form>
              <Row>
                <Col xs={6}>
                  <h2 className="mb-2">Login Successful</h2>
                  <br />
                  <h1>Welcome {currentUser?.name} to Bad Bank</h1>
                </Col>
                <Col xs={6} className="text-end mt-3">
                  <Button
                    ref={logoutButtonRef}
                    variant="light"
                    onClick={userLogout}
                  >
                    Logout
                  </Button>
                </Col>
              </Row>
              <div className="d-flex flex-column align-items-center">
                <img
                  src="bank.png"
                  className="img-fluid"
                  alt="responsive image"
                />
                <p
                  className="text-muted"
                  style={{
                    fontSize: "0.7em",
                    fontStyle: "italic",
                    transform: "skewX(-10deg)",
                  }}
                >
                  Welcome to Bad Bank, where we excel at being the epitome of
                  badness in the banking world. Please be advised, while we
                  strive to provide the worst banking experience possible, our
                  commitment to terribleness knows no bounds. Here are some
                  important reminders/ Customer Disservice: Our customer service
                  representatives are trained to be as unhelpful and indifferent
                  as possible. Expect long wait times, confusing responses, and
                  a general sense of despair when contacting us./ Fee Frenzy:
                  Prepare for a barrage of fees at every turn. From breathing
                  too loudly near an ATM to daring to check your balance, we'll
                  find a way to charge you for it. Remember, our motto is
                  "nickel and dime until you're out of time."/ Security Theater:
                  Rest assured, your security is of little concern to us. While
                  we claim to take your privacy seriously, our security measures
                  are about as effective as a paper umbrella in a hurricane.
                  Feel free to share your PIN with strangers; it's not like
                  we'll notice./ Interest Insanity: Our interest rates are as
                  stable as a house of cards in a windstorm. Prepare for
                  fluctuations that will leave you questioning the very fabric
                  of reality. Just when you think you understand, we'll change
                  the rules without warning. Fun, isn't it?/ Fineprint Follies:
                  We've hidden more surprises in our terms and conditions than a
                  mystery novel. Make sure to read every line with a magnifying
                  glass and a lawyer on retainer. We take pride in our ability
                  to make the simple act of banking feel like solving a Rubik's
                  Cube blindfolded./ Remember, at Bad Bank, your dissatisfaction
                  is our badge of honor. So buckle up and enjoy the ride into
                  financial chaos!
                </p>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
