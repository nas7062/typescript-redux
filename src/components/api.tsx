import axios from "axios";
import {db} from "../firebaseConfig";
import { collection,getDocs ,addDoc } from "firebase/firestore";
import { CardProps } from "./Card";
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
export async function fetchFeeds() {
    const querySnapshot = await getDocs(collection(db, "feeds"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  export async function addFeed(newFeed: Omit<CardProps,'id'>) {
    const docRef = await addDoc(collection(db, "feeds"), newFeed);
    return { id: docRef.id, ...newFeed };
  }