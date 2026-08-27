export function Footer() {
  return (
    <footer className="footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20 }}>
      <p>
        Made by{" "}
        <a
          href="https://x.com/benjitaylor"
          target="_blank"
          rel="noopener noreferrer"
        >
          Benji Taylor
        </a>
        ,{" "}
        <a
          href="https://x.com/seldom"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dennis Jin
        </a>
        , and{" "}
        <a
          href="https://x.com/alexvanderzon"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alex Vanderzon
        </a>
      </p>
      <span style={{ display: "flex", gap: 16 }}>
        <a href="/privacy">Privacy</a>
        <a href="/colophon">Colophon</a>
      </span>
    </footer>
  );
}
