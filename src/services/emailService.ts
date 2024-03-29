import nodemailer from 'nodemailer';
import type { EmailJob } from '../models/emailJob';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (email: EmailJob) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email.to.join(','),
        cc: email.cc?.join(','),
        bcc: email.bcc?.join(','),
        title: email.title,
        style: email.style,
        subject: email.subject,
        text: email.text,
        html: email.body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendEmail;
