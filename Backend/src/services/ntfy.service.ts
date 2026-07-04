import dotenv from 'dotenv';

dotenv.config();

const topic = process.env.NTFYTOPIC;

interface NtfyPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends a push notification to your phone via ntfy.sh
 */
export const sendNtfyNotification = async (payload: NtfyPayload): Promise<void> => {
  try {
    if (!topic) {
      console.warn('[Ntfy Service] Warning: NTFY_TOPIC is not set. Mobile push notifications will be skipped.');
      return;
    }

    console.log(`[Ntfy Service] Dispatching push notification to ntfy.sh/${topic}...`);

    const title = `New Portfolio Message from ${payload.name}`;
    const body = `Subject: ${payload.subject}\nEmail: ${payload.email}\n\n${payload.message}`;

    // Send HTTP POST request to ntfy.sh topic
    const response = await fetch(`https://ntfy.sh/${topic}`, {
      method: 'POST',
      body,
      headers: {
        'Title': title,
        'Priority': 'high', // Urgent notification
        'Tags': 'incoming_envelope,bell', // envelope and bell emojis
      },
    });

    if (response.ok) {
      console.log('[Ntfy Service] Mobile push notification dispatched successfully.');
    } else {
      console.error('[Ntfy Service] Failed to dispatch push notification. Status:', response.status);
    }
  } catch (error) {
    console.error('[Ntfy Service] Error encountered during mobile push dispatch:', error);
  }
};
