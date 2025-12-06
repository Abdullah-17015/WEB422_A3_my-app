import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

import { Button, Container, Row, Col } from "react-bootstrap";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    // Default to false (assignment instruction)
    const [showAdded, setShowAdded] = useState(false);

    // Keep showAdded in sync with favourites list from API
    useEffect(() => {
        if (favouritesList && workId) {
            setShowAdded(favouritesList.includes(workId));
        }
    }, [favouritesList, workId]);

    // Make this async and use the API
    async function favouritesClicked() {
        try {
            if (showAdded) {
                // It IS in favourites: remove it using API
                const updated = await removeFromFavourites(workId);
                setFavouritesList(updated);
            } else {
                // It is NOT in favourites: add it using API
                const updated = await addToFavourites(workId);
                setFavouritesList(updated);
            }
        } catch (err) {
            console.error("Error updating favourites:", err.message || err);
        }
    }

    return (
        <Container>
            <Row>
                <Col lg="4">
                    <img
                        className="img-fluid w-100"
                        src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
                        alt="Cover Image"
                        onError={(e) => {
                            e.target.src = "https://placehold.co/400x600?text=No+Cover";
                        }}
                    />
                    <br />
                    <br />
                </Col>

                <Col lg="8">
                    {showFavouriteBtn && (
                        <Button
                            onClick={favouritesClicked}
                            variant={showAdded ? "primary" : "outline-primary"}
                        >
                            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                        </Button>
                    )}

                    <br />
                    <br />

                    <h3>{book.title}</h3>

                    {book.description && (
                        <p>
                            {typeof book.description === "string"
                                ? book.description
                                : book.description.value}
                        </p>
                    )}

                    <br />

                    {book.subject_people && (
                        <>
                            <h5>Characters</h5>
                            {book.subject_people.join(", ")}
                            <br />
                            <br />
                        </>
                    )}

                    {book.subject_places && (
                        <>
                            <h5>Settings</h5>
                            {book.subject_places.join(", ")}
                            <br />
                            <br />
                        </>
                    )}

                    {book.links && (
                        <>
                            <h5>More Information</h5>
                            {book.links.map((l, idx) => (
                                <div key={idx}>
                                    <a href={l.url} target="_blank" rel="noreferrer">
                                        {l.title}
                                    </a>
                                </div>
                            ))}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
