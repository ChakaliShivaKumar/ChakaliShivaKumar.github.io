const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = 3004;


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

// API endpoint for sending emails
app.post("/send-email", (req, res) => {
  const {
    type,
    name,
    contact,
    email,
    goodsPickupLocation,
    goodsDropLocation,
    pickupDate,
    pickupTime,
    dropDate,
    dropTime,
    persons,
    weight,
    address,
  } = req.body;


  const adminMailOptions = {
    from: "bookings@lezittransports.com",
    to: "info@lezittransports.com", // Replace with admin's email
    subject: `New Booking: ${type}`,
    text: `
      A new booking has been made:
      - Name: ${name}
      - Booking Type: ${type}
      - Pickup Location : ${goodsPickupLocation}
      - Drop Location : ${goodsDropLocation}
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - No. of Persons: ${persons}
      - Weight : ${weight}
      - Address: ${address}
      - Contact Number: ${contact}
      - Email: ${email || "Not Provided"}
    `,
  };

  const customerMailOptions = {
    from: "bookings@lezittransports.com",
    to: email,
    subject: "Booking Confirmation",
    text: `
      Dear ${name},
      
      Thank you for your booking!
      - Booking Type: ${type}
      - Pickup Location : ${goodsPickupLocation}
      - Drop Location : ${goodsDropLocation}
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - No. of Goods: ${persons}
      - Weight: ${weight}
      - Address: ${address}
      - Contact Number: ${contact}
      
      We will process your request shortly.
      
      Regards,
      LEZIT TRANSPORTS
    `,
  };

  // Send emails to both admin and customer
  Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(customerMailOptions),
  ])
    .then(() => {
      res.status(200).send("Emails sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send emails.");
    });
});

// Start server
app.listen("3004", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
