import { useState, useEffect } from "react";
import { getUserBookmarks, addBookmark, removeBookmark } from "./api";

const useBookmark = (userId: string | undefined, studyId: string | undefined) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    useEffect(() => {
        const checkIfBookmarked = async () => {
            if (userId && studyId) {
                try {
                    const bookmarks = await getUserBookmarks(userId);
                    setIsBookmarked(bookmarks.includes(studyId));
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
