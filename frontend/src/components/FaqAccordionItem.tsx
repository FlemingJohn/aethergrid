import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaqItem } from "../types/FaqItem";

interface FaqAccordionItemProperties {
  item: FaqItem;
}

export function FaqAccordionItem({ item }: FaqAccordionItemProperties) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleToggle() {
    setIsOpen((previous) => !previous);
  }

  return (
    <div
      style={{
        borderBottom: "1px solid var(--colour-border-subtle)",
        padding: "var(--space-five) 0"
      }}
    >
      <button
        onClick={handleToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "transparent",
          color: "var(--colour-text-primary)",
          fontSize: "1.125rem",
          fontWeight: 600,
          textAlign: "left"
        }}
      >
        <span>{item.question}</span>
        <span style={{ color: "var(--colour-accent)", display: "flex", alignItems: "center" }}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      {isOpen && (
        <div style={{ marginTop: "var(--space-three)", color: "var(--colour-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}
