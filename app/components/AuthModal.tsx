import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.png"
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { signIn } from "../utils/auth";
import { GoogleAuthButton, GitHubAuthButton } from "./SubmitButtons";

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <VisuallyHidden>
        <DialogTitle>
          <DialogContent className="sm:max-w-[360px]">
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
              <Button>Sign in with GitHub</Button>
            </div>
          </DialogContent>
        </DialogTitle>
      </VisuallyHidden>
    </Dialog>
  )
}

export default AuthModal