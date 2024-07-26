import { BarLoader } from "react-spinners"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Filter, Link, Mouse,} from "lucide-react"
import { UrlState } from "@/Context"
import ErrorMessage from "@/components/ErrorMessage"
import useFetch from "@/Hooks/useFetch"
import { getURLs } from "@/db/apiURLs"
import { getClickForUrls } from "@/db/apiClicks"
import UrlCard from "@/components/UrlCard"
import CreateNewUrl from "@/components/CreateNewUrl"

const Dashborad = () => {
  const [searchQurey, setSearchQuery] = useState();
  const [filteredUrls, setFilteredUrls] = useState();

  const { user } = UrlState();
  const { data: urls, loading, error, fetchData: fnUrls } = useFetch(getURLs, user?.id);
  const { loading: loadingClicks, data: urlClicks, fetchData: fnClicks } = useFetch(getClickForUrls, urls?.map((url) => url.id));

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length){
      fnClicks();
    }
  }, [urls?.length]);

  useEffect(() => {
    setFilteredUrls(urls);
  }, [urls]);
  
  const handleFilter = ()=>{
    const filtered = urls?.filter((url) => {
        return url?.title.toLowerCase().includes(searchQurey.toLowerCase());
      });
      setFilteredUrls(filtered);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:mx-16">
      {loading || loadingClicks && <BarLoader width={"100%"} color="#475569" />}
      <div className="p-4 grid grid-cols-2 gap-4">
        <Card className="bg-black border-2 border-slate-600 shadow-md shadow-slate-600">
          <CardHeader>
            <CardTitle className=" font-normal tracking-wide text-[16px] sm:text-2xl flex items-center gap-2"><span><Link/></span>LINKS CREATED</CardTitle>
          </CardHeader>
          <CardContent >
            <p className="text-xl">{urls?.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-black border-2 border-slate-600 shadow-md shadow-slate-600">
          <CardHeader>
            <CardTitle className=" font-normal text-[16px] sm:text-2xl tracking-wide flex items-center gap-2">
              <span><Mouse/></span>
              TOTAL CLICKS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl">{urlClicks?.length || "0"}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl">My Links</h1>
        <CreateNewUrl/>
      </div>
      <div className="p-4 relative">
        <Input
          className="text-black"
          type="text"
          placeholder="Filter Links..."
          value={searchQurey}
          onChange={(e) => { setSearchQuery(e.target.value) }} 
          onKeyPress={handleKeyPress}/>
        <Filter className="absolute top-6 right-6" color="black" onClick={handleFilter} />
      </div>
      {error && <ErrorMessage message={error?.message} />}
      {
        filteredUrls?.map((url,i)=> {return <UrlCard key={i} url={url} fetchUrl={fnUrls} />})
      }
    </div>
  )
}

export default Dashborad