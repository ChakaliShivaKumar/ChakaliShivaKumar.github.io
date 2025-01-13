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
  host: 'smtppro.zoho.in', // Zoho SMTP server
  port: 465,            // Use 465 for SSL
  secure: true,         // True for SSL/TLS
  auth: {
    user: "support@lezittransports.com", // Replace with your email
    pass: "Tnep EGzb eX05", // Replace with your email password or app password
  },
});

/// API endpoint for sending queries
app.post("/send-feedback", (req, res) => {
    const { fullName, email, mobile, place, transportationType, serviceType, feedback } = req.body;
  
    // Admin email options
    const adminMailOptions = {
      from: "support@lezittransports.com",
      to: "info@lezittransports.com", 
      subject: `New feedback Submission: ${fullName}`,
      text: `
        A new feedback has been submitted:
        - Full Name: ${fullName}
        - Email: ${email || "Not Provided"}
        - Mobile: ${mobile || "Not Provided"}
        - Place: ${place}
        - Transportation Type: ${transportationType}
        - Service Type: ${serviceType}
        - feedback: ${feedback}
      `,
    };
  
    // Acknowledgment email for the user
    const customerMailOptions = {
      from: "support@lezittransports.com",
      to: email,
      subject: "feedback Submission Confirmation",
      text: `
        Dear ${fullName},
        
        Thank you for reaching out to us. We have received your feedback.
        - Transportation Type: ${transportationType}
        - Service Type: ${serviceType}
        - feedback: ${feedback}
        
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
        res.status(200).send("feedback submitted successfully!");
      })
      .catch((error) => {
        console.error("Error sending feedback emails:", error);
        res.status(500).send("Failed to submit the feedback.");
      });
  });
  
// Start server
app.listen("3001", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
