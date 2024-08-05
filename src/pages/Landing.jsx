import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FeatureCard from "@/components/FeatureCard"
import { AreaChart, Link2, QrCode, ShieldCheck, SparklesIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();
  const handleSubmitForm = (e)=>{
    e.preventDefault();
    if(longUrl) navigate(`/auth?createNew=${longUrl}`);
  }
  return (
    <main className=" flex flex-col items-center">
      <div className="mt-12 mb-14 w-full text-center font-poppins">
        <h1 className=" text-[33px] sm:text-7xl font-semibold text-gradient ">SHORTEN & ANALYSE</h1>
        <div className=" w-9/12 sm:w-6/12 h-0.5 sm:mt-1 bg-violet-500 mx-auto"></div>  
        <h2 className=" text-xl sm:text-4xl mt-3 sm:mt-4 "> Your URLs Quickly and Easily</h2>
      </div>
      <div className=" w-10/12 sm:w-6/12">
        <form onSubmit={handleSubmitForm} className="flex flex-col sm:flex-row gap-2">
          <Input
            className="text-black focus:outline-gray-600" 
            type="url"
            value={longUrl} 
            placeholder="Enter your long URL" 
            onChange={(e)=>{setLongUrl(e.target.value)}}/>
          <Button variant="" className="btn"><SparklesIcon className="sparkle" size={18}/> Shorten Url</Button>
        </form>
      </div>
      <div className="w-full p-12 sm:p-12">
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

      <div className="w-full my-10 sm:my-20">
        <h1 className="text-3xl font-semibold text-center p-1">Frequently Asked Questions</h1>
        <Accordion type="multiple" collapsible="true" className="w-9/12 mx-auto my-5">
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
            <AccordionTrigger>What analytics are availabe ?</AccordionTrigger>
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
