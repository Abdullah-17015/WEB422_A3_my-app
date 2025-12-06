import Link from "next/link";
import Card from "react-bootstrap/Card";
import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";

export async function getStaticProps() {
    const res = await fetch("https://openlibrary.org/works/OL453657W.json");
    const data = await res.json();

    return { props: { book: data } };
}

export default function About({ book }) {
    return (
        <>
            <PageHeader text="About the Developer - Abdullah Hussain" />

            <p>
                I am Abdullah Hussain, a dedicated software development student who is
                continually striving to deepen my understanding of modern web technologies
                and full stack application development. Over the past year, I have developed
                a strong interest in creating clean, user-friendly digital experiences and
                learning how real world systems communicate through APIs and state
                management. What excites me most about programming is the ability to
                transform ideas into functional and interactive solutions that can actually
                help people. As I progress through this program, I have become more
                confident in working with tools like React, Next.js, Express, and various
                cloud services, and I enjoy the challenge of breaking down complex problems
                into smaller, manageable components. Beyond the technical side, I am
                passionate about continuous improvement whether it’s refining my code,
                learning a new library, or understanding best practices that make
                applications more efficient and scalable. Each assignment provides an
                opportunity to grow, experiment, and move one step closer to becoming a
                capable full-stack developer. My goal is to eventually build real-world
                applications that combine strong functionality with polished user
                experience, and to continue developing my skills in both frontend and
                backend architecture. This page highlights one of my favourite books and
                reflects my belief that creativity, curiosity, and strong fundamentals form
                the foundation of great software development.
            </p>

            <p>
                The featured book below is one of my favourites.
            </p>

            <BookDetails
                book={book}
                workId="OL453657W"
                showFavouriteBtn={false}
            />
        </>
    );
}
