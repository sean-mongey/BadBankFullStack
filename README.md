# **Bad Bank**

**Bad Bank** is a capstone project for the MIT xPro Professional Certificate in Coding: Full Stack Development with MERN. This web application simulates essential banking functionalities such as account creation, login, deposit, withdrawal, transfer of funds, and transaction history viewing. The project demonstrates a comprehensive full stack implementation using the MERN stack (MongoDB, Express, React, Node.js) alongside Firebase for database management.

## **Table of Contents**
- [Introduction](#introduction)
- [File Tree](#file-tree)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Development Tools](#development-tools)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Best Practices](#best-practices)
- [Testing](#testing)
- [Known Issues](#known-issues)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## **Introduction**
**Bad Bank** is an intentionally satirical application designed to reflect the most inconvenient and user-unfriendly banking experience. The project is a culmination of the skills acquired throughout the MIT xPro Professional Certificate in Full Stack Development with MERN. It features a complete web application with a modern user interface and integrates with Firebase for user authentication and data storage.

## **File Tree
```plaintext
Bad Bank/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   ├── bank.png
│   │   ├── github.png
│   │   └── linkedIn.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── context.js
│   │   │   ├── footer.js
│   │   │   ├── navbar.js
│   │   │   ├── transactionTools.js
│   │   │   ├── useTransactionState.js
│   │   │   └── validation.js
│   │   ├── pages/
│   │   │   ├── allData.js
│   │   │   ├── createAccount.js
│   │   │   ├── deposit.js
│   │   │   ├── home.js
│   │   │   ├── login.js
│   │   │   ├── transactionHistory.js
│   │   │   ├── transfer.js
│   │   │   ├── userTransactions.js
│   │   │   └── withdraw.js
│   │   ├── App.js
│   │   └── index.js
│   ├── babel.config.json
│   ├── .gitignore
│   ├── package-lock.json
│   └── package.json
├── server/
│   ├── .gitignore
│   ├── dal.js
│   ├── database_test.js
│   ├── firebase.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── README.md
├── package.json
└── package-lock.json
```


## **Installation**

### **Prerequisites**
Ensure that you have the following software installed:
- Node.js (version 14.x or higher)
- npm
- Firebase CLI

### **Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/sean-mongey/BadBank.git
   cd BadBank

## **Usage**

### **Account Creation**
Navigate to the account creation page, where users can sign up by providing their name, email, and password.

### **Login**
Users can log in using their email and password. Upon successful login, they are redirected to the dashboard.

### **Deposit**
Users can deposit funds into their account by entering the desired amount.

### **Withdraw**
Users can withdraw funds from their account, ensuring that they have sufficient funds available.

### **Transfer**
Users can transfer funds to other users by providing the recipient’s email and the amount to transfer.

### **Transaction History**
Users can view their transaction history, which includes details such as the date, time, type (deposit, withdraw, transfer), and amount.

### **All Data (Admin)**
Admin users can view all user data, including account balances and transaction histories.

## **Technologies Used**

### **Frontend**
- **React:** For building the user interface.
- **React Bootstrap:** For styling components with a consistent and responsive design.
- **React Router:** For handling routing within the application.
- **Axios:** For making HTTP requests to the server.
- **React Toastify:** For providing notifications and alerts.

### **Backend**
- **Node.js:** The runtime environment for running JavaScript on the server.
- **Express.js:** A web application framework for Node.js, used to build the backend API.
- **Firebase Firestore:** A NoSQL document database provided by Firebase for storing and managing user and transaction data.
- **Firebase Authentication:** For managing user authentication and securing access to the application.

## **API Endpoints**

### **User Management**
- **Create Account:**  
  `GET /account/create/:name/:email/:password`  
  Creates a new user account.

- **Login:**  
  `GET /account/login/:email/:password`  
  Logs a user in by verifying their credentials.

- **Find User:**  
  `GET /account/find/:email`  
  Retrieves user details based on their email address.

### **Account Operations**
- **Get Balance:**  
  `GET /account/balance/:email`  
  Returns the current balance for a specific user.

- **Update Balance (Deposit/Withdraw):**  
  `GET /account/update/:email/:amount`  
  Updates a user’s balance by either adding (deposit) or subtracting (withdraw) an amount.

### **Transaction History**
- **Get Transaction History:**  
  `GET /account/transactions/:email`  
  Retrieves a list of all transactions for a specific user.

### **Transfer**
- **Transfer Funds:**  
  `GET /account/transfer/:senderEmail/:recipientEmail/:amount`  
  Transfers funds from one user’s account to another.

### **Admin**
- **Get All Users:**  
  `GET /account/all`  
  Retrieves details of all users.

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
