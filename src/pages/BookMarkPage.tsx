import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchChals, fetchGoal, fetchStudy, getUserBookmarks } from "../components/api";
import { fetchStudys } from "../components/api";
import styled from "styled-components";
import { auth } from '../firebaseConfig';
import { CardProps } from "../components/Card";
import Header from "../components/Header";

const Container = styled.div`
    width: 400px;
    margin: 0 auto;
    padding: 20px;
`;

const Card = styled.div`
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);

    h3 {
        color:red;
    }
`;

const BookMarkPage: React.FC = () => {
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    const { data: studies = [] } = useQuery<CardProps[]>({
        queryKey: ["study"],
        queryFn: fetchStudys,
        placeholderData: [] // 데이터 로드 전 임시로 빈 배열을 사용
    });
    const { data: studys = [] } = useQuery<CardProps[]>({
        queryKey: ["studys"],
        queryFn: fetchStudy,
        placeholderData: []
    });

    const { data: goals = [] } = useQuery<CardProps[]>({
        queryKey: ["goal"],
        queryFn: fetchGoal,
        placeholderData: []
    });
    const { data: chals = [] } = useQuery<CardProps[]>({
        queryKey: ["challenges"],
        queryFn: fetchChals,
        placeholderData: []
    });
    useEffect(() => {

        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
        }
    }, []);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (userId) {
                const bookmarkedItems = await getUserBookmarks(userId); // 사용자의 북마크된 항목을 가져옴
                setBookmarks(bookmarkedItems); // 가져온 북마크 항목을 상태에 저장
            }
        };

        fetchBookmarks(); // 북마크 데이터를 가져오는 함수 호출
    }, [userId]);

    const bookmarkedItems = [
        ...studies.filter(study => bookmarks.includes(study.id.toString())),
        ...chals.filter(chal => bookmarks.includes(chal.id.toString())),
        ...goals.filter(goal => bookmarks.includes(goal.id.toString())),
        ...studys.filter(st => bookmarks.includes(st.id.toString())),
    ];
    return (
        <>
            <Header />
            <Container>
                <h1>찜한 항목들</h1>
                {bookmarkedItems.length === 0 ? (
                    <p>찜한 항목이 없습니다.</p>
                ) : (
                    bookmarkedItems.map(study => (
                        <Card key={study.id}>
                            <img src={study.img} alt={study.title} style={{ width: '100%', borderRadius: '10px' }} />
                            <h2>{study.title}</h2>
                            <p>{study.location}</p>
                            <Link to={`/study/${study.id}`}><h3>상세보기</h3></Link>
                        </Card>
                    ))
                )}
            </Container>
        </>
    );
};

export default BookMarkPage;
