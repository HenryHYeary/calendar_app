import Image from "next/image"
import NextjsLogo from "@/public/nextjs-logo.svg"

const Logos = () => {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">Trusted by the best</h2>

      <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image src={NextjsLogo} alt="Logo" height={300} width={300} className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"/>
        <Image src={NextjsLogo} alt="Logo" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"/>
        <Image src={NextjsLogo} alt="Logo" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"/>
        <Image src={NextjsLogo} alt="Logo" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"/>
        <Image src={NextjsLogo} alt="Logo" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"/>
      </div>
    </div>
  )
}

export default Logos