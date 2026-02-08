import { cache } from "react";
import apiClient from "@/lib/api";
import { BusinessProfile } from "@/types/business";

export const getBusinessProfile = cache(async (slug: string): Promise<BusinessProfile | null> => {
  try {
    const response = await apiClient.post("/website/business/profile/details", {
      bisLink: slug,
      page: 1,
      limit: 10,
      locationLink: null,
      date: new Date().toISOString().split('T')[0] // Use current date
    });
    
    const data = response.data;
    if (!data || !data.business) {
        return null;
    }

    const businessData = data.business;
    const bisUser = businessData.bisUserData || {};

    const profile: BusinessProfile = {
        id: businessData.id,
        slug: businessData.link || slug,
        name: businessData.brand || `${businessData.firstName} ${businessData.lastName}`,
        description: bisUser.about || "No description provided.",
        logo: bisUser.logoName ? `https://gymble.us/storage/${bisUser.logoName}` : "/fitness-logo.png",
        banner: bisUser.coverName ? `https://gymble.us/storage/${bisUser.coverName}` : "/fitness-banner.png",
        category: "Fitness",
        location: "New York, NY",
        phone: businessData.mobile,
        email: businessData.email,
        website: "",
        socials: {
            instagram: "",
            facebook: "",
            twitter: ""
        },
        stats: [
            { label: "Reviews", value: data.reviews?.total?.toString() || "0" },
            { label: "Rating", value: data.avgReview?.averageRating?.toString() || "0.0" }
        ],
        amenities: [],
        rating: Number(data.avgReview?.averageRating) || 0,
        reviews: Number(data.reviews?.total) || 0,
        upcoming: data.schedules || [],
        listings: data.featuredListings || []
    };

    return profile;
  } catch (error: any) {
    console.error("Error fetching business profile:", error);
    if (error.response?.status === 404) {
      return null;
    }
    throw new Error(error.response?.data?.message || "Failed to fetch business profile");
  }
});
