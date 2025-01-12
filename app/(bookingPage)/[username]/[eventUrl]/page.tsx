import RenderCalendar from "@/app/components/bookingForm/RenderCalendar"
import prisma from "@/app/utils/db"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarX2, Clock, VideoIcon } from "lucide-react"
import { notFound } from "next/navigation"
import TimeTable from "@/app/components/bookingForm/TimeTable"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/app/components/SubmitButtons"
import { CreateMeetingAction } from "@/app/actions"

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            }
          }
        }
      }
    }
  })

  if (!data) {
    return notFound()
  }

  return data
}

const BookingFormRoute = async (
  props: {
    params: Promise<{ username: string; eventUrl: string }>;
    searchParams: Promise<{date?: string; time?: string}>
  }
) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getData(params.eventUrl, params.username)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const selectedDate = searchParams.date ? new Date(`${searchParams.date}T00:00:00`) : new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone
  }).format(selectedDate)

  const showForm = !!searchParams.date && !!searchParams.time

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
      <Card className="max-w-[600px] w-full">
        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] gap-4">
          <div>
            <img 
              src={data.User?.image as string} 
              alt="Profile Image of user"
              className="size-10 rounded-full" 
            />
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {data.User?.name}
            </p>
            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">{data.description}</p>

            <div className="mt-5 flex-col gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {formattedDate}
                </span>
              </p>

              <p className="flex items-center">
                <Clock className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.duration} Minutes
                </span>
              </p>
            </div>
          </div>

          <Separator orientation="vertical" className="h-full w-[1px]" />

          <form className="flex flex-col gap-y-4" action={CreateMeetingAction}>
            <input type="hidden" name="fromTime" value={searchParams.time} />
            <input type="hidden" name="eventDate" value={searchParams.date} />
            <input type="hidden" name="meetingLength" value={data.duration} />
            <input type="hidden" name="username" value={params.username} />
            <input type="hidden" name="eventTypeId" value={data.id} />
            <div className="flex flex-col gap-y-2">
              <Label>Recipient&apos;s Name</Label>
              <Input name="name" placeholder="Recipient's Name" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Recipient&apos;s Email</Label>
              <Input name="email" placeholder="name@example.com" />
              <SubmitButton text="Book Meeting" />
            </div>
          </form>
        </CardContent>
      </Card>
      ) : (
      <Card className="max-w-[1000px] w-full mx-auto">
        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
          <div>
            <img 
              src={data.User?.image as string} 
              alt="Profile Image of user"
              className="size-10 rounded-full" 
            />
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {data.User?.name}
            </p>
            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">{data.description}</p>

            <div className="mt-5 flex-col gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {formattedDate}
                </span>
              </p>

              <p className="flex items-center">
                <Clock className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.duration} Minutes
                </span>
              </p>
            </div>
          </div>

          <Separator orientation="vertical" className="h-full w-[1px]" />

          <RenderCalendar availability={data.User?.availability as any}/>

          <Separator orientation="vertical" className="h-full w-[1px]" />

          <TimeTable selectedDate={selectedDate} userName={params.username} duration={data.duration}/>
        </CardContent>
      </Card>
    )}
    </div>
  )
}

export default BookingFormRoute