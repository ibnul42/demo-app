import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import ContactButton from "@/components/ContactButton";
import { assets } from "@/constant/helper";
import { verifyToken } from "@/lib/auth";
import Image from "next/image";

async function getUserFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token?.value) return null; // Ensure we have a token

  try {
    const user = await verifyToken(token.value);
    return user;
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }) {
  const user = await getUserFromToken();
  if (!user) {
    redirect("/signin"); // Redirect instead of showing 404
  }

  const asset = assets.find((item) => item.id === params.id);
  if (!asset) return notFound(); // If asset not found, return 404 page

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <TopHeader />
        <div className="w-80 h-auto min-h-80 py-8 px-2 bg-gray-200 flex flex-col gap-5 justify-center items-center">
          <h2 className="text-xl font-bold text-gray-700">{asset.title}</h2>
          <Image
            src={asset.src}
            alt={asset.title}
            width={320}
            height={160}
            className="w-full h-auto max-h-40 object-cover rounded-md"
          />
          <div className="w-full">
            <p className="text-gray-600 text-sm">Name: {user.name}</p>
            <p className="text-gray-600 text-sm">Phone: {user.phone}</p>
            <p className="text-gray-600 text-sm">Email: {user.email}</p>
            <p className="text-gray-600 text-sm">Address: {user.address}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <ContactButton />
        </div>
      </div>
    </PageWrapper>
  );
}
