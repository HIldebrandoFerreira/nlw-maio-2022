import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1d38f8934bf9a6",
    pass: "01b74905bb02d5"
  }
});

app.post("/feedbacks", async (req, res) => {
  const {type, comment, screenshot} = req.body
  const feedback = await prisma.feedback.create({
    data: {
     type,
     comment,
     screenshot,
    }
  })

  transport.sendMail({
    from: 'equipe Feedget <teste@feedget.com>',
    to: 'Hildebrando Ferreira <hildebrandoweb@gmail.com>',
    subject: 'Novo Feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do Feedback: ${type}</p>`,
      `<p>Comentário: ${comment}`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log("HTTP Server running")
})