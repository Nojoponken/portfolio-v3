import "./CollapsibleSection.css";
import { useState } from "react";

function CollapsibleSection({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={
          expanded ? "collapsible-body collapsible-expanded" : "collapsible-body"
        }
      >
        {children}
        <div className="collapsible-fade" />
      </div>
      <button
        className="collapsible-toggle"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </>
  );
}

export default CollapsibleSection;
