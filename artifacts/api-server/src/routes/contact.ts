import { Router } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  contact: z.string().min(5),
  situation: z.string().min(10),
  threats: z.string().min(5),
  goal: z.string().min(1),
  urgency: z.string().min(1),
});

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_PORT ?? "465") === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

router.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid form data", details: parsed.error.flatten() });
    return;
  }

  const { name, company, contact, situation, threats, goal, urgency } = parsed.data;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    res.status(500).json({ error: "Mail not configured on server" });
    return;
  }

  const html = `
    <h2>Новое обращение через сайт ЦИС</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td><b>Имя</b></td><td>${name}</td></tr>
      <tr><td><b>Компания</b></td><td>${company}</td></tr>
      <tr><td><b>Контакт</b></td><td>${contact}</td></tr>
      <tr><td><b>Цель</b></td><td>${goal}</td></tr>
      <tr><td><b>Срочность</b></td><td>${urgency}</td></tr>
      <tr><td><b>Ситуация</b></td><td style="white-space:pre-wrap">${situation}</td></tr>
      <tr><td><b>Под угрозой</b></td><td style="white-space:pre-wrap">${threats}</td></tr>
    </table>
  `;

  try {
    const transporter = createTransport();
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "info@ao-cis.ru",
      subject: `Обращение от ${name} (${company}) — ${urgency}`,
      html,
      replyTo: contact.includes("@") ? contact : undefined,
    });
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
