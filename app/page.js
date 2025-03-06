import PageWrapper from "@/components/PageWrapper";
import RedirectToSignIn from "@/components/RedirectToSignIn";
import Image from "next/image";

export default function Home() {
  return (
    <PageWrapper>
      <RedirectToSignIn />
      <div className="flex flex-col gap-2 items-center">
        <Image
          src="/assets/logo.svg"
          height={100}
          width={100}
          alt=""
          className="w-60 h-60"
        />
        <p className="opacity-30 font-semibold text-2xl -mt-12">The12Councils</p>
      </div>
    </PageWrapper>
  );
}
