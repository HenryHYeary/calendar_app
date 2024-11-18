import { redirect } from "next/navigation"
import { auth } from "../utils/auth"
import requireUser from "../utils/hooks"


const DashboardPage = async () => {
  const session = await requireUser()

  return (
    <div>
      <h1>Hello from the dashboard!</h1>
    </div>
  )
}

export default DashboardPage