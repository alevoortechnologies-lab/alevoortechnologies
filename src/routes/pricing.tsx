import { createFileRoute } from "@tanstack/react-router";
import pricingHtml from "../static/pricing.html?raw";

export const Route = createFileRoute("/pricing")({
  server: {
    handlers: {
      GET: () =>
        new Response(pricingHtml, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    },
  },
});
