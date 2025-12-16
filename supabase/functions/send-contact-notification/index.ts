import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from 'https://esm.sh/zod@3.22.4';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const ContactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email format').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().max(20, 'Phone must be less than 20 characters').optional(),
  company: z.string().trim().max(100, 'Company must be less than 100 characters').optional(),
  message: z.string().trim().min(1, 'Message is required').max(5000, 'Message must be less than 5000 characters'),
});

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-contact-notification function invoked");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawBody = await req.json();
    const validationResult = ContactSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input', 
          details: validationResult.error.errors.map(e => e.message) 
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, phone, company, message } = validationResult.data;
    
    // Escape HTML in all user inputs
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Not provided');
    const safeCompany = escapeHtml(company || 'Not provided');
    const safeMessage = escapeHtml(message);
    
    console.log(`Processing contact inquiry from: ${safeName}`);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "MotionFleet <onboarding@resend.dev>",
      to: ["motionfleet7@gmail.com"],
      subject: `New Contact Inquiry from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Contact Inquiry</h1>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #333;">Contact Details</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Company:</strong> ${safeCompany}</p>
          </div>
          
          <div style="background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This email was sent from the MotionFleet contact form.
          </p>
        </div>
      `,
    });

    console.log("Admin notification email sent successfully");

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "MotionFleet <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting MotionFleet!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">MotionFleet</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Mobile Advertising Solutions</p>
          </div>
          
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #333;">Hi ${safeName}!</h2>
            <p style="color: #555; line-height: 1.6;">
              Thank you for reaching out to MotionFleet! We have received your message and our team will get back to you within 24 hours.
            </p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Your Message Summary</h3>
              <p style="color: #666; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              In the meantime, feel free to explore our services or check out our tracking dashboard.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://motionfleet.lovable.app" style="background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Visit Our Website
              </a>
            </div>
          </div>
          
          <div style="background: #1a1a1a; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              © 2024 MotionFleet. All rights reserved.<br>
              Agra, India | +91 98765 43210
            </p>
          </div>
        </div>
      `,
    });

    console.log("User confirmation email sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
