import { Card } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
    return (
        <Card className="bg-light mb-4 p-3">
            <h2>{text}</h2>
            {subtext && <p className="text-muted">{subtext}</p>}
        </Card>
    );
}
