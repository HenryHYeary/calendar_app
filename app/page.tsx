import { redirect } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { auth } from "./utils/auth";
import Hero from "./components/Hero";
import Logos from "./components/Logos";
import Features from "./components/Features";
import CTA from "./components/Cta";

export default async function Home() {
  const session = await auth()

  if(session?.user) {
    return redirect("/dashboard")
  }
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <CTA />
    </div>
  );
}
