import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from 'https://esm.sh/zod@3.22.4';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const CampaignSchema = z.object({
  campaignName: z.string().trim().min(1, 'Campaign name is required').max(200, 'Campaign name must be less than 200 characters'),
  businessName: z.string().trim().min(1, 'Business name is required').max(200, 'Business name must be less than 200 characters'),
  email: z.string().trim().email('Invalid email format').max(255, 'Email must be less than 255 characters'),
  targetArea: z.string().trim().max(200, 'Target area must be less than 200 characters').optional(),
  budget: z.string().trim().max(50, 'Budget must be less than 50 characters').optional(),
  vehicleType: z.string().trim().max(50, 'Vehicle type must be less than 50 characters').optional(),
  description: z.string().trim().max(5000, 'Description must be less than 5000 characters').optional(),
  startDate: z.string().trim().min(1, 'Start date is required').max(50, 'Invalid date format'),
  endDate: z.string().trim().min(1, 'End date is required').max(50, 'Invalid date format'),
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
  console.log("send-campaign-notification function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawBody = await req.json();
    const validationResult = CampaignSchema.safeParse(rawBody);
    
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

    const data = validationResult.data;
    
    // Escape HTML in all user inputs
    const safeCampaignName = escapeHtml(data.campaignName);
    const safeBusinessName = escapeHtml(data.businessName);
    const safeEmail = escapeHtml(data.email);
    const safeTargetArea = escapeHtml(data.targetArea || 'Not specified');
    const safeVehicleType = escapeHtml(data.vehicleType || 'Not specified');
    const safeBudget = data.budget ? escapeHtml(data.budget) : 'Not specified';
    const safeDescription = data.description ? escapeHtml(data.description) : '';
    const safeStartDate = escapeHtml(data.startDate);
    const safeEndDate = escapeHtml(data.endDate);
    
    console.log(`Processing campaign booking from: ${safeBusinessName}`);

    const vehicleTypeMap: Record<string, string> = {
      'auto': 'Auto Rickshaw',
      'e-rickshaw': 'E-Rickshaw',
      'taxi': 'Taxi',
      'bus': 'Bus',
    };

    const displayVehicleType = vehicleTypeMap[data.vehicleType || ''] || safeVehicleType;
    const displayBudget = data.budget ? `₹${parseInt(data.budget).toLocaleString()}` : 'Not specified';

    // Send notification email to MotionFleet admin
    const adminEmailResponse = await resend.emails.send({
      from: "MotionFleet Campaigns <onboarding@resend.dev>",
      to: ["motionfleet7@gmail.com"],
      subject: `New Campaign Booking: ${safeCampaignName} - ${safeBusinessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">New Campaign Booking!</h1>
          </div>
          
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Campaign Details</h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Campaign Name:</strong> ${safeCampaignName}</p>
              <p><strong>Business Name:</strong> ${safeBusinessName}</p>
              <p><strong>Contact Email:</strong> ${safeEmail}</p>
              <p><strong>Target Area:</strong> ${safeTargetArea}</p>
              <p><strong>Vehicle Type:</strong> ${displayVehicleType}</p>
              <p><strong>Monthly Budget:</strong> ${displayBudget}</p>
            </div>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Schedule</h3>
              <p><strong>Start Date:</strong> ${safeStartDate}</p>
              <p><strong>End Date:</strong> ${safeEndDate}</p>
            </div>
            
            ${safeDescription ? `
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Campaign Description</h3>
              <p style="white-space: pre-wrap;">${safeDescription}</p>
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

    console.log("Admin notification email sent successfully");

    // Send confirmation email to the submitter
    const userEmailResponse = await resend.emails.send({
      from: "MotionFleet Campaigns <onboarding@resend.dev>",
      to: [data.email],
      subject: "Campaign Received - MotionFleet",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">MotionFleet</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Mobile Advertising</p>
          </div>
          
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #333;">Thank You for Your Campaign Request!</h2>
            <p style="color: #555; line-height: 1.6;">
              Hi there! We've received your campaign booking for <strong>"${safeCampaignName}"</strong>.
            </p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
              <h3 style="margin-top: 0; color: #333;">Your Campaign Summary</h3>
              <p style="margin: 5px 0;"><strong>Campaign:</strong> ${safeCampaignName}</p>
              <p style="margin: 5px 0;"><strong>Business:</strong> ${safeBusinessName}</p>
              <p style="margin: 5px 0;"><strong>Target Area:</strong> ${safeTargetArea}</p>
              <p style="margin: 5px 0;"><strong>Vehicle Type:</strong> ${displayVehicleType}</p>
              <p style="margin: 5px 0;"><strong>Budget:</strong> ${displayBudget}/month</p>
              <p style="margin: 5px 0;"><strong>Duration:</strong> ${safeStartDate} to ${safeEndDate}</p>
            </div>
            
            <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">What's Next?</h3>
              <ul style="color: #555; margin: 0; padding-left: 20px;">
                <li>Our team will review your campaign details</li>
                <li>We'll contact you within 24-48 hours</li>
                <li>Discuss design and vehicle placement</li>
                <li>Launch your campaign!</li>
              </ul>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              Have questions? Reply to this email or call us at <strong>+91 98765 43210</strong>.
            </p>
          </div>
          
          <div style="background: #1a1a1a; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              © 2024 MotionFleet. All rights reserved.<br>
              Agra, India | campaigns@motionfleet.com
            </p>
          </div>
        </div>
      `,
    });

    console.log("User confirmation email sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-campaign-notification function:", error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
