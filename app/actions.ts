"use server"

import requireUser from "./utils/hooks"
import prisma from "./utils/db"
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchemaValidation, settingsSchema } from "./utils/zodSchemas"
import { redirect } from "next/navigation"


export async function OnboardingAction(prevState: any, formData: FormData) {
  const session = await requireUser()

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        })

        return !existingUsername
      }
    }),

    async: true
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    }
  })

  return redirect("/onboarding/grant-id")
}

export async function SettingsAction(prevState: any, formData: FormData) {
  const session = await requireUser()

  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const user = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    }
  })

  return redirect("/dashboard")
}