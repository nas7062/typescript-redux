import Card, { CardProps } from "./Card";
import { useQuery } from '@tanstack/react-query';
import { fetchGoal } from "./api";
import SectionLayout from "./SectionLayout";
import { Link } from "react-router-dom";

const GoalSection = () => {
    const { data } = useQuery<CardProps[]>({ queryKey: ["goal"], queryFn: fetchGoal });
    return (
        <SectionLayout title="챌린지" subtitle="새로운 사람들과 함께 어려운 챌린지에 도전해봐요!" link="/ch" >
            {Array.isArray(data) &&
                data.slice(0,4).map((item: CardProps) => 
                    <Link to={`/chal/${item.id}`}>
                <Card key={item.id} {...item} />
                </Link>
                )}
        </SectionLayout>
    );

}
export default GoalSection;