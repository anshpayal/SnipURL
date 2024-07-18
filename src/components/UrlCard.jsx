/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Copy, Download, Trash2 } from "lucide-react"
import useFetch from "@/Hooks/useFetch"
import { deleteUrl } from "@/db/apiURLs"
import { BeatLoader } from "react-spinners"

const UrlCard = ({url, fetchUrl}) => {

    const downloadQR = ()=>{
        const imageURL = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageURL;
        anchor.download = fileName;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    const {loading:loadingDelete, fetchData:fnDelete}=useFetch(deleteUrl,url?.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 p-4 m-4 bg-[#0F172A] rounded-lg">
        <img 
         className="h-32 object-contain ring ring-blue self-start"
         src={url?.qr} alt="QR code"/>
         <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
            <span className="text-2xl font-semibold hover:underline cursor-pointer">
                {url?.title}
            </span>
            <span className="text-lg font-semibold text-blue-400 hover:underline cursor-pointer">
                https://snipurl.com/{url.custom_url ? url?.custom_url:url?.short_url}
            </span>
            <span className="flex font-md items-center gap-1 hover:underline cursor-pointer">
                {url?.original_url}
            </span>
            <span className="flex items-end font-extralight text-sm flex-1">
                {new Date(url?.created_at).toLocaleString()}
            </span>
         </Link>
         <div className="flex ">
            <Button className="hover:bg-slate-700" onClick={()=>{navigator.clipboard.writeText(`https://snipurl.com/${url.short_url}`)}}>
                <Copy size={"18"} />
            </Button>
            <Button className="hover:bg-slate-700">
                <Download size={"18"} onClick={downloadQR}/>
            </Button>
            <Button className="hover:bg-slate-700" onClick={()=>{fnDelete().then(()=> fetchUrl())}}>
                {loadingDelete ? <BeatLoader size={5} color="white"/>:<Trash2 size={"18"} />}
            </Button>
         </div>
    </div>
  )
}

export default UrlCard