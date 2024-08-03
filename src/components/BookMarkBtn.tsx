import React from "react";
import useBookmark from "./useBookmark"; // 훅 파일 경로를 적절히 수정하세요.

interface BookmarkToggleButtonProps {
    userId: string | undefined;
    studyId: string;
}

const BookMarkBtn: React.FC<BookmarkToggleButtonProps> = ({ userId, studyId }) => {
    const { isBookmarked, toggleBookmark } = useBookmark(userId, studyId);

    return (
        <button onClick={toggleBookmark}>
            {isBookmarked ? '찜 취소하기' : '찜하기'}
        </button>
    );
};

export default BookMarkBtn;
