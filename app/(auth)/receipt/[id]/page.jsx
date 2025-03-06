import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import ContactButton from "@/components/ContactButton";
import { assets } from "@/constant/helper";
import { verifyToken } from "@/lib/auth";
import UserInfo from "./UserInfo";

async function getUserFromToken() {
  const cookieStore = await cookies();  // Await cookies() here
  const token = cookieStore.get("token");

  if (!token?.value) return null; // Ensure we have a token

  try {
    const user = await verifyToken(token.value);
    return user;
  } catch (error) {
    return null;
  }
}

async function getAssetById(id) {
  // Simulating an async asset fetch (could be from a database or API)
  return new Promise((resolve, reject) => {
    const asset = assets.find((item) => item?.id === id);
    if (asset) resolve(asset);
    else reject("Asset not found");
  });
}

export default async function Page({ params }) {
  // Await the params object if necessary
  const { id } = await params;

  if (!id) {
    return notFound(); // Handle missing params
  }

  const user = await getUserFromToken();
  if (!user) {
    redirect("/signin");
  }

  const safeUser = JSON.parse(JSON.stringify(user));

  // Fetch the asset asynchronously
  let asset;
  try {
    asset = await getAssetById(id);
  } catch (error) {
    return notFound();
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <TopHeader />
        <UserInfo user={safeUser} asset={asset} />
        <div className="flex justify-center">
          <ContactButton />
        </div>
      </div>
    </PageWrapper>
  );
}
