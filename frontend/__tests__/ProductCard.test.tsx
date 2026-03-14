import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(
      (
        props: React.HTMLAttributes<HTMLDivElement>,
        ref: React.Ref<HTMLDivElement>
      ) => <div ref={ref} {...props} />
    ),
    p: React.forwardRef(
      (
        props: React.HTMLAttributes<HTMLParagraphElement>,
        ref: React.Ref<HTMLParagraphElement>
      ) => <p ref={ref} {...props} />
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock next/image
jest.mock("next/image", () => {
  return function MockImage(props: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src} alt={props.alt} />;
  };
});

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/api";

const mockProduct: Product = {
  id: 1,
  name: "Test Perfume",
  description: "A beautiful test fragrance",
  price: 250.0,
  rating: 4.5,
  image: "/test-image.png",
  category: "Eau de Parfum",
};

describe("ProductCard", () => {
  it("renders product name", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Perfume")).toBeInTheDocument();
  });

  it("renders product price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$250.00")).toBeInTheDocument();
  });

  it("renders product category", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Eau de Parfum")).toBeInTheDocument();
  });

  it("renders product image", () => {
    render(<ProductCard product={mockProduct} />);
    const img = screen.getByAltText("Test Perfume");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test-image.png");
  });

  it("renders rating stars", () => {
    render(<ProductCard product={mockProduct} />);
    expect(
      screen.getByLabelText("Rating: 4.5 out of 5")
    ).toBeInTheDocument();
  });

  it("renders wishlist and cart buttons", () => {
    render(<ProductCard product={mockProduct} />);
    expect(
      screen.getByLabelText("Add Test Perfume to wishlist")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Add Test Perfume to cart")
    ).toBeInTheDocument();
  });
});
