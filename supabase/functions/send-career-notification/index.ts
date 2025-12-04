import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CareerNotificationRequest {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience?: string;
  coverLetter?: string;
  resumeUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-career-notification function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, position, experience, coverLetter, resumeUrl }: CareerNotificationRequest = await req.json();
    
    console.log(`Processing job application from: ${name} for ${position}`);

    // Send notification email to MotionFleet
    const adminEmailResponse = await resend.emails.send({
      from: "MotionFleet Careers <onboarding@resend.dev>",
      to: ["motionfleet7@gmail.com"],
      subject: `New Job Application: ${position} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Job Application</h1>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #333;">Applicant Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Position Applied:</strong> ${position}</p>
            <p><strong>Experience:</strong> ${experience || "Not specified"}</p>
            ${resumeUrl ? `<p><strong>Resume:</strong> <a href="${resumeUrl}" style="color: #f97316;">Download Resume</a></p>` : '<p><strong>Resume:</strong> Not uploaded</p>'}
          </div>
          
          ${coverLetter ? `
          <div style="background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316;">
            <h3 style="margin-top: 0; color: #333;">Cover Letter</h3>
            <p style="white-space: pre-wrap;">${coverLetter}</p>
          </div>
          ` : ''}
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This application was submitted via the MotionFleet careers page.
          </p>
        </div>
      `,
    });

    console.log("Admin notification email sent:", adminEmailResponse);

    // Send confirmation email to applicant
    const userEmailResponse = await resend.emails.send({
      from: "MotionFleet Careers <onboarding@resend.dev>",
      to: [email],
      subject: "Application Received - MotionFleet",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">MotionFleet</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Careers</p>
          </div>
          
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #333;">Hi ${name}!</h2>
            <p style="color: #555; line-height: 1.6;">
              Thank you for applying for the <strong>${position}</strong> position at MotionFleet!
            </p>
            <p style="color: #555; line-height: 1.6;">
              We have received your application and our HR team will review it carefully. If your profile matches our requirements, we will contact you within 5-7 business days.
            </p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
              <h3 style="margin-top: 0; color: #333;">What's Next?</h3>
              <ul style="color: #555; margin: 0; padding-left: 20px;">
                <li>Our team reviews your application</li>
                <li>If shortlisted, you'll receive an interview invitation</li>
                <li>Technical/HR interview rounds</li>
                <li>Final offer discussion</li>
              </ul>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              In the meantime, follow us on social media to stay updated with our latest news!
            </p>
          </div>
          
          <div style="background: #1a1a1a; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              © 2024 MotionFleet. All rights reserved.<br>
              Agra, India | careers@motionfleet.com
            </p>
          </div>
        </div>
      `,
    });

    console.log("Applicant confirmation email sent:", userEmailResponse);

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
    console.error("Error in send-career-notification function:", error);
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
