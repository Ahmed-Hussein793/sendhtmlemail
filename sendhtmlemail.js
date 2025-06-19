#!/usr/bin/env node

// Use Node modules
const nodemailer = require('nodemailer');
const { program } = require('commander');
const fs = require('node:fs');
const path = require('path');
const { isAbsolute } = require('node:path');

// Define tool options
program
  .version('1.0.0')
  .name('sendhtmlemail.js')
  .description('Send an HTML email with optional attachments.')
  .requiredOption('-t, --to <email>', 'Recipient email address')
  .requiredOption('-s, --subject <subject>', 'Email subject')
  .requiredOption('-c, --content <content>', 'Path to HTML file. See example.html to learn the file content structure.')
  .option(
    '-f, --files <files>',
    'Path to a JSON file containing an array of JSON objects. Each object must include the following keys: "path", "filename", and "cid" for images embedded in the HTML content; or "path" and "filename" for standard attachments such as PDF, CSV, and TXT.'
  )
  .helpOption('-h, --help', 'Display help for command');

program.parse(process.argv);

const options = program.opts();
const to = options.to;
const subject = options.subject;
let htmlContent = options.content;
let files = options.files;

console.log(files);

try {
  htmlContent = fs.readFileSync(path.join(process.cwd(), htmlContent), 'utf8');
  console.log("Reading HTML file:\tSuccess");
} catch (error) {
  console.error('Error reading HTML file: ' + error);
}

if (files) {
  try {
    const filepath = isAbsolute(files) ? files : path.join(process.cwd(), files);
    files = fs.readFileSync(filepath, 'utf8');
    files = JSON.parse(files);
    console.log("Reading JSON file:\tSuccess");
  } catch (error) {
    console.error('Error reading JSON file: ' + error);
  }
}

// Configure Nodemailer with Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'put your email here',
    pass: 'put your app password here' // Create an app password from your Google account management. Do not use your main password.
  },
});

// Compose the HTML email
const mailOptions = {
  from: '"Put your name or company name here" <put your email here>',
  to: to,
  subject: subject,
  html: htmlContent,
  attachments: []
};

if (files) {
  mailOptions.attachments = files;
}

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
