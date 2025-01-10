import EditEventForm from "@/app/components/EditEventTypeForm"
import prisma from "@/app/utils/db"
import { notFound } from "next/navigation"

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      url: true,
      videoCallSoftware: true,
    },
  })

  if (!data) {
    return notFound()
  }

  return data
}

const EditRoute = async (
  props: {
    params: Promise<{eventTypeId: string}>
  }
) => {
  const params = await props.params;
  const data = await getData(params.eventTypeId)

  return (
    <EditEventForm 
      callProvider={data.videoCallSoftware} 
      description={data.description}
      duration={data.duration}
      id={data.id}
      title={data.title}
      url={data.url}
    />
  )
}

export default EditRoute