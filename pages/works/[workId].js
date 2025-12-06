// pages/works/[workId].js

import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import BookDetails from "@/components/BookDetails";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function WorkDetailsPage() {
    const router = useRouter();
    const { workId } = router.query;

    // Don't fetch until we actually have the workId from the URL
    const { data, error } = useSWR(
        workId ? `https://openlibrary.org/works/${workId}.json` : null,
        fetcher
    );

    if (error) return <Error statusCode={404} />;
    if (!data) return null; // loading state

    return <BookDetails book={data} workId={workId} />;
}
