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

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set")
      return Response.json({ error: "Email service not configured" }, { status: 500 })
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "noreply@abhirajsharma.com",
        to: "Abhirajsharma191@gmail.com",
        subject: `New Portfolio Contact from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${message}
            </p>
            <hr />
            <p style="color: #999; font-size: 12px;">
              This email was sent from your portfolio website.
            </p>
          </div>
        `,
        reply_to: email,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("Resend API error:", error)
      return Response.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }

    return Response.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}
