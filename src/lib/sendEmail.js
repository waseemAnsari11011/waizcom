import nodemailer from 'nodemailer';

export async function sendEmail({ name, email, phone, company, country, subject, message }) {
  // Ensure the environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing EMAIL_USER or EMAIL_PASS in environment variables");
    throw new Error("Email server configuration missing");
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send notification to the site owner
    replyTo: email || process.env.EMAIL_USER, // Allow replying directly to the lead
    subject: subject || 'New Lead from Ecarts Website',
    text: `
      You have received a new lead!

      Name: ${name || 'N/A'}
      Email: ${email || 'N/A'}
      Phone: ${phone || 'N/A'}
      Company: ${company || 'N/A'}
      Country: ${country || 'N/A'}
      
      Message:
      ${message || 'N/A'}
    `,
  };

  return await transporter.sendMail(mailOptions);
}
