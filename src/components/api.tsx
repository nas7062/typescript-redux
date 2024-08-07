import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDocs, runTransaction, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import { CardProps } from '../components/Card';


export async function fetchDatas() {
  return await axios.get("/utils/FeedData.json")
    .then((res) => res.data.feed);
}
export async function fetchStudys() {
  return await axios.get("/utils/FeedData.json")
    .then((res) => res.data.study);
}
export async function fetchGoal() {
  return await axios.get("/utils/FeedData.json")
    .then((res) => res.data.goal);
}
export async function fetchNotice() {
  return await axios.get("/utils/NoticeData.json")
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
}; // Firestore에서 컬렉션의 문서를 가져오는 함수
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
}; // 이미지를 Firebase Storage에 업로드하고 URL을 반환하는 함수

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
}; // Firestore에 문서를 추가하는 함수 
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
}; // 사용자의 북마크된 문서 ID 목록을 가져오는 함수

export const addBookmark = async (userId: string, studyId: string) => {
  const bookmarkRef = doc(db, 'users', userId, 'bookmarks', studyId);
  try {
    await setDoc(bookmarkRef, { added: true });
  } catch (error) {
    console.error("Error add bookmark:");
  }
}; // 북마크 추가


export const removeBookmark = async (userId: string, studyId: string) => {
  const bookmarkRef = doc(db, 'users', userId, 'bookmarks', studyId);
  try {
    await deleteDoc(bookmarkRef);
  } catch (error) {
    console.error("Error remove bookmark:");
  }
}; // 북마크 목록 제거

export const addStudyParticipation = async (userId: string, studyId: string, title: string) => {
  const participationRef = doc(db, 'users', userId, 'participations', studyId);

  try {
    await runTransaction(db, async (transaction) => {
      transaction.set(participationRef, { joined: true, title });
    });
    console.log(`Successfully  ${userId} in study ${studyId}`);
  } catch (error) {
    console.error("Error adding study participation:");
  }
};

export const removeStudyParticipation = async (userId: string, studyId: string) => {
  const participationRef = doc(db, 'users', userId, 'participations', studyId);
  try {
    await deleteDoc(participationRef);

  } catch (error) {
    console.error("Error removing study participation:");
  }
};
export const getUserParticipations = async (userId: string) => {
  const participationsRef = collection(db, 'users', userId, 'participations');
  const snapshot = await getDocs(participationsRef);

  const participations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Participations:", participations);

  return participations;
};

export const addGoalParticipation = async (userId: string, studyId: string, title: string) => {
  const participationRef = doc(db, 'users', userId, 'goalparticipations', studyId);

  try {
    await runTransaction(db, async (transaction) => {
      transaction.set(participationRef, { joined: true, title });
    });
  } catch (error) {
    console.error("Error adding study participation:");
  }
};

export const removeGoalParticipation = async (userId: string, studyId: string) => {
  const participationRef = doc(db, 'users', userId, 'goalparticipations', studyId);
  try {
    await deleteDoc(participationRef);

  } catch (error) {
    console.error("Error removing study participation:");
  }
};

export const getUserGoalParticipations = async (userId: string) => {
  const participationsRef = collection(db, 'users', userId, 'goalparticipations');
  const snapshot = await getDocs(participationsRef);

  const goalparticipations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return goalparticipations;
};  