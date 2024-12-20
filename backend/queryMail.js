const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider (e.g., Outlook, Yahoo, etc.)
  auth: {
    user: "capshiv51@gmail.com", // Replace with your email
    pass: "brua nvha nnwn cabi", // Replace with your email password or app password
  },
});

/// API endpoint for sending queries
app.post("/send-query", (req, res) => {
    const { fullName, email, mobile, place, transportationType, serviceType, query } = req.body;
  
    // Admin email options
    const adminMailOptions = {
      from: "satishavula0408@outlook.com",
      to: "satishavula0408@outlook.com", 
      subject: `New Query Submission: ${fullName}`,
      text: `
        A new query has been submitted:
        - Full Name: ${fullName}
        - Email: ${email || "Not Provided"}
        - Mobile: ${mobile || "Not Provided"}
        - Place: ${place}
        - Transportation Type: ${transportationType}
        - Service Type: ${serviceType}
        - Query: ${query}
      `,
    };

    // Acknowledgment email for the user
    const customerMailOptions = {
      from: "satishavula0408@outlook.com",
      to: email,
      subject: "Query Submission Confirmation",
      text: `
        Dear ${fullName},
        
        Thank you for reaching out to us. We have received your query and will get back to you shortly.
        - Transportation Type: ${transportationType}
        - Service Type: ${serviceType}
        - Query: ${query}
        
        Regards,
        LEZIT TRANSPORTS
      `,
    };
  
    // Send emails to both admin and customer
    Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions), // Send only if email is provided
    ])
      .then(() => {
        res.status(200).send("Query submitted successfully!");
        console.log("Hiiiiii");
      })
      .catch((error) => {
        console.error("Error sending query emails:", error);
        res.status(500).send("Failed to submit the query.");
      });
  });
  
// Start server
app.listen("3001", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
