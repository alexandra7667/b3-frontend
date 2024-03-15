import "./index.css";

export default function Header() {
    const appTitle = "Bob's Bodybuilding"

    return (
      <header className="header">
        <h1 className="title">{appTitle}</h1>
      </header>
    );
}