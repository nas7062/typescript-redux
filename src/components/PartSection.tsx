import Card, { CardProps } from "./Card";
import { useQuery } from '@tanstack/react-query';
import { fetchDatas } from "./api";
import SectionLayout from "./SectionLayout";
import { Link } from "react-router-dom";

const PartSection = () => {
    const { data } = useQuery<CardProps[]>({ queryKey: ["data"], queryFn: fetchDatas });
    return (
        <SectionLayout title="피드" subtitle="나의 일상을 피드에 작성해보아요!" link="/feed" >
            {Array.isArray(data) &&
                data.slice(0, 4).map((item: CardProps) =>
                    <Link to={`/feed/${item.id}`}>
                        <Card key={item.id} {...item} />
                    </Link>)}
        </SectionLayout>
    );


}
export default PartSection;