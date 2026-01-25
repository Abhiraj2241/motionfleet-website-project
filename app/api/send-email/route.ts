import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Store message in file system as backup
    const messagesDir = join(process.cwd(), 'messages');
    if (!existsSync(messagesDir)) {
      mkdirSync(messagesDir, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    const messageData = {
      name,
      email,
      message,
      timestamp,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    const fileName = `${messageData.id}.json`;
    writeFileSync(
      join(messagesDir, fileName),
      JSON.stringify(messageData, null, 2)
    );

    console.log(`[v0] Message stored locally: ${fileName}`);

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Abhirajsharma191@gmail.com",
            to: "Abhirajsharma191@gmail.com",
            subject: `New Portfolio Contact from ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
                <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <h2 style="color: #1f2937; margin-top: 0;">New Contact Form Submission</h2>
                  <div style="border-left: 4px solid #ff8c42; padding-left: 15px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ff8c42; text-decoration: none;">${email}</a></p>
                    <p style="margin: 10px 0;"><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; background: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 10px;">
                      ${message}
                    </p>
                  </div>
                  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                  <p style="color: #6b7280; font-size: 12px; margin: 0;">
                    This email was sent from your portfolio website at ${timestamp}
                  </p>
                </div>
              </div>
            `,
            reply_to: email,
          }),
        })

        if (!response.ok) {
          const error = await response.json()
          console.error("[v0] Resend API error:", error.message || error)
          console.log("[v0] Message stored locally, email sending failed - but message is safe")
        } else {
          const result = await response.json()
          console.log(`[v0] Email sent successfully via Resend: ${result.id}`);
        }
      } catch (emailError) {
        console.error("[v0] Email sending failed, but message was stored locally:", emailError)
      }
    } else {
      console.warn("[v0] RESEND_API_KEY not set - message stored locally but email not sent")
    }

    return Response.json({
      success: true,
      message: "Thank you! Your message has been received and stored. We'll get back to you soon.",
      messageId: messageData.id
    })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to process your request" },
      { status: 500 }
    )
  }
}
