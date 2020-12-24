const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/form", (req, res) => {
  let { name, email, subject, message } = req.body;

  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "efitnessclub7@gmail.com",
      pass: "efitness",
    },
  });

  let mailOptions = {
    from: email,
    to: "efitnessclub7@gmail.com",
    subject: subject,
    html: `
        <h3>User Information</h3>
        <ul>
            <li>${name}</li>
            <li>${email}</li>
        </ul>
        <h3>Message</h3>
        <ul>
            <p>${message}</p>
        </ul>`,
  };

  smtpTransport.sendMail(mailOptions);
  smtpTransport.close();
});

module.exports = router;
