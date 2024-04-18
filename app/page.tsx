import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-2">
          <h1 className="font-bold text-3xl pb-5">
            Welcome to Dropbox.
            <br />
            <br />
            Storing everything for you and your business, needs. All in one
            place
          </h1>
          <p className="pb-20">
            Enhance your personal storage with Dropbox, offering a simple and
            efficient way to upload, organize, and access files from anywhere.
            Securely store important documents and media, and experience the
            convenience of easy file management and sharing in one centralized
            solution.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center bg-blue-500 p-5 w-fit"
          >
            Try it for free! <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="bg-[#11919] dark:bg-slate-800 h-full p-10">
          <video autoPlay muted loop className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="text-center">
        <p className="font-bold pt-5 text-xl">Disclaimer</p>
        <p className="text-sm font-light p-2">
          This video is made for informational and educational purposes only. We
          do not own or affiliate with Dropbox or/and any of its subsidiaries
          any form. Copyright Disclaimer under section 107 of the Copyright Act
          1976, allowance is made for "fair use" of this video for education
          purposes.
        </p>
      </div>
    </main>
  );
}
