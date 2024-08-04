import Card, { CardProps } from "./Card";
import { useQuery } from '@tanstack/react-query';
import { fetchStudys } from "./api";
import SectionLayout from "./SectionLayout";
import { Link } from "react-router-dom";

const StudySection = () => {
    const { data } = useQuery<CardProps[]>({ queryKey: ["study"], queryFn: fetchStudys });
    return (
        <SectionLayout title="스터디" subtitle="같이 공부하는 스터디를 구성해봐요!" link="/study">
            {Array.isArray(data) &&
                data.slice(0,4).map((item: CardProps) => 
                    <Link to={`/study/${item.id}`}>
                <Card key={item.id} {...item} />
                </Link>
                )}
        </SectionLayout>
    );

}
export default StudySection;