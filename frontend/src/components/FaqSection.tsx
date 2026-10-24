import { FaqItem } from "../types/FaqItem";
import { FaqAccordionItem } from "./FaqAccordionItem";

interface FaqSectionProperties {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProperties) {
  return (
    <section
      id="faq"
      style={{
        maxWidth: "var(--max-width-page)",
        margin: "0 auto",
        padding: "var(--space-eight) var(--space-six)",
        marginBottom: "var(--space-nine)",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ marginBottom: "var(--space-six)" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: "var(--colour-accent)",
            display: "block",
            marginBottom: "var(--space-two)"
          }}
        >
          02 / KNOWLEDGE
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--colour-text-primary)",
            lineHeight: 1.15
          }}
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div
        style={{
          backgroundColor: "var(--colour-surface)",
          border: "1px solid var(--colour-border-subtle)",
          borderRadius: "var(--radius-medium)",
          padding: "var(--space-six) var(--space-seven)"
        }}
      >
        {items.map((item) => (
          <FaqAccordionItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
