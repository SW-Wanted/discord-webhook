import { sendWebhookMessage } from "./webhook.js";

const webhookURL	= process.env.DISCORD_WEBHOOK_URL;
const message		= process.env.DISCORD_MESSAGE;

async function main(): Promise<void>
{
	if (!webhookURL)
		throw new Error("Missing DISCORD_WEBHOOK_URL environment variable.");
	if (!message)
		throw new Error("Missing DISCORD_MESSAGE environment variable.");

	await sendWebhookMessage(webhookURL, message);

	console.log("Message sent successfully!");
}

main().catch((error: unknown) => {
	if (error instanceof Error)
		console.error(`Error: ${error.message}`);
	else
		console.error('An unexpected error occured.');

	process.exitCode = 1;
});
