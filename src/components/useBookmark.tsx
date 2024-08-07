import { useState, useEffect } from "react";
import { getUserBookmarks, addBookmark, removeBookmark } from "./api";
// useBookmark Hook : 사용자가 특정 스터디를 북마크했는지 확인하고 북마크 상태를 관리하는 함수
const useBookmark = (userId: string | undefined, studyId: string | undefined) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    useEffect(() => {
        const checkIfBookmarked = async () => {
            if (userId && studyId) {
                try {
                    const bookmarks = await getUserBookmarks(userId);
                    setIsBookmarked(bookmarks.includes(studyId)); // 해당 id가 북마크되어 있는지 확인하고 상태 업데이트
                } catch (error) {
                    console.error("Error checking bookmarks:", error);
                }
            }
        };

        checkIfBookmarked();
    }, [userId, studyId]);

    const toggleBookmark = async () => {
        if (userId && studyId) {
            if (isBookmarked) {
                await removeBookmark(userId, studyId);
            } else {
                await addBookmark(userId, studyId);
            }
            setIsBookmarked(!isBookmarked);
        }
    };

    return { isBookmarked, toggleBookmark };
};

export default useBookmark;
