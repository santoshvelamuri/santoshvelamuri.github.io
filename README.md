# Truly Services Website

A professional website for Truly Services consulting focused on Strategy, Architecture, and AI with contact form integration.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/santoshvelamuri/website.git
cd website
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Edit `.env` file with your Gmail credentials:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=3000
```

**Note:** For Gmail, you'll need to:
- Enable 2-factor authentication on your Google account
- Generate an App Password: https://myaccount.google.com/apppasswords
- Use the generated password in `EMAIL_PASSWORD`

### Running the Server

```bash
npm start
```

The website will be available at `http://localhost:3000`

## Features

- Responsive design
- Contact form with email integration
- Smooth navigation
- Clean, modern UI
- Mobile-friendly

## Contact Form

The contact form sends emails to the configured `RECIPIENT_EMAIL` address with:
- Visitor's name and email
- Company information
- Message content

## Files Structure

```
├── index.html           # Main homepage
├── services.html        # What we do / services page
├── how-we-work.html    # How we work page
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   └── main.js         # Client-side scripts
├── server.js           # Express server with email handling
├── package.json        # Node dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Deployment

For production deployment:
1. Use a production email service (SendGrid, AWS SES, etc.)
2. Configure CORS properly for your domain
3. Use environment variables for sensitive data
4. Consider using a reverse proxy (nginx) in front of the Node server
