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
  brand_name: string;
  model_name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  image_url: string;
  category?: string;
  gender: "male" | "female";
}

interface BackendPerfume {
  id: number;
  brand_name: string;
  model_name: string;
  description: string;
  price: number;
  image_url: string;
  gender: "male" | "female";
}

function mapBackendToProduct(p: BackendPerfume): Product {
  // Use a deterministic rating based on ID to avoid hydration mismatch
  const deterministicRating = 4.0 + ((p.id * 13) % 10) / 10;
  return {
    id: p.id,
    name: `${p.brand_name} ${p.model_name}`,
    brand_name: p.brand_name,
    model_name: p.model_name,
    description: p.description,
    price: p.price,
    rating: Number(deterministicRating.toFixed(1)),
    image: p.image_url,
    image_url: p.image_url,
    category: p.gender === "male" ? "Eau de Parfum" : "Eau de Parfum",
    gender: p.gender,
  };
}

// ── Mock data (used as fallback when API is unavailable) ──
const mockFeaturedProduct: Product = {
  id: 10,
  brand_name: "Tom Ford",
  model_name: "Noir Extreme",
  name: "Tom Ford Noir Extreme",
  description:
    "An amber woody fragrance with a tantalizing core. Noir Extreme dares to make a more extravagant gesture by pushing noir's themes of refinement and seduction to their edges.",
  price: 13500,
  rating: 4.9,
  image: "/images/perfumes/Tom Ford - Noir Extreme.png",
  image_url: "/images/perfumes/Tom Ford - Noir Extreme.png",
  category: "Eau de Parfum",
  gender: "male",
};

const mockBestsellers: Product[] = [
  {
    id: 1,
    brand_name: "Dior",
    model_name: "Sauvage",
    name: "Dior Sauvage",
    description: "A bold and fresh fragrance inspired by wide-open spaces.",
    price: 12000,
    rating: 4.8,
    image: "/images/perfumes/Dior - Sauvage.png",
    image_url: "/images/perfumes/Dior - Sauvage.png",
    category: "Eau de Parfum",
    gender: "male",
  },
  {
    id: 2,
    brand_name: "Creed",
    model_name: "Aventus",
    name: "Creed Aventus",
    description: "A sophisticated and iconic fragrance featuring fruity top notes.",
    price: 30000,
    rating: 4.9,
    image: "/images/perfumes/Creed - Aventus.png",
    image_url: "/images/perfumes/Creed - Aventus.png",
    category: "Eau de Parfum",
    gender: "male",
  },
  {
    id: 9,
    brand_name: "Tom Ford",
    model_name: "Noir Extreme",
    name: "Tom Ford Noir Extreme",
    description: "A luxurious and warm fragrance with spicy accords.",
    price: 13500,
    rating: 4.8,
    image: "/images/perfumes/Tom Ford - Noir Extreme.png",
    image_url: "/images/perfumes/Tom Ford - Noir Extreme.png",
    category: "Eau de Parfum",
    gender: "male",
  },
  {
    id: 11,
    brand_name: "Yves Saint Laurent",
    model_name: "La Nuit de l'Homme",
    name: "Yves Saint Laurent La Nuit de l'Homme",
    description: "A seductive evening fragrance featuring cardamom.",
    price: 7500,
    rating: 4.7,
    image: "/images/perfumes/Yves Saint Laurent - La Nuit de l'Homme.png",
    image_url: "/images/perfumes/Yves Saint Laurent - La Nuit de l'Homme.png",
    category: "Eau de Parfum",
    gender: "male",
  },
];


// ── API Functions ──────────────────────────────────────
export async function fetchFeaturedProduct(): Promise<Product> {
  try {
    const response = await api.get<BackendPerfume>("/api/shop/featured");
    return mapBackendToProduct(response.data);
  } catch {
    // Fallback to mock data when API is unavailable
    return mockFeaturedProduct;
  }
}

export async function fetchBestsellers(): Promise<Product[]> {
  try {
    const response = await api.get<BackendPerfume[]>("/api/shop/bestsellers");
    return response.data.map(mapBackendToProduct);
  } catch {
    // Fallback to mock data when API is unavailable
    return mockBestsellers;
  }
}


export default api;
