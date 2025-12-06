/*********************************************************************************
 *  WEB422 – Assignment 3
 *  Name: Abdullah Hussain
 *  Student ID: 118095225
 *  Date: 10th November 2025
 *********************************************************************************/

import { useState } from "react";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "@/lib/authenticate";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [warning, setWarning] = useState("");

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setWarning("");

        try {
            // call our API helper
            await registerUser(userName, password, password2);

            // if successful, send the user to the login page
            router.push("/login");
        } catch (err) {
            // show error from API
            setWarning(err.message || String(err));
        }
    }

    return (
        <>
            {/* single page header */}
            <PageHeader text="Register" />

            <Card>
                <Card.Body>
                    <Card.Title>Create your account</Card.Title>
                    <Card.Text>Enter your information below:</Card.Text>

                    {warning && (
                        <>
                            <br />
                            <Alert variant="danger">{warning}</Alert>
                        </>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>User:</Form.Label>
                            <Form.Control
                                type="text"
                                name="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password2"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
