/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

// Native crypto-based API key generator
function generateApiKey(length = 32) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(() => {
  const api_key = generateApiKey(32);

  return new Response(
    JSON.stringify({ api_key }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
});
