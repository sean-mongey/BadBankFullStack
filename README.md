Bad Bank
Bad Bank is a capstone project for the MIT xPro Professional Certificate in Coding: Full Stack Development with MERN. This web application simulates essential banking functionalities such as account creation, login, deposit, withdrawal, transfer of funds, and transaction history viewing. The project demonstrates a comprehensive full stack implementation using the MERN stack (MongoDB, Express, React, Node.js) alongside Firebase for database management.

Table of Contents
Introduction
Installation
Usage
Account Creation
Login
Deposit
Withdraw
Transfer
Transaction History
All Data (Admin)
Project Structure
Features
Technologies Used
Frontend
Backend
Development Tools
API Endpoints
User Management
Account Operations
Transaction History
Transfer
Admin
Security
Best Practices
Testing
Known Issues
Future Enhancements
License
Acknowledgments
Introduction
Bad Bank is an intentionally satirical application designed to reflect the most inconvenient and user-unfriendly banking experience. The project is a culmination of the skills acquired throughout the MIT xPro Professional Certificate in Full Stack Development with MERN. It features a complete web application with a modern user interface and integrates with Firebase for user authentication and data storage.

Installation
Prerequisites
Ensure that you have the following software installed:

Node.js (version 14.x or higher)
npm
Firebase CLI
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/sean-mongey/BadBank.git
cd BadBank
Install dependencies:

bash
Copy code
npm install
This will install both server and client dependencies.

Set up Firebase:

Sign in to your Firebase Console.
Create a new Firebase project.
Update the Firebase configuration in firebase.js with your project details.
Start the development servers:

bash
Copy code
npm run dev
This command will start both the Express server and the React client concurrently.

Usage
Account Creation
Navigate to the "Create Account" page.
Fill in your name, email, and password.
Submit the form to create a new account.
The system will validate your information, ensuring that the name only contains letters and spaces, the email is properly formatted, and the password meets the minimum length requirement.
Login
Go to the "Login" page.
Enter your registered email and password.
Click the login button to access your account.
Upon successful login, the user state is updated, and a welcome message is displayed.
Deposit
After logging in, navigate to the "Deposit" page.
Enter the amount you wish to deposit into your account.
Submit the form, and your balance will be updated accordingly.
The deposit amount is validated to ensure it is a positive number.
Withdraw
Log in and go to the "Withdraw" page.
Enter the amount you wish to withdraw.
Submit the form to deduct the amount from your balance.
The system checks for sufficient funds before processing the withdrawal.
Transfer
Log in and navigate to the "Transfer" page.
Enter the recipient's email and the amount to transfer.
Submit the form to move funds between accounts.
The system validates the recipient’s email and ensures you have sufficient funds for the transfer.
Transaction History
Log in and visit the "Transaction History" page.
View all your past transactions, including deposits, withdrawals, and transfers.
All Data (Admin)
Admin users can access the "All Data" page to view comprehensive details of all users and their transactions.
This page provides insights into all activities across the platform.
Project Structure
java
Copy code
Bad Bank/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   ├── bank.png
│   │   ├── github.png
│   │   ├── linkedIn.png
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
│   │   ├── index.js
│   ├── babel.config.json
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
├── server/
│   ├── dal.js
│   ├── database_test.js
│   ├── firebase.js
│   ├── index.js
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
├── README.md
Features
Account Management:

Users can create new accounts, log in, and log out.
Admin users have special access to all user data.
Transactions:

Users can deposit, withdraw, and transfer funds between accounts.
A comprehensive transaction history is maintained and accessible.
Admin Dashboard:

Admin users can access an all-data page showing all users and their transaction details.
Responsive Design:

The application is fully responsive and accessible on mobile, tablet, and desktop devices.
Security:

Passwords are stored securely.
All transactions and user actions are logged for auditing purposes.
Technologies Used
Frontend
React: For building the user interface.
React Bootstrap: For styling components with a consistent and responsive design.
React Router: For handling routing within the application.
Axios: For making HTTP requests to the server.
React Toastify: For providing notifications and alerts.
Backend
Node.js: The runtime environment for running JavaScript on the server.
Express.js: A web application framework for Node.js, used to build the backend API.
Firebase Firestore: A NoSQL document database provided by Firebase for storing and managing user and transaction data.
Firebase Authentication: For managing user authentication and securing access to the application.
Development Tools
Babel: For compiling modern JavaScript code to ensure compatibility with older browsers.
Webpack: For bundling JavaScript modules and assets.
Jest: For writing and running unit tests.
Concurrently: For running the server and client simultaneously during development.
API Endpoints
User Management
Create Account:

GET /account/create/:name/:email/:password
Creates a new user account.
Login:

GET /account/login/:email/:password
Logs a user in by verifying their credentials.
Find User:

GET /account/find/:email
Retrieves user details based on their email address.
Account Operations
Get Balance:

GET /account/balance/:email
Returns the current balance for a specific user.
Update Balance (Deposit/Withdraw):

GET /account/update/:email/:amount
Updates a user's balance by either adding (deposit) or subtracting (withdraw) an amount.
Transaction History
Get Transaction History:
GET /account/transactions/:email
Retrieves a list of all transactions for a specific user.
Transfer
Transfer Funds:
GET /account/transfer/:senderEmail/:recipientEmail/:amount
Transfers funds from one user's account to another.
Admin
Get All Users:
GET /account/all
Retrieves details of all users# BadBankFullStack
