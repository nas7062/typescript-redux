import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUserBookmarks } from "../components/api";
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
                const bookmarkedItems = await getUserBookmarks(userId);
                setBookmarks(bookmarkedItems);
            }
        };

        fetchBookmarks();
    }, [userId]);

    const bookmarkedStudyIds = new Set(bookmarks);
    const bookmarkedStudies = studies.filter(study => bookmarkedStudyIds.has(study.id.toString())) || [];

 
    return (
        <>
        <Header/>
        <Container>
            <h1>찜한 항목들</h1>
            {bookmarkedStudies.length === 0 ? (
                <p>찜한 항목이 없습니다.</p>
            ) : (
                bookmarkedStudies.map(study => (
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
