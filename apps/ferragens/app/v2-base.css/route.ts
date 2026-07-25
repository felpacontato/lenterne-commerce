const SOURCE = "https://lenterne-v2-brindes-27y4casl4-felpa-dev-studio.vercel.app/_next/static/chunks/0zx1v5hkp_-of.css";

export const revalidate = 86400;

export async function GET() {
  const response = await fetch(SOURCE, {
    next: { revalidate },
  });

  if (!response.ok) {
    return new Response("/* CSS da V2 temporariamente indisponível */", {
      status: 502,
      headers: {
        "content-type": "text/css; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  return new Response(await response.text(), {
    headers: {
      "content-type": "text/css; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
