const { Resend } = require('resend');

const resend = new Resend('re_HToUhiwS_A9j18TfYoxT2sJKmcJsdp5n6');

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  try {
    await resend.emails.send({
      from: 'Naivas Jobs <onboarding@resend.dev>',
      to: data.email,
      subject: 'Application Received - Naivas',
      html: `
        <h2>Thank you for applying!</h2>
        <p>Dear ${data.first_name},</p>
        <p>We have received your job application for <b>${data.position}</b>.</p>
        <p>Our HR team will review your application and contact you soon.</p>
        <br>
        <p>Naivas Recruitment Team</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};