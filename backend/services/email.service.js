const ejs = require("ejs");
const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require("path");
const { SETTINGS } = require("../constants/commons.settings");

const sendEmailService = async (type, data, to, subject, file) => {
    try {
        // Construct the path to the email template
        const filePath = path.join(__dirname, `../html-templates/${type}`);
        
        // Read and render the template
        const html = fs.readFileSync(filePath, "utf8");
        const parsed = ejs.render(html, data);
        
        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: "Outlook365",
            host: SETTINGS.EMAIL_CONFIG.host,
            port: SETTINGS.EMAIL_CONFIG.port,
            secure: false,
            requireTLS: true,
            auth: {
                user: SETTINGS.EMAIL_CONFIG.username,
                pass: SETTINGS.EMAIL_CONFIG.password,
            },
        });
        
        // Set up attachments if provided
        const attachments = [];
        if (file) {
            attachments.push({
                filename: file.fileName,
                content: file.stream,
            });
        }
        
        // Send the email
        await transporter.sendMail({
            from: SETTINGS.EMAIL_CONFIG.username,
            to, // List of receivers
            subject, // Subject line
            html: parsed,
            attachments,
        });
    } catch (e) {
        // Handle errors
        throw e;
    }
};

module.exports = { sendEmailService };
