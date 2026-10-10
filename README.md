# Discord Webhook

A learning project focused on understanding Discord webhooks, HTTP requests, and TypeScript with Node.js, without using a dedicated Discord library.

## Features

- Send messages to a Discord channel through an incoming webhook.
- Configure the webhook URL and message using environment variables.
- Send HTTP requests using Node.js's native `fetch` API.
- Handle HTTP error responses and network failures.
- Run automated tests without sending real messages to Discord.

## Technologies

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [npm](https://www.npmjs.com/)
- Native Fetch API
- Node.js test runner (`node:test`)
- [tsx](https://tsx.is/)

## Prerequisites

- Node.js 22 or a compatible newer version.
- npm.
- A Discord server where you have permission to create an incoming webhook.

## Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/SW-Wanted/discord-webhook.git
cd discord-webhook
```

Install the dependencies:

```bash
npm install
```

## Configuration

Create a local environment file from the example:

```bash
cp .env.example .env
```

Edit `.env` and provide your webhook URL and the message to send:

```dotenv
DISCORD_WEBHOOK_URL=your_discord_webhook_url
DISCORD_MESSAGE=Hello from my Discord Webhook!
```

Replace `your_discord_webhook_url` with the URL of your Discord incoming webhook.

**Security:** A webhook URL contains a secret token. Never commit `.env` or share the real webhook URL publicly. The `.env.example` file should contain only placeholder values and non-sensitive defaults.

## Usage

### Development

Run the application in watch mode:

```bash
npm run dev
```

The application sends the configured message to Discord. The process watches for changes and can restart when relevant source files change.

### Build

Compile the TypeScript source files:

```bash
npm run build
```

The compiled application is written to `dist/`.

### Production

Build the application first, then run the compiled JavaScript:

```bash
npm run build
npm start
```

### Type checking

Check the application source for TypeScript errors without generating output:

```bash
npm run typecheck
```

### Tests

Run the automated test suite:

```bash
npm test
```

The tests use a simulated `fetch` implementation to verify request construction, HTTP error handling, and network failure handling without publishing messages to a real Discord channel.

## Error Handling

The application handles the following situations:

- Missing webhook URL or message configuration.
- HTTP `400`: invalid request.
- HTTP `401`: authentication rejected.
- HTTP `403`: forbidden request.
- HTTP `404`: webhook not found.
- HTTP `429`: rate limit exceeded.
- HTTP `5xx`: server errors.
- Network failures that prevent a usable HTTP response from being received.

Errors are reported in the terminal, and the application sets a non-zero exit code when execution fails.

## Project Structure

```text
discord-webhook/
├── src/
│   ├── index.ts
│   └── webhook.ts
├── test/
│   └── webhook.test.ts
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

- `src/index.ts`: application entry point and environment configuration.
- `src/webhook.ts`: HTTP request logic and error handling.
- `test/webhook.test.ts`: automated tests for the webhook module.
- `.env.example`: example environment configuration.
- `tsconfig.json`: TypeScript compiler configuration.

## Learning Objectives

This project explores:

- HTTP requests and responses.
- JSON payloads and HTTP status codes.
- Environment variables and secret management.
- Asynchronous JavaScript with `async`/`await`.
- Error handling with `try`/`catch`.
- TypeScript modules and separation of responsibilities.
- Dependency injection and automated testing.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

