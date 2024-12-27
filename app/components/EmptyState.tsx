import { BanIcon, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  title: string,
  description: string,
  buttonText: string,
  href: string
}

const EmptyState = ({buttonText, description, href, title}: EmptyStateProps) => {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center 
    rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full
      bg-primary/10">
        <BanIcon className="size-10 text-primary"/>
      </div>

      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-xs mx-auto">{description}</p>

      <Button asChild>
        <Link href={href}>
        <PlusCircle className="mr-2 size-4"/>
          {buttonText}
        </Link>
      </Button>
    </div>
  )
}

export default EmptyState