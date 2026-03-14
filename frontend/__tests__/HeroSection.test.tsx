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
    h1: React.forwardRef(
      (
        props: React.HTMLAttributes<HTMLHeadingElement>,
        ref: React.Ref<HTMLHeadingElement>
      ) => <h1 ref={ref} {...props} />
    ),
  },
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

import HeroSection from "@/components/HeroSection";

describe("HeroSection", () => {
  it("renders the ESSENCE title", () => {
    render(<HeroSection />);
    expect(screen.getByText("ESSENCE")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Scent of Sophistication/i)
    ).toBeInTheDocument();
  });

  it('renders Shop Now CTA button', () => {
    render(<HeroSection />);
    expect(screen.getByText("Shop Now")).toBeInTheDocument();
  });

  it("renders Explore Collection CTA button", () => {
    render(<HeroSection />);
    expect(screen.getByText("Explore Collection")).toBeInTheDocument();
  });

  it("renders the hero image", () => {
    render(<HeroSection />);
    const img = screen.getByAltText("Luxury perfume bottle");
    expect(img).toBeInTheDocument();
  });

  it("has proper ARIA label", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("region", { name: "Hero banner" })
    ).toBeInTheDocument();
  });

  it("renders scroll indicator", () => {
    render(<HeroSection />);
    expect(screen.getByText("Scroll")).toBeInTheDocument();
  });
});
