import QuizSettings from "@/components/quiz-settings";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

export default function Home() {
  return (
    <main className="wrapper relative">
      <div className="bg-white p-3 shadow-md w-full md:w-[90%] lg:w-[70%] max-w-4xl rounded-md">
        <h1 className="heading">TheGamingClassroom</h1>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 md:p-10 gap-4">
          <div className="relative h-full">
            <Image
              src={"/logo.png"}
              alt="banner-image"
              priority
              width={300}
              height={300}
              className="object-cover object-center"
            />
          </div>
          <QuizSettings />
        </div>
      </div>
      <span className="text-xs text-gray-400 absolute bottom-4 right-4">Made with <FaHeart className="inline" /> by <a className="cursor-pointer underline" href="https://www.tiktok.com/@thegamingclassroom">TGC</a> in San Francisco</span>
    </main>
  );
}
