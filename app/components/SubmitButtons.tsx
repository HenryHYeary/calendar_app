"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import GoogleLogo from "@/public/google.svg"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import GitHubLogo from "@/public/github.svg"
import { cn } from "@/lib/utils"

interface SubmitButtonProps {
  text: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  className?: string;
}

const SubmitButton = ({ text, variant, className }: SubmitButtonProps) => {
  const {pending} = useFormStatus()

  return (
    <>
    {pending ? (
      <Button disabled variant="outline" className={cn("w-fit", className)}>
        <Loader2 className="size-4 mr-2 animate-spin" /> Please Wait
      </Button>
    ) : (
      <Button type="submit" variant={variant} className={cn("w-fit", className)}>
        {text}
      </Button>
    )}
    </>
  )
}

const GoogleAuthButton = () => {
  const { pending } = useFormStatus()
  return (
    <>
    {pending ?(
      <Button disabled variant="outline" className="w-full">
        <Loader2 className="size-4 mr-2 animate-spin"/> Please wait
      </Button>
    ): (
      <Button variant="outline" className="w-full">
        <Image src={GoogleLogo} alt="GoogleLogo" className="size-4 mr-2" />
        Sign in with Google
      </Button>
    )}
    </>
  )
}

const GitHubAuthButton = () => {
  const { pending } = useFormStatus()
  return (
    <>
    {pending ?(
      <Button disabled variant="outline" className="w-full">
        <Loader2 className="size-4 mr-2 animate-spin"/> Please wait
      </Button>
    ): (
      <Button variant="outline" className="w-full">
        <Image src={GitHubLogo} alt="GitHubLogo" className="size-4 mr-2" />
        Sign in with GitHub
      </Button>
    )}
    </>
  )
}

export { 
  SubmitButton,
  GoogleAuthButton, 
  GitHubAuthButton,
}