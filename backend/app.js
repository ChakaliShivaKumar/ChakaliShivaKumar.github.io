const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

//MongoDB Connection
// const mongoose = require("mongoose");

// const mongoURI = "mongodb+srv://schakali:capshiv@zero.p0pkj.mongodb.net/?retryWrites=true&w=majority&appName=Zero";

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("MongoDB connection error:", err));



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

// API endpoint for sending emails
app.post("/send-email", (req, res) => {
  const {
    type,
    name,
    contact,
    email,
    pickupDate,
    pickupTime,
    dropDate,
    dropTime,
    persons,
    address,
  } = req.body;


  const adminMailOptions = {
    from: "capshiv51@gmail.com",
    to: "capshiv51@gmail.com", // Replace with admin's email
    subject: `New Booking: ${type}`,
    text: `
      A new booking has been made:
      - Name: ${name}
      - Booking Type: ${type}
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - No. of Persons: ${persons}
      - Address: ${address}
      - Contact Number: ${contact}
      - Email: ${email || "Not Provided"}
    `,
  };

  const customerMailOptions = {
    from: "capshiv51@gmail.com",
    to: email,
    subject: "Booking Confirmation",
    text: `
      Dear ${name},
      
      Thank you for your booking!
      - Booking Type: ${type}
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - No. of Persons: ${persons}
      - Address: ${address}
      - Contact Number: ${contact}
      
      We will process your request shortly.
      
      Regards,
      LEZIT.
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
app.listen("3000", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
