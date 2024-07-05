import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FeatureCard from "@/components/FeatureCard"
import { AreaChart, Link2, QrCode, ShieldCheck } from "lucide-react"

const Landing = () => {
  return (
    <main className=" flex flex-col items-center">
      <div className="mt-12 mb-14 w-full text-center text-white font-poppins">
        <h1 className=" text-3xl sm:text-5xl font-bold ">SHORTEN & ANALYSE</h1>
        <div className=" w-10/12 sm:w-5/12 h-0.5 mt-1 bg-slate-600 mx-auto"></div>
        <br />
        <h2 className=" text-2xl sm:text-4xl "> Your URLs Quickly and Easily</h2>
      </div>
      <div className=" w-10/12 sm:w-6/12">
        <form className="flex flex-col sm:flex-row gap-2">
          <Input type="url" placeholder="Enter your long URL" />
          <Button className="" variant="destructive">Shorten Url</Button>
        </form>
      </div>
      <div className="w-full p-12 sm:p-16  text-white">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">

          <FeatureCard
            Icon={ShieldCheck}
            heading="Secure"
            content="It is fast and secure, our service has HTTPS protocol and data encryption."
          />
          <FeatureCard
            Icon={AreaChart}
            heading="Analytics"
            content="Check the number of clicks that your shortened URL received."
          />
          <FeatureCard
            Icon={Link2}
            heading="Custom URL"
            content="Create custom URLs to make them more recognizable and memorable."
          />
          <FeatureCard
            Icon={QrCode}
            heading="QR Code"
            content="Generate a QR code for your shortened URL for easy sharing."
          />
        </div>
      </div>

      <div className="text-white w-full my-20">
        <h1 className="text-3xl font-semibold m- text-center">Frequently Asked Questions</h1>
        <Accordion type="multiple" collapsible className="w-9/12 mx-auto my-5">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does SnipUrl Shortener work?</AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system will generates a shorter version of that URL. This shortened URL redirects to the orginal long URL when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is a custom URL shortener?</AccordionTrigger>
            <AccordionContent>
              A custom URL shortener, sometimes referred to as a branded URL shortener, lets you brand your links. There are several benefits of branding your short links. Branded links build trust between your audience and your business, drive more clicks, give your audience a preview of where they are being taken and increase brand awareness.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What analytics are availabe for shortened URL?</AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of clicks and device type (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Benefits of short URL ?</AccordionTrigger>
            <AccordionContent>
              How many people can even remember a long web address, especially if it has tons of characters and symbols? A short URL can make your link more memorable. Not only does it allow people to easily recall and share your link with others, it can also dramatically improve traffic to your content.On a more practical side, a short URL is also easier to incorporate into your collateral – whether you’re looking to engage with your customers offline or online.
              SinpUrl is the best URL shortener for everyone, from influencers to small brands to large enterprises, who are looking for a simple way to create, track and manage their links.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
}

export default Landing
