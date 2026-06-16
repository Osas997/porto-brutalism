"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  message: z.string().trim().min(3, "Message is too short"),
});

// Helper to escape HTML tags for Telegram parse_mode: HTML
const escapeHtml = (text: string) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

export async function sendContactMessage(formData: { name: string; email: string; message: string }) {
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const errorMsg = Object.values(errors).flat().join(", ");
    return { success: false, error: errorMsg || "Validation failed" };
  }

  const { name, email, message } = parsed.data;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram credentials are not set in environment variables");
    return { success: false, error: "Server configuration error" };
  }

  // Format the message using HTML tags
  const telegramText = `📬 <b>New Contact Message</b>\n\n` +
    `👤 <b>Name:</b> ${escapeHtml(name)}\n` +
    `✉️ <b>Email:</b> ${escapeHtml(email)}\n\n` +
    `💬 <b>Message:</b>\n${escapeHtml(message)}`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram API Error:", errorText);
      return { success: false, error: "Failed to send message to Telegram" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
