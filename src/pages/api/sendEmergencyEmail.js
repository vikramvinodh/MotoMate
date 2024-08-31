import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, message } = req.body;

        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use other services as well
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // The email address you want to send to
            subject: 'Emergency SOS',
            text: message, // Customize your message here
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Email sending failed', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
