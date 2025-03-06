import { cookies } from "next/headers"; // Import cookies from next/headers
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import ContactButton from "@/components/ContactButton";
import { assets } from "@/constant/helper";
import { notFound } from "next/navigation";
import { verifyToken } from "@/lib/auth";

// Fetching user info based on JWT token
async function getUserFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token"); 
  if (!token) {
    return null; 
  }

  try {
    const user = await verifyToken(token.value); 
    return user; 
  } catch (error) {
    return null; 
  }
}

export default async function Page({ params }) {
  const user = await getUserFromToken(); // Get user info based on token

  // Ensure this runs on the server
  const asset = assets.find((item) => item.id === params.id);
  if (!asset) return notFound(); // If asset not found, return 404 page

  // If user is not authenticated, redirect to signin
  if (!user) {
    return notFound(); // You can replace this with a redirect to the sign-in page
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <TopHeader />
        <div className="w-80 h-auto min-h-80 py-8 px-2 bg-gray-200 flex flex-col gap-5 justify-center items-center">
          <h2 className="text-xl font-bold text-gray-700">{asset.title}</h2>
          <img
            src={asset.src}
            alt={asset.title}
            className="w-full h-auto max-h-40 object-cover rounded-md"
          />
          <div className="w-full">
            <p className="text-gray-600 text-sm">Name: {user.name}</p>
            <p className="text-gray-600 text-sm">Phone: {user.phone}</p>
            <p className="text-gray-600 text-sm">Email: {user.email}</p>
            <p className="text-gray-600 text-sm">Address: {user.address}</p>
          </div>
        </div>

        {/* Contact Button */}
        <div className="flex justify-center">
          <ContactButton />
        </div>
      </div>
    </PageWrapper>
  );
}
