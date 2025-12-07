/*********************************************************************************
 *  WEB422 – Assignment 3
 *  Name: Abdullah Hussain
 *  Student ID: 118095225
 *  Date: 10th November 2025
 *********************************************************************************/

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
                            {/* Simple: show the workId as a link to details page */}
                            <Link href={`/works/${id}`}>{id}</Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
}
