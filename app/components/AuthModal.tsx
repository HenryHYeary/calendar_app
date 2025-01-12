import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.png"
import { signIn } from "../utils/auth";
import { GoogleAuthButton, GitHubAuthButton } from "./SubmitButtons";

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
          <DialogContent className="sm:max-w-[360px]">
            <DialogTitle aria-label="Sign In">
              Sign In
            </DialogTitle>
            <DialogHeader className="flex flex-row justify-center items-center gap-2">
              <Image src={Logo} alt="Logo" className="size-10" />
              <h4 className="text-3xl font-semibold">
                Calendar<span className="text-primary">App</span>
              </h4>
            </DialogHeader>
            <div className="flex flex-col mt-5 gap-3">
              <form action={async () => {
                "use server"
                await signIn("google")
              }} className="w-full">
                <GoogleAuthButton />
              </form>
              <form action={async () => {
                "use server"
                await signIn("github")
              }}>
                <GitHubAuthButton />
              </form>
            </div>
          </DialogContent>
    </Dialog>
  )
}

export default AuthModal