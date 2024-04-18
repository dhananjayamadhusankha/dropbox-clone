import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import DropboxLogo from "../images/dropbox-seeklogo.png";
import { ThemeToggler } from "./ThemeToggler";

function Header() {
  return (
    <div className="flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-dropbox w-fit p-3">
          <Image src={DropboxLogo} alt="dropbox logo" width={30} />
        </div>
        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>

      <div className="flex px-5 space-x-2 items-center">
        {/* Themes triger */}
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />

        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
