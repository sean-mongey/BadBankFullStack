//index.js

import express from "express";
import cors from "cors";
import {
  create,
  findOne,
  find,
  update,
  all,
  getBalance,
  getTransactionHistory,
  recordTransaction,
} from "./dal.js";

const app = express();
const port = 4444;

// Middleware to serve static files and handle CORS
app.use(express.static("../client/public"));

app.use(cors());

// Create user account
app.get("/account/create/:name/:email/:password", async (req, res) => {
  try {
    const users = await find(req.params.email);

    if (users.length > 0) {
      return res.status(400).send("User already exists");
    }

    const user = await create(
      req.params.name,
      req.params.email,
      req.params.password
    );
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});



// Login user
app.get("/account/login/:email/:password", async (req, res) => {
  try {
    const user = await find(req.params.email);

    if (user.length > 0 && user[0].password === req.params.password) {
      // Send a valid JSON response on successful login
      res.status(200).json({ loginStatus: true, ...user[0] });
    } else {
      // Send a JSON response instead of plain text on login failure
      res.status(401).json({ loginStatus: false, message: "Login failed" });
    }
  } catch (error) {
    // Ensure all error responses are in JSON format
    res.status(500).json({ loginStatus: false, message: "Internal server error" }); 
  }
});



// Find user account
app.get("/account/find/:email", async (req, res) => {
  try {
    const user = await find(req.params.email);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Update - deposit/withdraw amount
app.get("/account/update/:email/:amount", async (req, res) => {
  try {
    const { email, amount } = req.params;
    const numericAmount = Number(amount);

    // Update the user's balance
    const response = await update(email, numericAmount);

    // Determine the type of transaction based on the amount
    const transactionType = numericAmount > 0 ? "deposit" : "withdraw";

    // Record the transaction
    await recordTransaction(email, numericAmount, transactionType);

    res.status(200).send(response);
  } catch (error) {
    console.error("Error during update:", error.message);
    res.status(500).send("Internal server error");
  }
});

// Retrieve balance of a user

app.get("/account/balance/:email", async (req, res) => {
  try {
    const user = await findOne(req.params.email); // Use findOne to retrieve user details

    if (user) {
      // Check if user exists

      res.status(200).send({ balance: user.balance }); // Send only the balance
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Get all accounts
app.get("/account/all", async (req, res) => {
  try {
    const docs = await all();
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//Get Transaction history
app.get("/account/transactions/:email", async (req, res) => {
  try {
    const email = req.params.email; // Extract email from request parameters
    const docs = await getTransactionHistory(email); // Pass the email to the function
    res.status(200).send(docs);
  } catch (error) {
    console.error("Error retrieving transaction history:", error.message);
    res.status(500).send("Internal server error");
  }
});

// Transfer money between accounts
app.get(
  "/account/transfer/:senderEmail/:recipientEmail/:amount",
  async (req, res) => {
    const { senderEmail, recipientEmail, amount } = req.params;
    try {
      // Find sender and recipient
      const sender = await findOne(senderEmail);
      const recipient = await findOne(recipientEmail);

      if (!sender || !recipient) {
        return res.status(404).json({ error: "Sender or recipient not found" });
      }

      if (sender.balance < Number(amount)) {
        return res.status(400).json({ error: "Insufficient funds" });
      }

      // Update balances
      await update(senderEmail, -Number(amount)); // Deduct amount from sender
      await update(recipientEmail, Number(amount)); // Add amount to recipient

      // Record the transaction
      await recordTransaction(
        senderEmail,
        Number(amount),
        "transfer to " + recipientEmail
      );
      await recordTransaction(
        recipientEmail,
        Number(amount),
        "transfer from " + senderEmail
      );

      res
        .status(200)
        .json({
          sender: await findOne(senderEmail),
          recipient: await findOne(recipientEmail),
        });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
