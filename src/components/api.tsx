import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import { CardProps } from '../components/Card';


export async function fetchDatas() {
  return await axios.get("../../public/utils/FeedData.json")
    .then((res) => res.data.feed);
}
export async function fetchStudys() {
  return await axios.get("../../public/utils/FeedData.json")
    .then((res) => res.data.study);
}
export async function fetchGoal() {
  return await axios.get("../../public/utils/FeedData.json")
    .then((res) => res.data.goal);
}
export async function fetchNotice() {
  return await axios.get("../../public/utils/NoticeData.json")
    .then((res) => res.data.notice);
}
export const fetchDocuments = async (collectionName: string): Promise<CardProps[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: CardProps[] = [];

  querySnapshot.forEach((doc) => {
    const Ddata = doc.data();
    data.push({
      id: doc.id,
      img: Ddata.img,
      tag: Ddata.tag,
      title: Ddata.title,
      location: Ddata.location,
    });
  });

  return data;
};
export const fetchFeeds = async (): Promise<CardProps[]> => {
  return fetchDocuments("feeds");
};
export const fetchChals = async (): Promise<CardProps[]> => {
  return fetchDocuments("challenges");
};
export const fetchStudy = async (): Promise<CardProps[]> => {
  return fetchDocuments("studys");
};

export const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const addDocument = async (collectionName: string, formData: Omit<CardProps, "id">): Promise<void> => {
  try {
    const { title, location, img2, tag } = formData;

    let imgUrl = "";
    if (img2) {
      imgUrl = await uploadImage(img2); // 이미지 업로드
    }

    const documentData = {
      title,
      location,
      img: imgUrl,
      tag,
    };

    await addDoc(collection(db, collectionName), documentData);
  } catch (error) {
    console.error(`${collectionName} 추가 실패:`, error);
  }
};
export const addFeed = async (formData: Omit<CardProps, "id">): Promise<void> => {
  await addDocument("feeds", formData);
};
export const addChallenge = async (formData: Omit<CardProps, "id">): Promise<void> => {
  await addDocument("challenges", formData);
};
export const addStudys = async (formData: Omit<CardProps, "id">): Promise<void> => {
  await addDocument("studys", formData);
};
export const getUserBookmarks = async (userId: string): Promise<string[]> => {
  const bookmarksRef = collection(db, 'users', userId, 'bookmarks');
  const snapshot = await getDocs(bookmarksRef);
  const bookmarks: string[] = [];
  snapshot.forEach(doc => bookmarks.push(doc.id));
  return bookmarks;
};

export const addBookmark = async (userId: string, studyId: string) => {
  const bookmarkRef = doc(db, 'users', userId, 'bookmarks', studyId);
  try {
      await setDoc(bookmarkRef, { added: true });
  } catch (error) {
      console.error("Error adding bookmark:", error);
  }
};

// 찜 목록 제거
export const removeBookmark = async (userId: string, studyId: string) => {
  const bookmarkRef = doc(db, 'users', userId, 'bookmarks', studyId);
  try {
      await deleteDoc(bookmarkRef);
  } catch (error) {
      console.error("Error removing bookmark:", error);
  }
};