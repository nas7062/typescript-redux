import Card, { CardProps } from "./Card";
import { useQuery } from '@tanstack/react-query';
import { fetchDatas } from "./api";
import SectionLayout from "./SectionLayout";

const PartSection = () => {
    const { data } = useQuery<CardProps[]>({ queryKey: ["data"], queryFn: fetchDatas });
    return (
        <SectionLayout title="피드" subtitle="나의 일상을 피드에 작성해보아요!" link="/feed">
            {Array.isArray(data) &&
                data.slice(0,4).map((item: CardProps) => <Card key={item.id} {...item} />)}
        </SectionLayout>
    );


}
export default PartSection;