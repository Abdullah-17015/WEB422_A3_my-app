/*********************************************************************************
 *  WEB422 – Assignment 3
 *  Name: Abdullah Hussain
 *  Student ID: 118095225
 *  Date: (set date)
 *********************************************************************************/

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { isAuthenticated, readToken, removeToken } from "@/lib/authenticate";


export default function MainNav() {
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setMounted(true);
        const t = readToken();
        setToken(t);
    }, []);

    function logout() {
        removeToken();
        setToken(null);
        router.push("/login");
    }

    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} href="/">
                    { }
                    Abdullah Hussain{" "}
                    {mounted && token && (
                        <>
                            – Welcome {token.userName}
                        </>
                    )}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/about">
                            About
                        </Nav.Link>
                        <Nav.Link as={Link} href="/search">
                            Search
                        </Nav.Link>
                        <Nav.Link as={Link} href="/favourites">
                            Favourites
                        </Nav.Link>

                    </Nav>

                    <Nav>
                        {!mounted || !token ? (
                            <>
                                <Nav.Link as={Link} href="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} href="/register">
                                    Register
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
