import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const pushMock = jest.fn();

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(
      (
        props: React.HTMLAttributes<HTMLDivElement>,
        ref: React.Ref<HTMLDivElement>
      ) => <div ref={ref} {...props} />
    ),
    form: React.forwardRef(
      (
        props: React.FormHTMLAttributes<HTMLFormElement>,
        ref: React.Ref<HTMLFormElement>
      ) => <form ref={ref} {...props} />
    ),
    p: React.forwardRef(
      (
        props: React.HTMLAttributes<HTMLParagraphElement>,
        ref: React.Ref<HTMLParagraphElement>
      ) => <p ref={ref} {...props} />
    ),
    h1: React.forwardRef(
      (
        props: React.HTMLAttributes<HTMLHeadingElement>,
        ref: React.Ref<HTMLHeadingElement>
      ) => <h1 ref={ref} {...props} />
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock next/link
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

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Import after mocks
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("renders the ESSENCE logo", () => {
    render(<Navbar />);
    expect(screen.getByText("ESSENCE")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    const links = ["Home", "Shop", "Collections", "About", "Contact"];
    links.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it("renders search, cart, and user icons", () => {
    render(<Navbar />);
    expect(screen.getAllByLabelText("Search").length).toBeGreaterThan(0);
    expect(
      screen.getAllByLabelText("Shopping cart").length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByLabelText("User account").length
    ).toBeGreaterThan(0);
  });

  it("toggles mobile menu on hamburger click", async () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText("Open menu");
    await userEvent.click(menuButton);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  it("has proper ARIA labels for accessibility", () => {
    render(<Navbar />);
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Main navigation"
    );
  });

  it("navigates to filtered shop route when desktop search is submitted", async () => {
    render(<Navbar />);
    const desktopSearchButton = screen.getAllByLabelText("Search")[0];

    await userEvent.click(desktopSearchButton);
    const searchInput = screen.getByLabelText("Search perfumes");
    await userEvent.type(searchInput, "dior{enter}");

    expect(pushMock).toHaveBeenCalledWith("/shop?search=dior");
  });

  it("navigates to shop route when search query is empty", async () => {
    render(<Navbar />);
    const desktopSearchButton = screen.getAllByLabelText("Search")[0];

    await userEvent.click(desktopSearchButton);
    const searchInput = screen.getByLabelText("Search perfumes");
    await userEvent.type(searchInput, "   {enter}");

    expect(pushMock).toHaveBeenCalledWith("/shop");
  });
});
