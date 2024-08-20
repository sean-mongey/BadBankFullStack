import React from "react";
import { Card } from "react-bootstrap";

function Home() {
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
          <Card.Title>Welcome to the Bad Bank!</Card.Title>

          <div className="d-flex flex-column align-items-center">
            <img src="bank.png" className="img-fluid " alt="responsive image" />
            <br />
            <Card.Text>
              The bank that has absolutely no $$$ and even less security
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
