import { BarLoader } from "react-spinners"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Filter } from "lucide-react"
import { UrlState } from "@/Context"
import ErrorMessage from "@/components/ErrorMessage"
import useFetch from "@/Hooks/useFetch"
import { getURLs } from "@/db/apiURLs"
import { getClickForUrls } from "@/db/apiClicks"
import UrlCard from "@/components/UrlCard"

const Dashborad = () => {
  const [searchQurey, setSearchQuery] = useState("");

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

  const filteredUrls = urls?.filter((url) => {
    url.title.toLowerCase().includes(searchQurey.toLowerCase());
  })

  return (
    <div className="flex flex-col gap-8">
      {loading || loadingClicks && <BarLoader width={"100%"} color="#475569" />}
      <div className="p-4 grid grid-cols-2 gap-4">
        <Card className="bg-black">
          <CardHeader>
            <CardTitle>Links created</CardTitle>
          </CardHeader>
          <CardContent >
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-black">
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urlClicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl">My Links</h1>
        <Button>Create new URL</Button>
      </div>
      <div className="p-4 relative">
        <Input
          className="text-black"
          type="text"
          placeholder="Filter Links..."
          value={searchQurey}
          onChange={(e) => { setSearchQuery(e.target.value) }} />
        <Filter className="absolute top-6 right-6" color="black" />
      </div>
      {error && <ErrorMessage message={error?.message} />}
      {
        urls?.map((url,i)=> {return <UrlCard key={i} url={url} fetchUrl={fnUrls} />})
      }
    </div>
  )
}

export default Dashborad