const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3005;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'smtppro.zoho.in', // Zoho SMTP server
  port: 465,            // Use 465 for SSL
  secure: true,         // True for SSL/TLS
  auth: {
    user: "bookings@lezittransports.com", // Replace with your email
    pass: "SjM7 S2RA 9AxH", // Replace with your email password or app password
  },
});

// API endpoint for sending emails
app.post("/send-email-shuttle", (req, res) => {
  const {
    type,
    name,
    contact,
    email,
    pickupLocation,
    pickupDate,
    pickupTime,
    dropDate,
    dropTime,
    persons,
    periodOfService,
    numberOfTimes
  } = req.body;


  const adminMailOptions = {
    from: "bookings@lezittransports.com",
    to: "info@lezittransports.com", // Replace with admin's email
    subject: `New Booking: ${type}`,
    text: `
      A new booking has been made:
      - Name: ${name}
      - Booking Type: ${type}
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - No. of Persons: ${persons}
      - pickupLocation: ${pickupLocation}
      - Contact Number: ${contact}
      - Email: ${email || "Not Provided"}
      - Period Of Service : ${periodOfService}
      - Number Of Times : ${numberOfTimes}
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
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - No. of Persons: ${persons}
      - pickupLocation: ${pickupLocation}
      - Contact Number: ${contact}
      - Period Of Service : ${periodOfService}
      - Number Of Times : ${numberOfTimes}
      
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




app.post("/send-email", (req, res) => {
  const {
    type,
    name,
    contact,
    email,
    pickupLocation,
    pickupDate,
    pickupTime,
    dropDate,
    dropTime,
    persons,
  } = req.body;



  const adminMailOptions = {
    from: "bookings@lezittransports.com",
    to: "info@lezittransports.com", // Replace with admin's email
    subject: `New Booking: ${type}`,
    text: `
      A new booking has been made:
      - Name: ${name}
      - Booking Type: ${type}
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - No. of Persons: ${persons}
      - pickupLocation: ${pickupLocation}
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
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - No. of Persons: ${persons}
      - pickupLocation: ${pickupLocation}
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

app.post("/send-email-driver", (req, res) => {
  const {
    type,
    name,
    contact,
    email,
    pickupLocation,
    pickupDate,
    pickupTime,
    dropDate,
    dropTime,
    vehicleType,
  } = req.body;



  const adminMailOptions = {
    from: "bookings@lezittransports.com",
    to: "info@lezittransports.com", // Replace with admin's email
    subject: `New Booking: ${type}`,
    text: `
      A new booking has been made:
      - Name: ${name}
      - Booking Type: ${type}
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - Vehicle Type: ${vehicleType}
      - pickupLocation: ${pickupLocation}
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
      - Pickup Date & Time: ${pickupDate} at ${pickupTime}
      - Drop Date & Time: ${dropDate} at ${dropTime}
      - Vehicle Type: ${vehicleType}
      - pickupLocation: ${pickupLocation}
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
app.listen("3005", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
