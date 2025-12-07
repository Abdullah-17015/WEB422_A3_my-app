import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ListGroup } from "react-bootstrap";

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    if (!favouritesList) return null;

    return (
        <>
            <PageHeader text="Favourites" />

            {favouritesList.length === 0 ? (
                <p>Nothing here.</p>
            ) : (
                <ListGroup>
                    {favouritesList.map((id) => (
                        <ListGroup.Item key={id}>
                            { }
                            <Link href={`/works/${id}`}>{id}</Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
}
