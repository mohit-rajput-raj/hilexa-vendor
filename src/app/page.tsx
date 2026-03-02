'use client'
import { SpinnerCustom } from "@/components/loaders/smallSpinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/services/queryes";
import { PageSkeleton } from "./(dashboard)/rooms/_components/details.skeleton";

export default function Home() {
  const {data , isLoading} = useCurrentUser();
  const router = useRouter()
  useEffect(() => {
    if(data){
      router.replace("/dashboard")
    }else if(localStorage.getItem("accessToken") === null){
      router.replace("/login")
    }
  }, [data])
  if(isLoading)return <PageSkeleton />
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SpinnerCustom /> loading
    </div>
  );
}
