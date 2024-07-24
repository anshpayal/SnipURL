
import supabase, {supabaseUrl} from "./supabase";

export async function getURLs (user_id){
    //For Reading data from table -> we use "from("table-name") function", then we want to read the data so we are using select("*" || "anything-specifi-you-want"). Since we want the urls specific to the user that why we are using "eq("user-id",user_id) function"
    const {data, error} = await supabase.from("urls").select("*").eq("user_id", user_id);
    if(error) {
        console.log(error.message);
        throw new Error("Unable to fetch the URLs");
    }

    return data;
}

export async function deleteUrl (id){
    const {data, error} = await supabase.from("urls").delete().eq("id", id);
    if(error) {
        console.log(error.message);
        throw new Error("Unable to fetch the URLs");
    }

    return data;
}

export async function createNewUrl({longUrl, user_id, title,customUrl}, qrCode){
    const short_url = Math.random().toString(36).substring(2,6);

    const fileName = `qr-${short_url}`;
    const {error:storageError} = await supabase.storage.from("qrs").upload(fileName, qrCode);
    if(storageError) throw new Error(storageError.message);

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

    const {data, error} = await supabase.from("urls").insert([
        {
            title,
            original_url:longUrl,
            custom_url: customUrl || null,
            user_id,
            short_url,
            qr
        }
    ]).select();

    if(error) {
        console.log(error.message);
        throw new Error("Unable to create short url ");
    }

    return data;

}

export async function getLongUrl(id){
    const {data, error} = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id}, custom_url.eq.${id}`)
    .single();

    if(error){
        console.error(error.message);
        throw new Error("Unable to fetch Long Url")
    }
    return data;
}

 
