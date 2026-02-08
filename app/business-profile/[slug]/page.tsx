import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBusinessProfile } from "@/lib/api";
import ProfileContent from "./profile-content";

interface BusinessProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BusinessProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    return {
      title: "Business Not Found | Gymble",
      description: "The business profile you are looking for does not exist.",
    };
  }

  return {
    title: `${business.name} | Gymble Business Profile`,
    description: business.description.substring(0, 160),
    openGraph: {
      title: `${business.name} - Sports & Fitness`,
      description: business.description.substring(0, 160),
      images: [business.banner],
    },
  };
}

export default async function BusinessProfilePage({ params }: BusinessProfilePageProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  return <ProfileContent business={business} />;
}
