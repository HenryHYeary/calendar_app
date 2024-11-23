import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from '@/public/logo.png'
import DashboardLinks from "../components/DashboardLinks"
import { SheetTrigger, Sheet } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

const DashboardLayout = ({ children }: {children: ReactNode}) => {
  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border -r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} className="size-10" alt="Logo"/>
                <p className="text-xl font-bold">
                  Calendar<span className="text-primary">App</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40
            px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="md:hidden shrink-0" size="icon"
                variant="outline">
                  <Menu className="size-5"/>
                </Button>
              </SheetTrigger>
            </Sheet>
            </header>
          </div>
      </div>
    </>
  )
}

export default DashboardLayout