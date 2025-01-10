import { cancelMeetingAction } from "@/app/actions"
import EmptyState from "@/app/components/EmptyState"
import { SubmitButton } from "@/app/components/SubmitButtons"
import prisma from "@/app/utils/db"
import requireUser from "@/app/utils/hooks"
import { nylas } from "@/app/utils/nylas"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format, fromUnixTime } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { Video } from "lucide-react"

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      grantId: true,
      grantEmail: true
    }
  })

  if (!userData) {
    throw new Error("User not found")
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string
    }
  })

  return data
}

const MeetingsRoute = async () => {
  const session = await requireUser()
  const data = await getData(session.user?.id as string)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState title="No meetings found" description="You dont have any meetings yet."
        buttonText="Create a new event type" href="/dashboard/new" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>See upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form action={cancelMeetingAction} key={item.id}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center pb-0.5">
                  <div>
                    <p className="text-muted-foreground text-sm">{
                      //@ts-ignore
                    item.when.startTime ? format(toZonedTime(fromUnixTime(item.when.startTime), timeZone), "EE, MMM dd") :  
                    //@ts-ignore
                    format(toZonedTime(new Date(`${item.when.startDate}T00:00:00`), timeZone), "EE, MMM dd") 
                    }</p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {/* @ts-ignore */}
                      {item.when.startTime ? format(toZonedTime(fromUnixTime(item.when.startTime), timeZone), "hh:mm a") :
                      // @ts-ignore
                      format(toZonedTime(new Date(`${item.when.startDate}T00:00:00`), timeZone), "hh:mm a")}-{
                        // @ts-ignore
                        item.when.endTime ? format(toZonedTime(fromUnixTime(item.when.endTime), timeZone), "hh:mm a") :
                        // @ts-ignore
                        `${format(toZonedTime(new Date(`${item.when.endDate}T00:00:00`), timeZone), "hh:mm a")}` + ` (${format(toZonedTime(new Date(`${item.when.endDate}T00:00:00`), timeZone), "EE, MMM dd")})` 
                        }
                    </p>

                    {item.conferencing && Object.hasOwn(item.conferencing, "details") ? (
                      <div className="flex items-center mt-1">
                        <Video className="size-4 mr-2 text-primary" />
                      <a 
                        className="text-xs text-primary underline underline-offset-4" 
                        // @ts-ignore
                        href={item.conferencing.details.url}
                        target="_blank"
                      >
                        Join Meeting
                      </a>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                      <h2 className="text-sm font-medium">{item.title}</h2>
                      {item.participants[0].name ? (
                        <p className="text-sm text-muted-foreground">You and {item.participants[0].name}</p>
                      ) : (
                        <div></div>
                      )}
                  </div>

                  <SubmitButton text="Cancel Event" variant="destructive" className="w-fit flex ml-auto" />
                </div>

                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default MeetingsRoute