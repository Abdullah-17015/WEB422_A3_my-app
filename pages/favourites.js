import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import { Row, Col } from "react-bootstrap";
import BookCard from "@/components/BookCard";

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    if (favouritesList.length === 0) {
        return (
            <PageHeader text="Nothing Here" subtext="Try adding some favourites." />
        );
    }

    return (
        <>
            <PageHeader text="Favourites" subtext="Your saved books" />

            <Row className="gy-4">
                {favouritesList.map(workId => (
                    <Col key={workId} lg={3} md={4} sm={6}>
                        <BookCard workId={workId} />
                    </Col>
                ))}
            </Row>
        </>
    );
}
