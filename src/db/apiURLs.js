import supabase from "./supabase";

export async function getURLs (user_id){
    //For Reading data from table -> we use "from("table-name") function", then we want to read the data so we are using select("*" || "anything-specifi-you-want"). Since we want the urls specific to the user that why we are using "eq("user-id",user_id) function"
    const {data, error} = await supabase.from("urls").select("*").eq("user_id", user_id);

    if(error) {
        console.log(error.message);
        throw new Error("Unable to fetch the URLs");
    }

    return data;
}