import axios from "axios";
import { CardProps } from "./Card";

interface FetchDatasResponse {
    items: CardProps[];
    nextPage?: number;
}
export async function fetchDatas()
{
    return await axios.get("../../public/utils/FeedData.json")
    .then((res)=>res.data.feed);
}
export async function fetchStudys()
{
    return await axios.get("../../public/utils/FeedData.json")
    .then((res)=>res.data.study);
}
export async function fetchGoal()
{
    return await axios.get("../../public/utils/FeedData.json")
    .then((res)=>res.data.goal);
}
