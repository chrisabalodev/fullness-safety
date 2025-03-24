import { NextResponse } from 'next/server';
import { sendQuoteRequest } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email notifications
    const success = await sendQuoteRequest(data);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to send quote request' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quote request error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}