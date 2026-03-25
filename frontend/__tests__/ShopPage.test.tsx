import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

let searchValue: string | null = null;

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "search" ? searchValue : null),
  }),
}));

jest.mock("next/image", () => {
  return function MockImage({ alt, src }: { alt: string; src: string }) {
    return <img alt={alt} src={src} />;
  };
});

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

import Shop from "@/app/shop/page";

describe("Shop page search behavior", () => {
  beforeEach(() => {
    searchValue = null;
    global.fetch = jest.fn();
  });

  it("fetches filtered perfumes when search query is present", async () => {
    searchValue = "dior";
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes("/api/shop/perfumes?search=dior")) {
        return Promise.resolve({
          ok: true,
          json: async () => [
            {
              id: 3,
              brand_name: "Dior",
              model_name: "Sauvage",
              description: "desc",
              price: 12000,
              image_url: "/images/perfumes/Dior - Sauvage.png",
              gender: "male",
            },
          ],
        });
      }

      return Promise.reject(new Error(`Unexpected URL: ${url}`));
    });

    render(<Shop />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/shop/perfumes?search=dior"
      );
    });

    expect(await screen.findByText("Dior")).toBeInTheDocument();
    expect(await screen.findByText("Sauvage")).toBeInTheDocument();
    expect(screen.getByText('Showing results for "dior"')).toBeInTheDocument();
    expect(screen.queryByText("For Men")).not.toBeInTheDocument();
    expect(screen.queryByText("For Women")).not.toBeInTheDocument();
  });

  it("shows an empty-state message when no perfumes match", async () => {
    searchValue = "unknown";
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => [],
    });

    render(<Shop />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/shop/perfumes?search=unknown"
      );
    });

    expect(await screen.findByText("No perfumes matched your search.")).toBeInTheDocument();
  });
});
