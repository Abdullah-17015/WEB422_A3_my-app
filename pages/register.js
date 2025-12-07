import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/lib/authenticate";
import PageHeader from "@/components/PageHeader";
import { Form, Button, Alert } from "react-bootstrap";

export default function Register() {
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [warning, setWarning] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setWarning(null);

        try {
            await registerUser(userName, password, password2);
            router.push("/login");
        } catch (err) {
            setWarning(err.message || "Registration failed");
        }
    }

    return (
        <>
            <PageHeader text="Register" />
            <h4>Register for an account:</h4>
            <br />

            {warning && <Alert variant="danger">{warning}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </>
    );
}
