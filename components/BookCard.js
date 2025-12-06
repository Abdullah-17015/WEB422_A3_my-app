import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function BookCard({ workId }) {
    const { data, error } = useSWR(
        `https://openlibrary.org/works/${workId}.json`
    );

    if (error || !data) return <Error statusCode={404} />;

    return (
        <Card>
            <Card.Img
                variant="top"
                src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
                onError={(e) => {
                    e.target.src = "https://placehold.co/300x450?text=No+Cover";
                }}
            />

            <Card.Body>
                <Card.Title>{data.title}</Card.Title>

                <Link href={`/works/${workId}`} passHref legacyBehavior>
                    <Button variant="primary">View</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}
