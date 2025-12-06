/*********************************************************************************
 *  WEB422 – Assignment 3
 *  Name: Abdullah Hussain
 *  Student ID: 118095225
 *  Date: (set date)
 *********************************************************************************/

import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
    const router = useRouter();

    // get the decoded token (if present)
    let token;
    if (typeof window !== "undefined") {
        token = readToken(); // { userName: "...", ... } or null
    }

    function logout() {
        removeToken();
        router.push("/login");
    }

    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} href="/">
                    Books App {token && <> – Welcome {token.userName}</>}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} href="/search">
                            Search
                        </Nav.Link>

                        {token && (
                            <>
                                <Nav.Link as={Link} href="/favourites">
                                    Favourites
                                </Nav.Link>
                                <Nav.Link as={Link} href="/history">
                                    History
                                </Nav.Link>
                            </>
                        )}
                    </Nav>

                    <Nav className="ms-auto">
                        {!token && (
                            <>
                                <Nav.Link as={Link} href="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} href="/register">
                                    Register
                                </Nav.Link>
                            </>
                        )}

                        {token && (
                            <Nav.Link onClick={logout}>
                                Logout
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
