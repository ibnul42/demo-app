import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import ContactButton from "@/components/ContactButton";
import { assets } from "@/constant/helper";
import { verifyToken } from "@/lib/auth";
import UserInfo from "./UserInfo";

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
  if (!params || !params.id) {
    return notFound(); // Handle missing params
  }

  const user = await getUserFromToken();
  if (!user) {
    redirect("/signin");
  }

  const safeUser = JSON.parse(JSON.stringify(user));

  const asset = assets.find((item) => item?.id === params?.id);
  if (!asset) return notFound();

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

