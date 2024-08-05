/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Calendar, Check, Copy, Download, Trash2 } from "lucide-react"
import useFetch from "@/Hooks/useFetch"
import { deleteUrl } from "@/db/apiURLs"
import { BeatLoader } from "react-spinners"
import { useState } from "react"

const UrlCard = ({ url, fetchUrl }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://snipurl.co/${url.short_url}`)
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

    const { loading: loadingDelete, fetchData: fnDelete } = useFetch(deleteUrl, url?.id);

    return (
        <div className=" card border-[#212121] flex flex-col md:flex-row gap-5 p-4 m-4 ">
            <img
                className="h-32 w-32 object-contain ring ring-violet-500 self-start"
                src={url?.qr} alt="QR code" />
            <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 min-w-0">
                <span className="text-2xl font-semibold hover:underline cursor-pointer  whitespace-normal">
                    {url?.title}
                </span>
                <span className="text-lg font-semibold text-violet-400 hover:underline cursor-pointer break-words whitespace-normal">
                    https://snipurl.co/{url.custom_url ? url?.custom_url : url?.short_url}
                </span>
                <span className=" inline font-md items-center hover:underline cursor-pointer truncate truncate-ellipsis">
                    {url?.original_url}
                </span>
                <span className="flex items-end font-extralight text-sm flex-1 mt-4 gap-2">
                    <Calendar size={18} />
                    {new Date(url?.created_at).toLocaleString()}
                </span>
            </Link>
            <div className="flex gap-2 self-start">
                <Button className="bg-[#171717] hover:bg-[#0e0e0e]" onClick={handleCopy}>
                    {copied ? <Check size={"18"} /> : <Copy size={"18"} />}
                </Button>
                <Button className="bg-[#171717] hover:bg-[#0e0e0e]" onClick={downloadQR}>
                    <Download size={"18"} />
                </Button>
                <Button className="bg-[#171717] hover:bg-[#0e0e0e]" onClick={() => { fnDelete().then(() => fetchUrl()) }}>
                    {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash2 size={"18"} />}
                </Button>
            </div>
        </div>
    )
}

export default UrlCard
