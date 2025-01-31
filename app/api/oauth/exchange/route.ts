import requireUser from "@/app/utils/hooks";
import { nylas, nylasConfig } from "@/app/utils/nylas";
import { NextRequest } from "next/server";
import prisma from "@/app/utils/db";
import { redirect } from "next/navigation";
import { NylasApiError } from "nylas";

export async function GET(req: NextRequest) {
  const session = await requireUser()

  const url = new URL(req.url)
  const code = url.searchParams.get("code")

  if (!code) {
    return Response.json("No authorization code returned from Nylas", {
      status: 400,
    })
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
      code: code
    })

    const { grantId, email } = response

    await prisma.user.update({
      where: {
        id: session.user?.id
      },
      data: {
        grantId: grantId,
        grantEmail: email
      }
    })
  } catch (error) {
    console.log("Error: ", error)

    if (error.statusCode === 401) {
      await prisma.user.update({
        where: {
          id: session.user?.id
        },
        data: {
          grantId: null,
          grantEmail: null,
        }
      })

      return redirect("/api/auth")
    }
  }

  redirect("/dashboard")
}