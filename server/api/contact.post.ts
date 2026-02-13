import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, email, message } = body

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid data',
    })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: 'New Contact Message',
    html: `
      <p><b>From:</b> ${email}</p>
      <p><b>Message:</b><br/>${message}</p>
    `,
  })

  return { success: true }
})