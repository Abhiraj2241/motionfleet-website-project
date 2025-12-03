import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-contact-notification function invoked");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, message }: ContactNotificationRequest = await req.json();
    
    console.log(`Processing contact inquiry from: ${name} (${email})`);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "MotionFleet <onboarding@resend.dev>",
      to: ["motionfleet7@gmail.com"],
      subject: `New Contact Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Contact Inquiry</h1>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #333;">Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
          </div>
          
          <div style="background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This email was sent from the MotionFleet contact form.
          </p>
        </div>
      `,
    });

    console.log("Admin notification email sent:", adminEmailResponse);

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
            <h2 style="color: #333;">Hi ${name}!</h2>
            <p style="color: #555; line-height: 1.6;">
              Thank you for reaching out to MotionFleet! We have received your message and our team will get back to you within 24 hours.
            </p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Your Message Summary</h3>
              <p style="color: #666; white-space: pre-wrap;">${message}</p>
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

    console.log("User confirmation email sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        userEmail: userEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
