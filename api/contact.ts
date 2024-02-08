import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone } = req.body;
    const emailContent = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
    `;

    const transporter = createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS, // Using environment variable for email address
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD // Using environment variable for email password
      }
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS, // Using environment variable for sender address
      to: 'beneliflo@gmail.com', // List of recipients
      subject: 'New Contact Form Submission', // Subject line
      text: emailContent // Plain text body
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}