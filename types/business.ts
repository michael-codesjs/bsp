export type BusinessProfile = {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  category: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  stats?: {
    label: string;
    value: string;
  }[];
  amenities?: string[];
  rating?: number;
  reviews?: number;
};
