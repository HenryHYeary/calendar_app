import prisma from "@/app/utils/db"
import requireUser from "@/app/utils/hooks";
import { times } from "@/app/utils/times";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation"

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  })

  if (!data) {
    return notFound();
  }

  return data
}

const AvailabilityRoute = async () => {
  const session = await requireUser()
  const data = await getData(session.user?.id as string)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          Manage your availability
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="flex flex-col gap-y-4">
          {data.map((item) => (
            <div 
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-2 
              md:grid-cols-3 items-ecenter gap-4"
            >
              <div className="flex items-center gap-x-3">
                <Switch defaultChecked={item.isActive} />
                <p>{item.day}</p>
              </div>
              
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem value={time.time} key={time.id}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Till Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem value={time.time} key={time.id}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
      </form>
    </Card>
  )
}

export default AvailabilityRoute