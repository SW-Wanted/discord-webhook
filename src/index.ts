
const webhookURL = process.env.DISCORD_WEBHOOK_URL;

async function main(): Promise<void>
{
	if (!webhookURL)
		throw new Error("Missing DISCORD_WEBHOOK_URL environment variable.");

	const response = await fetch(webhookURL, {
					method: "POST",
					headers: { "Content-Type": "application/json",},
					body: JSON.stringify({ content: "Hello from my Discord Webhook",}),
	});

	if (!response.ok)
		throw new Error(`Discord returned HTTP ${response.status}`);

	console.log("Message sent successfully!");
}

main().catch((error: unknown) => {
	    if (error instanceof Error)
		    console.error(`Error: ${error.message}`);
	    else
		    console.error('An unexpected error occured.');

	    process.exitCode = 1;
});
