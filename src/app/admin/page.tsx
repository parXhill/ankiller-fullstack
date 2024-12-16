import { SessionProvider } from "next-auth/react"
import NavigationBar from "../ui/navigationBar/NavBar"
 
export default function Administrator() {
  return (
    <SessionProvider>
      <NavigationBar />
    </SessionProvider>
  )
}