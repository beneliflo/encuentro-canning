import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, about } = await request.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: 'info@encuentrocanning.org',
      subject: 'Nuevo mensaje desde el formulario',
      text: `
        Nombre: ${firstName} ${lastName}
        Email: ${email}
        Teléfono: ${phone}
        Mensaje: ${about}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return NextResponse.json(
      { success: false, error: 'No se pudo enviar el correo.' },
      { status: 500 }
    );
  }
}
