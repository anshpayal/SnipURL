import supabase from "./supabase";

export async function getClickForUrls(urlIds){
    const {data, error} = await supabase.from("clicks").select("*").in("url_id", urlIds);

    if(error){
        console.log(error.message);
        throw new Error("Unable to fetch clicks");
    }
    return data;
}

