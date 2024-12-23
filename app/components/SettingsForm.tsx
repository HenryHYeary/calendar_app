"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "./SubmitButtons"
import { useActionState } from "react"
import { SettingsAction } from "../actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { settingsSchema } from "../utils/zodSchemas"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { UploadDropzone } from "../utils/uploadthing"
import { toast } from "sonner"

interface SettingsFormProps {
  fullName: string,
  email: string,
  profileImage: string
}

const SettingsForm = ({email, fullName, profileImage}: SettingsFormProps) => {
  const [lastResult, action] = useActionState(SettingsAction, undefined)
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema
      })
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })

  const handleDeleteImage = () => {
    setCurrentProfileImage("")
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>

      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input 
              name={fields.fullName.name} 
              key={fields.fullName.key} 
              defaultValue={fullName} 
              placeholder="Henry Yeary" 
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input disabled defaultValue={email} placeholder="test@test.com" />
          </div>

          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            <input 
              type="hidden" 
              name={fields.profileImage.name}
              key={fields.profileImage.key} 
              value={currentProfileImage} 
            />
            {currentProfileImage ? (
              <div className="relative size-16">
                <img src={currentProfileImage} alt="Profile Image"
                className="size-16 rounded-lg" />

                <Button variant="destructive" size="icon" className="absolute -top-3 -right-3" onClick={handleDeleteImage} type="button">
                  <X className="size-4"/>
                </Button>
              </div>
            ) : (
              <UploadDropzone onClientUploadComplete={(res) => {
                setCurrentProfileImage(res[0].url)
                toast.success("Profile Image has been uploaded")
              }} 
              onUploadError={(error) => {
                console.log("error", error)
                toast.error(error.message)
              }}
              endpoint="imageUploader" 
              />
            )}
            <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes"/>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SettingsForm