# 📧 sendhtmlemail.js

A simple and customizable Node.js CLI tool for sending HTML emails using Gmail, with support for embedded images (cid) and file attachments.

# 🚀 Features

    Send richly formatted HTML emails

    Embed images in HTML using Content-ID (cid)

    Attach files like PDF, CSV, TXT

    Use external image URLs inside your HTML

    Read content and attachments from local files

# 📦 Installation 
 
 🛠️ **Note:** Make sure you have [Node.js](https://nodejs.org) installed before running this tool.

```
git clone https://github.com/yourusername/sendhtmlemail
cd sendhtmlemail
npm install
```
⚠️ Replace the Gmail and password placeholders in the script with your own email and [Google App Password](https://support.google.com/accounts/answer/185833).

# 📄 Usage

```
node sendhtmlemail.js -t <recipient_email> -s <subject> -c <path_to_html> [-f <path_to_attachments_json>]

```
✅ Required Options:

    -t, --to → Recipient email address

    -s, --subject → Email subject

    -c, --content → Path to an HTML file (see example.html)

🧩 Optional:

    -f, --files → Path to a JSON file containing attachments

# 📁 HTML File Structure (example.html)

To embed an image, use src="cid:your_cid_key" in the HTML

Note: cid only works for <img> elements, not <a href>
```
<img src="cid:example" alt="Example Image">

```
You can also use external images like:
```
<img src="https://example.com/image.png" alt="External Image">

```

# 📁 JSON Attachment File Format (files.json)

```json
[
  {
    "path": "images/logo.png",
    "filename": "logo.png",
    "cid": "example"
  },
  {
    "path": "docs/report.pdf",
    "filename": "report.pdf"
  }
]

```
To embed images, include: "path", "filename", and "cid"
For file attachments, only "path" and "filename" are required

# 📬 Example

node sendhtmlemail.js \
  -t someone@example.com \
  -s "Monthly Report" \
  -c email.html \
  -f files.json

# 🔐 Gmail Authentication

This tool uses Gmail SMTP. You must use an App Password instead of your real password.

    Go to your Google Account → Security

    Enable 2-Step Verification

    Generate an App Password

    You must edit the script and replace:

    Your Gmail email address and App Password under auth.user and auth.pass

    The sender's name and email address in the from field of mailOptions

  ```
  auth: {
  user: 'your_email@gmail.com',
  pass: 'your_app_password'
},
...
from: '"Your Name or Company" <your_email@gmail.com>',

  ```

# 🆘 Help

```
node sendhtmlemail.js --help

```

# 📄 License

[MIT License]

# ✍️ Author

Made with ❤️ by [Ahmed Hussein]
