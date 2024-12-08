import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import VideoGif from "@/public/bongo-cat.gif"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarCheck2 } from "lucide-react"

const OnboardingRouteTwo = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>You are almost done!</CardTitle>
          <CardDescription>
            Now we have to connect your calendar to your account.
          </CardDescription>
          <Image src={VideoGif} width={500} height={300} alt="Almost finished gif" className="w-full rounded-lg"/>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
          <Link href="/">
            <CalendarCheck2 className="size-4 mr-2"/>
            Connect Calendar to your Account
          </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default OnboardingRouteTwo