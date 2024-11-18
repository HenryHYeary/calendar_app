import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png"
import AuthModal from "./AuthModal";

export function Navbar() {
  return(
    <div className="flex py-5 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} width="70" height="70" alt="Logo" />
        <h4 className="text-3xl font-semibold">
          Calendar<span className="text-blue-500">App</span>
        </h4>
      </Link>

      <AuthModal />
    </div>
  )
}