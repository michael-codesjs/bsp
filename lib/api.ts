import axios from "axios";
import Cookies from "js-cookie";

// Reusable Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://test-api.gymble.us",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const authStorage = Cookies.get("auth-storage");
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error("Failed to parse auth token", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Types
export interface BusinessProfile {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  location: string;
  category: string;
  phone: string;
  email: string;
  stats?: { label: string; value: string }[];
  amenities?: string[];
}

// Data fetching functions
export async function getBusinessProfile(slug: string): Promise<BusinessProfile | null> {
  try {
    const response = await apiClient.get(`/profile-details?slug=${slug}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching business profile:", error);
    
    // Fallback for our demo if the API is down or not found
    if (slug === "strongest-fitness" || slug === "strongest") {
      return {
        id: "1",
        name: "Strongest Fitness",
        slug: "strongest-fitness",
        description: "Strongest is a boutique fitness facility that focuses on high-performance training and community. Our state-of-the-art equipment and elite coaching staff are dedicated to helping you reach your peak potential.",
        logo: "https://images.unsplash.com/photo-1599058917232-d750d2009aa7?q=80&w=200&auto=format&fit=crop",
        banner: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2000&auto=format&fit=crop",
        rating: 4.9,
        location: "123 Performance Way, New York, NY 10001",
        category: "Performance Training",
        phone: "+1 (555) 000-0000",
        email: "hello@strongest.fitness",
        stats: [
          { label: "Members", value: "2.4k+" },
          { label: "Success Rate", value: "98%" },
          { label: "Elite Coaches", value: "24" }
        ],
        amenities: [
          "Dynamic HIIT",
          "Strength Lab",
          "Recovery Zone",
          "Personal Training",
          "Juice Bar",
          "Towel Service"
        ]
      };
    }
    return null;
  }
}

export default apiClient;
