
import test from "node:test";
import assert from "node:assert/strict";
import { sendWebhookMessage } from "../src/webhook.js";

test("sends a POST request with the configured message", async () => {
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  const fakeFetch: typeof fetch = async (input, init) => {
    capturedUrl = String(input);
    capturedInit = init;

    return new Response(null, { status: 204 });
  };

  await sendWebhookMessage(
    "https://example.com/webhook",
    "Test message",
    fakeFetch,
  );

  assert.equal(capturedUrl, "https://example.com/webhook");
  assert.equal(capturedInit?.method, "POST");

  assert.deepEqual(
    JSON.parse(String(capturedInit?.body)),
    { content: "Test message" },
  );
});

test("reports HTTP errors", async () => {
  const fakeFetch: typeof fetch = async () =>
    new Response(null, { status: 429 });

  await assert.rejects(
    sendWebhookMessage("https://example.com/webhook", "Test", fakeFetch),
    /Rate limit exceeded \(HTTP 429\)/,
  );
});

test("reports network failures", async () => {
  const fakeFetch: typeof fetch = async () => {
    throw new TypeError("Simulated network failure");
  };

  await assert.rejects(
    sendWebhookMessage("https://example.com/webhook", "Test", fakeFetch),
    /Network request failed/,
  );
});


test("reports HTTP 400 errors", async () => {
  const fakeFetch: typeof fetch = async () =>
    new Response(null, { status: 400 });

  await assert.rejects(
    sendWebhookMessage("https://example.com/webhook", "Test", fakeFetch),
    /Invalid request \(HTTP 400\)/,
  );
});

test("reports HTTP 401 errors", async () => {
  const fakeFetch: typeof fetch = async () =>
    new Response(null, { status: 401 });

  await assert.rejects(
    sendWebhookMessage("https://example.com/webhook", "Test", fakeFetch),
    /Authentication rejected \(HTTP 401\)/,
  );
});

test("reports HTTP 404 errors", async () => {
  const fakeFetch: typeof fetch = async () =>
    new Response(null, { status: 404 });

  await assert.rejects(
    sendWebhookMessage("https://example.com/webhook", "Test", fakeFetch),
    /Webhook not found \(HTTP 404\)/,
  );
});

test("reports HTTP 500 errors", async () => {
  const fakeFetch: typeof fetch = async () =>
    new Response(null, { status: 500 });

  await assert.rejects(
    sendWebhookMessage("https://example.com/webhook", "Test", fakeFetch),
    /Discord server error \(HTTP 500\)/,
  );
});

