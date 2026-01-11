import { NextResponse } from "next/server";

interface PilotRequestData {
  name: string;
  email: string;
  company?: string;
}

export async function POST(request: Request) {
  try {
    const data: PilotRequestData = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log the request (useful for development)
    console.log("Pilot request received:", {
      name: data.name,
      email: data.email,
      company: data.company || "Not provided",
      timestamp: new Date().toISOString(),
    });

    // Forward to webhook if configured
    const webhookUrl = process.env.PILOT_REQUEST_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookPayload = {
        // Slack-compatible format (also works with many other webhooks)
        text: `New Pilot Request from ${data.name}`,
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "New Pilot Request",
            },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Name:*\n${data.name}` },
              { type: "mrkdwn", text: `*Email:*\n${data.email}` },
              { type: "mrkdwn", text: `*Company:*\n${data.company || "Not provided"}` },
            ],
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `Submitted at ${new Date().toISOString()}`,
              },
            ],
          },
        ],
      };

      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
        });

        if (!webhookResponse.ok) {
          console.error("Webhook delivery failed:", webhookResponse.status);
        }
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
        // Don't fail the request if webhook fails
      }
    }

    // If no webhook configured, you could add other notification methods here:
    // - Send email via Resend, SendGrid, etc.
    // - Store in database
    // - Post to Notion, Airtable, etc.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pilot request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
