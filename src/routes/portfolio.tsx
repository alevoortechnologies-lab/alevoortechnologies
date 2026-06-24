import { createFileRoute } from "@tanstack/react-router";
import portfolioHtml from "../static/portfolio.html?raw";

export const Route = createFileRoute("/portfolio")({
  server: {
    handlers: {
      GET: () =>
        new Response(portfolioHtml, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    },
  },
});
