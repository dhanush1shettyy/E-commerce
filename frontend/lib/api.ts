import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Types ──────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category?: string;
}

// ── Mock data (used as fallback when API is unavailable) ──
const mockFeaturedProduct: Product = {
  id: 1,
  name: "Noir Élégance",
  description:
    "An intoxicating blend of midnight jasmine, smoky oud, and warm amber. This signature scent captures the essence of sophistication with its deep, lingering notes that evolve beautifully throughout the day.",
  price: 285.0,
  rating: 4.9,
  image: "/featured-perfume.png",
  category: "Eau de Parfum",
};

const mockBestsellers: Product[] = [
  {
    id: 2,
    name: "Golden Aura",
    description: "A radiant blend of bergamot and sandalwood.",
    price: 195.0,
    rating: 4.8,
    image: "/bestseller-perfume.png",
    category: "Eau de Parfum",
  },
  {
    id: 3,
    name: "Velvet Rose",
    description: "Luxurious rose with hints of musk.",
    price: 220.0,
    rating: 4.7,
    image: "/bestseller-perfume.png",
    category: "Eau de Toilette",
  },
  {
    id: 4,
    name: "Midnight Oud",
    description: "Deep and mysterious oud fragrance.",
    price: 310.0,
    rating: 4.9,
    image: "/bestseller-perfume.png",
    category: "Parfum",
  },
  {
    id: 5,
    name: "Citrus Luxe",
    description: "Fresh citrus with a warm woody base.",
    price: 175.0,
    rating: 4.6,
    image: "/bestseller-perfume.png",
    category: "Eau de Cologne",
  },
];

// ── API Functions ──────────────────────────────────────
export async function fetchFeaturedProduct(): Promise<Product> {
  try {
    const response = await api.get<Product>("/products/featured");
    return response.data;
  } catch {
    // Fallback to mock data when API is unavailable
    return mockFeaturedProduct;
  }
}

export async function fetchBestsellers(): Promise<Product[]> {
  try {
    const response = await api.get<Product[]>("/products/bestsellers");
    return response.data;
  } catch {
    // Fallback to mock data when API is unavailable
    return mockBestsellers;
  }
}

export default api;
