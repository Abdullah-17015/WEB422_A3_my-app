import { useRouter } from "next/router";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { Container, Table, Pagination } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);


  const queryString = new URLSearchParams(router.query).toString();

  const { data, error, isLoading } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
      : null,
    fetcher
  );

  useEffect(() => {
    if (data?.docs) {
      setPageData(data.docs);
    } else {
      setPageData([]);
    }
  }, [data]);


  const subtext =
    Object.keys(router.query).length > 0
      ? Object.entries(router.query)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ")
      : "Use the search form to find books.";

  return (
    <Container className="my-5">
      <PageHeader text="Search Results" subtext={subtext} />

      {error && <p className="text-danger">Error loading results.</p>}
      {isLoading && <p>Loading results…</p>}

      {!isLoading && pageData.length === 0 && (
        <p>No results found. Try adjusting your search.</p>
      )}

      {pageData.length > 0 && (
        <>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author(s)</th>
                <th>First Published</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((book, idx) => (
                <tr
                  key={`${book.key}-${idx}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(book.key)}
                >
                  <td>{book.title || "Untitled"}</td>
                  <td>
                    {book.author_name
                      ? book.author_name.join(", ")
                      : "Unknown"}
                  </td>
                  <td>{book.first_publish_year || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="justify-content-center">
            <Pagination.Prev
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next
              onClick={() => setPage((p) => p + 1)}
              disabled={!data || !data.docs || data.docs.length === 0}
            />
          </Pagination>
        </>
      )}
    </Container>
  );
}
