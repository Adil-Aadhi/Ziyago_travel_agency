import HomePage from "./home"
import Navbar from "@/components/layout/Navbar"

export default function mainapp() {
  return (
    <>
      <Navbar />

      <main>
        <HomePage />
      </main>
    </>
  )
}