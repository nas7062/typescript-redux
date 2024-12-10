import { useState } from "react";
import FeedList from "../components/FeedList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";
import { CardProps } from "../components/Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFeeds, addFeed, uploadImage } from "../components/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
const FeedSec = styled.div`
    
    h2{
        text-align:center;
    }
    button {
         box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
         background-color:#2CE0BC;
         color:white;
         font-weight:600;
         position:relative;
         left:70%;
         margin-bottom:80px;
    }
`
const FormContainer = styled.div`
    margin: 20px auto;
    padding: 20px;
    width: 600px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
     @media (max-width: 668px) {

        button {
            left:250px;
        }
    }
    `;

const FormGroup = styled.div`
    margin-bottom: 15px;
    label {
        display: block;
        font-weight: 600;
        margin-bottom: 5px;
    }
    input,
    textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    @media (max-width: 668px) {

        input,
    textarea {
            width: 70%;
        }
    }
`
// Omit 사용 CardProps 타입에서 id 속성을 제외한 새로운 타입을 생성합니다.
const Feed = () => {
    const [isFormVisible, setFormVisible] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Omit<CardProps, 'id'> & { img2: File | undefined }>({
        img: "", //이미지 주소
        img2: undefined, //파일객체
        tag: [],
        title: "",
        location: "",
    });

    const queryClient = useQueryClient();

    const { data } = useQuery<CardProps[]>({
        queryKey: ["feeds"],
        queryFn: fetchFeeds,
    });


    const mutation = useMutation({
        mutationFn: async () => {
            try {
                if (formData.img2) {
                    const imgUrl = await uploadImage(formData.img2);
                    await addFeed({ ...formData, img: imgUrl });
                } else {
                    throw new Error("No image selected");
                }

            } catch (error) {
                console.error("Failed to upload image or add feed:", error);
                throw new Error("Failed to upload image or add feed.");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            setFormData({ ...formData, img2: undefined, tag: [], title: "", location: "" });
            setFormVisible(false);
        },
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const OnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, img2: file });
        }
    };
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!user) {
            const p = confirm('로그인이 필요합니다 로그인 페이지로 이동 하시겠습니까?');
            if (p) {
                navigate('/login');
            }
            else
                return;
        }
        e.preventDefault();
        try {
            await mutation.mutateAsync();

        } catch (error) {
            console.error("Failed to submit form:", error);
        }
    };
    return (
        <>
            <Header />
            <FeedSec>
                <h2>피드</h2>
                <button onClick={() => setFormVisible(!isFormVisible)}>피드 작성하기</button>
                {isFormVisible && (
                    <FormContainer>
                        <form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <label htmlFor="title">제목</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="location">위치</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="img">이미지 </label>
                                <input
                                    type="file"
                                    id="img"
                                    name="img"
                                    onChange={OnFileChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="tag">태그 (쉼표로 구분)</label>
                                <input
                                    type="text"
                                    id="tag"
                                    name="tag"
                                    value={formData.tag.join(",")}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            tag: e.target.value.split(",").map((tag) => tag.trim()),
                                        })
                                    }
                                    required
                                />
                            </FormGroup>
                            <button type="submit">제출</button>
                        </form>
                    </FormContainer>
                )}
                <FeedList feeds={data || []} />
            </FeedSec>
            <Footer />
        </>
    );
}

export default Feed;