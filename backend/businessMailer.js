const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = 3003;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: process.env.SMTP_PORT, 
  secure: true, 
  auth: {
    user: process.env.SMTP_USER_BOOKING,
    pass: process.env.SMTP_PASS_BOOKING, 
  },
});

// API endpoint for Service Provider form submission
app.post("/submit-service-provider", (req, res) => {
  const { fullName, mobileNo, email, address, businessName, additionalInfo } = req.body;

  // Admin email options
  const adminMailOptions = {
    from: "bookings@lezittransports.com",
    to: "info@lezittransports.com",
    subject: `New Service Provider Application: ${fullName}`,
    text: `Satish, you have received a new Service Provider application:

Full Name: ${fullName}
Mobile No: ${mobileNo}
Email ID: ${email}
Address: ${address}
BusinessName: ${businessName}
Additional Information:
${JSON.stringify(additionalInfo, null, 2)}

Thank you!`,
  };

  // Customer acknowledgment email
  const customerMailOptions = {
    from: "bookings@lezittransports.com",
    to: email,
    subject: "Service Provider Application Submission Confirmation",
    text: `Dear ${fullName},

Thank you for submitting your Service Provider application. We will review your application and get back to you soon.

Thank you!`,
  };

  // Send emails to both admin and customer
  Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(customerMailOptions),
  ])
    .then(() => res.status(200).send("Service Provider application submitted successfully!"))
    .catch((error) => {
      console.error("Error sending emails:", error);
      res.status(500).send("Failed to submit the application.");
    });
});

// API endpoint for Vehicle Owner form submission
app.post("/submit-vehicle-owner", (req, res) => {
  const { fullName, mobileNo, email, address, additionalInfo } = req.body;

  // Admin email options
  const adminMailOptions = {
    from: "info@lezittransports.com",
    to: "info@lezittransports.com",
    subject: `New Vehicle Owner Application: ${fullName}`,
    text: `Satish, you have received a new Vehicle Owner application:

Full Name: ${fullName}
Mobile No: ${mobileNo}
Email ID: ${email}
Address: ${address}
Additional Information:
${JSON.stringify(additionalInfo, null, 2)}

Thank you!`,
  };

  // Customer acknowledgment email
  const customerMailOptions = {
    from: "bookings@lezittransports.com",
    to: email,
    subject: "Vehicle Owner Application Submission Confirmation",
    text: `Dear ${fullName},

Thank you for submitting your Vehicle Owner application. We will review your application and get back to you soon.

Thank you!`,
  };

  // Send emails to both admin and customer
  Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(customerMailOptions),
  ])
    .then(() => res.status(200).send("Vehicle Owner application submitted successfully!"))
    .catch((error) => {
      console.error("Error sending emails:", error);
      res.status(500).send("Failed to submit the application.");
    });
});

// API endpoint for Driver form submission
app.post("/submit-driver", (req, res) => {
  const { fullName, mobileNo, email, address, additionalInfo } = req.body;

  // Admin email options
  const adminMailOptions = {
    from: "bookings@lezittransports.com",
    to: "info@lezittransports.com",
    subject: `New Driver Application: ${fullName}`,
    text: `Satish, you have received a new Driver application:

Full Name: ${fullName}
Mobile No: ${mobileNo}
Email ID: ${email}
Address: ${address}
Additional Information:
${JSON.stringify(additionalInfo, null, 2)}

Thank you!`,
  };

  // Customer acknowledgment email
  const customerMailOptions = {
    from: "bookings@lezittransports.com",
    to: email,
    subject: "Driver Application Submission Confirmation",
    text: `Dear ${fullName},

Thank you for submitting your Driver application. We will review your application and get back to you soon.

Thank you!`,
  };

  // Send emails to both admin and customer
  Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(customerMailOptions),
  ])
    .then(() => res.status(200).send("Driver application submitted successfully!"))
    .catch((error) => {
      console.error("Error sending emails:", error);
      res.status(500).send("Failed to submit the application.");
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
