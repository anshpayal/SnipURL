import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiURLs";
import useFetch from "@/Hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { BarLoader } from "react-spinners"

const RedirectLink = () => {
  const {id} = useParams();

  const {data, loading, fetchData} = useFetch(getLongUrl,id);
  
  const { loading:loadingStats, fetchData:fnStats} = useFetch(storeClicks,{
    id: data?.id,
    originalUrl: data?.original_url 
  })

  useEffect(()=>{
    fetchData();
  })

  useEffect(()=>{
    if(!loading && data) {
      fnStats();
    }
  },[loading])

  if(loading || loadingStats){
    return(
      <div>
        <BarLoader width={"100%"} color="#475569" />
        <br/>
      </div>
    )
  }

  return null;
}

export default RedirectLink