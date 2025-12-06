/********************************************************************************
*  WEB422 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Abdullah Hussain Student ID: 119895225 Date: 10th November 2025
*
* 
*
********************************************************************************/import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    function submitForm(data) {
        const query = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== "")
        );

        router.push({
            pathname: "/books",
            query
        });
    }

    return (
        <Container className="my-5">

            {/* HERO / HEADER */}
            <div className="hero-search text-center mb-5 p-5 rounded-3 shadow-sm">
                <h1 className="display-5 fw-semibold text-primary mb-3">
                    Search for Books
                </h1>
                <p className="lead text-muted mb-0">
                    Browse the extensive collection of books available on openlibrary.org.
                </p>
            </div>

            {/* SEARCH FORM */}
            <Form onSubmit={handleSubmit(submitForm)}>

                {/* Author (full width, required) */}
                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter author"
                                {...register("author", { required: true })}
                                className={errors.author ? "is-invalid" : ""}
                            />
                            {errors.author && (
                                <div className="invalid-feedback">
                                    Author is required.
                                </div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                {/* Title + Subject */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                {...register("title")}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Subject (contains)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter subject keyword"
                                {...register("subject")}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Language + Year */}
                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Language Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter language code (e.g. eng)"
                                {...register("language")}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>First Published (Year)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter published year"
                                {...register("first_publish_year")}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Big gradient button */}
                <Button
                    type="submit"
                    size="lg"
                    className="w-100 py-3 btn-gradient"
                >
                    Search
                </Button>
            </Form>
        </Container>
    );
}
