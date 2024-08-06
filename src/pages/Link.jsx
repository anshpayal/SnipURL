import { Button } from "@/components/ui/button";
import { UrlState } from "@/Context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiURLs";
import useFetch from "@/Hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { BarLoader, BeatLoader } from "react-spinners";
import { Calendar, Check, Copy, Download, Laptop, Link2, LinkIcon, MapPin, Mouse, Scissors, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LocationStats from "@/components/LocationStats";
import DeviceStats from "@/components/DeviceStats";

const Link = () => {

  const { id } = useParams();
  const { user } = UrlState();
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const { loading, data: url, error, fetchData: fnUrl } = useFetch(getUrl, { id, user_id: user?.id });
  const { loading: loadingStats, data: stats, fetchData: fnStats } = useFetch(getClicksForUrl, id);
  const { loading: loadingDelete, fetchData: fnDelete } = useFetch(deleteUrl, url?.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://snipurl.com/${url.short_url}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const downloadQR = () => {
    const imageURL = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageURL;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  useEffect(() => {
    fnUrl();
    fnStats();
  }, []);


  if (error) {
    navigate("/dashboard")
  }

  return (
    <>
      {
        (loading || loadingStats) && (
          <BarLoader width={"100%"} color="#475569" />
        )
      }
      <div className="flex flex-col gap-8 sm:flex-row justify-between py-8 mx-10 sm:mx-16">
        <div className=" card flex flex-col items-start gap-6 p-4 sm:w-2/5">
          <h1 className="font-semibold text-3xl">{url?.title}</h1>
          <span className="sm:text-[20px]">
            <a
              className="tracking-wide text-violet-400 hover:underline cursor-pointer flex items-center gap-2"
              href={`https://snipurl.co/${url?.short_url}`}
              target="_blank" >
                <Scissors size={16}/>
                https://snipurl.co/{url?.short_url}
            </a>
          </span>
          {url?.custom_url && (
            <span className="sm:text-[20px] break-all">
              <a
                className="tracking-wide hover:underline cursor-pointer  flex items-center gap-2"
                href={`https://snipurl.co/${url.custom_url}`}
                target="_blank">
                  <Link2 size={15}/>
                  https://snipurl.co/{url.custom_url}
              </a>
            </span>
          )}
          <span className="text-sm break-all">
            <a
              className="flex items-center gap-2 hover:underline"
              href={url?.original_url}
              target="_blank" >
              <LinkIcon size={15} />
              {url?.original_url}
            </a>
          </span>
          <span className="text-sm flex items-center gap-2">
            <Calendar size={14} />
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button className="bg-[#171717] hover:bg-[#0e0e0e]" onClick={handleCopy}>
              {copied ? <Check size={"18"} /> : <Copy size={"18"} />}
            </Button>
            <Button className="bg-[#171717] hover:bg-[#0e0e0e]">
              <Download size={"18"} onClick={downloadQR} />
            </Button>
            <Button className="bg-[#171717] hover:bg-[#0e0e0e]" onClick={() => { fnDelete() }}>
              {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash2 size={"18"} />}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-violet-500 p-1 object-contain"
            alt="qr code"
          />
        </div>
        <Card className="card border-[#212121] sm:w-3/5 rounded-md">
          <CardHeader>
            <CardTitle className="font-semibold text-3xl">Analytics</CardTitle>
          </CardHeader>
          {
            stats && stats?.length ? (
              <CardContent className="flex flex-col gap-8">
                <Card className="card border-[#212121]">
                  <CardHeader>
                    <CardTitle className=" font-normal text-[16px] sm:text-2xl tracking-wide flex items-center gap-2">
                      <span><Mouse/></span>
                      <span>Total Clicks</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl">{stats?.length || "0"}</p>
                  </CardContent>
                </Card>

                <CardTitle className=" font-normal text-[16px] sm:text-2xl tracking-wide flex items-center gap-2">
                  <span><MapPin/></span>
                  Location Data
                </CardTitle>
                <LocationStats stats={stats}/>
                <CardTitle className=" font-normal text-[16px] sm:text-2xl tracking-wide flex items-center gap-2">
                  <span><Laptop/></span>
                  Device Info
                </CardTitle>
                <DeviceStats stats={stats}/>
              </CardContent>
            ) : (
              <CardContent>
                {loadingStats === false ? "No Analytics" : "Loading Analytics"}
              </CardContent>
            )
          }

        </Card>

      </div>
    </>
  )
}

export default Link