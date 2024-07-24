import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UrlState } from "@/Context";
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ErrorMessage from "./ErrorMessage";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import * as Yup from 'yup'
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/Hooks/useFetch";
import { createNewUrl } from "@/db/apiURLs";
import { BeatLoader } from "react-spinners";

const CreateNewUrl = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const ref = useRef();

  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: ""
  })

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string().url("Must be a valid URL").required("Long URL is required"),
    customUrl: Yup.string(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const {data, loading, error, fetchData:fnCreateNewUrl} = useFetch(createNewUrl,{...formData, user_id:user.id});
  
  useEffect(()=>{
    if(error===null && data){
      navigate(`/link/${data[0].id}`);
    }
  },[error, data])

  const handleOnClick = async()=>{
    setErrors([]);
    try {
      await schema.validate(formData,{abortEarly:false});
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve)=>canvas.toBlob(resolve));

      await fnCreateNewUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err)=>{
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  }
  return (
    <Dialog defaultOpen={longLink} onOpenChange={(res) => { if (!res) setSearchParams({}) }}>
      <DialogTrigger>
        <Button>Create New URL</Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-900 w-11/12 sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="font-normal text-xl ">Create New Short URL</DialogTitle>
        </DialogHeader>
        {formData?.longUrl && (
          <QRCode value={formData?.longUrl} size={140} ref={ref}/>
        )}
        <Input
          id="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Short URL title"
          className="text-black" />
        {errors.title && <ErrorMessage message={errors.title} />}

        <Input
          id="longUrl"
          value={formData.longUrl}
          onChange={handleChange}
          placeholder="Enter your Loooong URL"
          className="text-black" />
        {errors.longlink && <ErrorMessage message={errors.longlink} />}

        <div className="flex items-center gap-2">
          <Card className="p-2 text-sm">snipurl.com</Card> /
          <Input
            id="customUrl"
            value={formData.customUrl}
            onChange={handleChange}
            placeholder="Custom Link (optional)"
            className="text-black" />
        </div>
        {error && <ErrorMessage message={error.message} />}

        <DialogFooter className="sm:justify-start">
          <Button disable={loading} variant="destructive" onClick={handleOnClick}>
            {loading ? <BeatLoader size={10} color="white" />: "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default CreateNewUrl