import { NextResponse } from 'next/server';
import { sendChatbotNotification } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Send email notification
    await sendChatbotNotification(message);

    // Send WhatsApp notification using WhatsApp Business API
    const whatsappMessage = {
      messaging_product: "whatsapp",
      to: process.env.WHATSAPP_RECIPIENT,
      type: "text",
      text: {
        body: `Nouveau message chatbot : ${message}`
      }
    };

    await fetch(`https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(whatsappMessage)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Chat notification error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}