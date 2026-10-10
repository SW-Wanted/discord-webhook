function getHttpErrorMessage(status: number): string
{
	switch(status)
	{
		case 400:
			return "Invalid request (HTTP 400). Check the message payload.";
		case 401:
			return "Authentication rejected (HTTP 401). Check the webhook configuration.";
		case 403:
			return "Request forbidden (HTTP 403). Check the webhook permissions.";
		case 404:
			return "Webhook not found (HTTP 404). Check whether the URL is valid.";
		case 429:
			return "Rate limit exceeded (HTTP 429). Wait before retrying.";
		default:
			if (status >= 500)
				return `Discord server error (HTTP ${status}). Try again later.`;
		return `Discord returned HTTP ${status}.`;
	}
}

export async function sendWebhookMessage(webhookURL: string, message: string, fetchImpl: typeof fetch = fetch): Promise<void>
{
	let response: Response;

	try
	{
		response = await fetchImpl(webhookURL, {
			method: "POST",
			headers: { "Content-Type": "application/json",},
			body: JSON.stringify({ content: message,}),
		});
	}
	catch
	{
		throw new Error("Network request failed. Check your connection and webhook URL.");
	}

	if (!response.ok)
		throw new Error(getHttpErrorMessage(response.status));	
}
