"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectLabel, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem } from "@/components/ui/select"
import ButtonGroup from "@/components/ui/ButtonGroup"
import { Button } from "@/components/ui/button"
import { useActionState, useState } from "react"
import Link from "next/link"
import { SubmitButton } from "@/app/components/SubmitButtons"
import { CreateEventTypeAction } from "@/app/actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { eventTypeSchema } from "@/app/utils/zodSchemas"

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams"

interface EditEventFormProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}

const EditEventForm = ({ callProvider, description, duration, id, title, url }: EditEventFormProps) => {
  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>(callProvider as VideoCallProvider)
  
    const [lastResult, action] = useActionState(CreateEventTypeAction, undefined)
  
    const [form, fields] = useForm({
      lastResult,
      onValidate({formData}) {
        return parseWithZod(formData, {
          schema: eventTypeSchema,
        })
      },
  
      shouldValidate: "onBlur",
      shouldRevalidate: "onInput"
    })
  return (
    <div className="w-full h-full flex flex-1 items-center
    justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Edit appointment type</CardTitle>
          <CardDescription>Edit your appointment type</CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input 
                name={fields.title.name} 
                key={fields.title.key} 
                defaultValue={title} 
                placeholder="30 minute meeting"
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3
                rounded-l-md border border-r-0 border-muted bg-muted
                text-sm text-muted-foreground">
                  CalendarApp.com/
                </span>
                <Input 
                  className="rounded-l-none" 
                  placeholder="Example-url-1" 
                  name={fields.url.name} 
                  key={fields.url.key} 
                  defaultValue={url} 
                />
              </div>
              <p className="text-red-500 text-sm">{fields.url.errors}</p>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea 
                placeholder="Meet me at 11 am"
                name={fields.description.name} 
                key={fields.description.key} 
                defaultValue={description} 
              />
              <p className="text-red-500 text-sm">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Duration</Label>
              <Select
                name={fields.duration.name} 
                key={fields.duration.key} 
                defaultValue={duration.toString()} 
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.duration.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <input 
                type="hidden"
                name={fields.videoCallSoftware.name} 
                value={activePlatform} 
              />
              <ButtonGroup>
                <Button 
                  type="button"
                  onClick={() => setActivePlatform("Zoom Meeting")} 
                  className="w-full"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                  }
                >
                  Zoom
                </Button>
                <Button 
                  type="button"
                  onClick={() => setActivePlatform("Google Meet")} 
                  className="w-full"
                  variant={
                    activePlatform === "Google Meet" ? "secondary" : "outline"
                  }
                >
                  Google Meet
                </Button>
                <Button 
                  type="button"
                  onClick={() => setActivePlatform("Microsoft Teams")} 
                  className="w-full"
                  variant={
                    activePlatform === "Microsoft Teams" ? "secondary" : "outline"
                  }
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              <p className="text-red-500 text-sm">{fields.videoCallSoftware.errors}</p>
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitButton text="Edit Event Type" />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default EditEventForm