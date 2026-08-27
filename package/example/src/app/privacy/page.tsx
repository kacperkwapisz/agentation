import type { Metadata } from "next";
import { Footer } from "../Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Agentation",
  description: "How the Agentation Chrome extension handles data.",
};

export default function PrivacyPage() {
  return (
    <>
      <article className="article">
        <header>
          <h1>Privacy Policy</h1>
          <p className="tagline">How the Agentation Chrome extension handles data</p>
        </header>

        <section>
          <p>
            Last updated: August 28, 2026
          </p>
          <p>
            Agentation is a visual feedback tool for AI coding agents. This policy
            covers the Chrome extension published at the Chrome Web Store.
          </p>
        </section>

        <section>
          <h2 id="what-we-collect">What we collect</h2>
          <p>
            The extension does not collect personal information. It does not
            include analytics, advertising, crash reporting, or any remote
            telemetry. We do not operate a backend that receives data from the
            extension.
          </p>
        </section>

        <section>
          <h2 id="where-data-lives">Where data lives</h2>
          <p>
            The extension only runs on local development pages (
            <code>localhost</code> and <code>127.0.0.1</code>). Annotations you
            create are stored in that page&apos;s <code>localStorage</code>, on
            your machine.
          </p>
          <p>
            If you are running the optional Agentation MCP server locally, the
            extension may send annotation data to{" "}
            <code>http://localhost:4747</code>. That server runs on your
            computer. Nothing is sent to Agentation or any third party.
          </p>
        </section>

        <section>
          <h2 id="permissions">Permissions</h2>
          <p>
            Host access is limited to local development URLs so the toolbar can
            appear on your own projects and, if present, talk to a local MCP
            server. The extension cannot read or change other websites.
          </p>
        </section>

        <section>
          <h2 id="clipboard">Clipboard</h2>
          <p>
            When you copy structured feedback from the toolbar, that text is
            written to your clipboard at your request. It is not transmitted
            anywhere else by the extension.
          </p>
        </section>

        <section>
          <h2 id="changes">Changes</h2>
          <p>
            If this policy changes, we will update this page and the date above.
          </p>
        </section>

        <section>
          <h2 id="contact">Contact</h2>
          <p>
            Questions:{" "}
            <a
              href="https://github.com/kacperkwapisz/agentation/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              open an issue on GitHub
            </a>
            .
          </p>
        </section>
      </article>
      <Footer />
    </>
  );
}
