import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import { authenticateUser } from "@/lib/authenticate";

export default function Login() {
    // Controlled component state
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");

    const router = useRouter();

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        setWarning("");

        try {
            // authenticateUser(userName, password) from lib/authenticate.js
            await authenticateUser(user, password);


            const from = router.query.from || "/favourites";
            router.push(from);
        } catch (err) {
            // Show error message from authenticateUser
            setWarning(err.message || "Unable to login");
        }
    }

    return (
        <>
            <PageHeader text="Login" />

            <Card bg="light">
                <Card.Body>
                    <h2>Login</h2>
                    <p>Enter your login information below:</p>
                </Card.Body>
            </Card>

            <br />

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>User:</Form.Label>
                    <Form.Control
                        type="text"
                        id="userName"
                        name="userName"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {warning && (
                    <>
                        <Alert variant="danger">{warning}</Alert>
                        <br />
                    </>
                )}

                <Button variant="primary" className="pull-right" type="submit">
                    Login
                </Button>
            </Form>
        </>
    );
}
