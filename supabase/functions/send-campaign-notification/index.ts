import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CampaignNotificationRequest {
  campaignName: string;
  businessName: string;
  targetArea: string;
  budget: string;
  vehicleType: string;
  description?: string;
  startDate: string;
  endDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-campaign-notification function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: CampaignNotificationRequest = await req.json();
    
    console.log(`Processing campaign booking from: ${data.businessName}`);

    const vehicleTypeMap: Record<string, string> = {
      'auto': 'Auto Rickshaw',
      'e-rickshaw': 'E-Rickshaw',
      'taxi': 'Taxi',
      'bus': 'Bus',
    };

    // Send notification email to MotionFleet
    const adminEmailResponse = await resend.emails.send({
      from: "MotionFleet Campaigns <onboarding@resend.dev>",
      to: ["motionfleet7@gmail.com"],
      subject: `New Campaign Booking: ${data.campaignName} - ${data.businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">New Campaign Booking!</h1>
          </div>
          
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Campaign Details</h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Campaign Name:</strong> ${data.campaignName}</p>
              <p><strong>Business Name:</strong> ${data.businessName}</p>
              <p><strong>Target Area:</strong> ${data.targetArea || "Not specified"}</p>
              <p><strong>Vehicle Type:</strong> ${vehicleTypeMap[data.vehicleType] || data.vehicleType || "Not specified"}</p>
              <p><strong>Monthly Budget:</strong> ₹${data.budget ? parseInt(data.budget).toLocaleString() : "Not specified"}</p>
            </div>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Schedule</h3>
              <p><strong>Start Date:</strong> ${data.startDate}</p>
              <p><strong>End Date:</strong> ${data.endDate}</p>
            </div>
            
            ${data.description ? `
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Campaign Description</h3>
              <p style="white-space: pre-wrap;">${data.description}</p>
            </div>
            ` : ''}
          </div>
          
          <div style="background: #1a1a1a; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              © 2024 MotionFleet. Campaign submitted via website.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Admin notification email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-campaign-notification function:", error);
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
