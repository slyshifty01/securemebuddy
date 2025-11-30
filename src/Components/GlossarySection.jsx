import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

function GlossarySection() {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGlossary() {
      const { data, error } = await supabase
        .from("glossary")
        .select("*")
        .order("term", { ascending: true });

      if (error) {
        console.error("Error loading glossary:", error);
      } else {
        setTerms(data);
      }

      setLoading(false);
    }

    loadGlossary();
  }, []);

  if (loading) return <p className="fade-in">Loading glossary…</p>;

  return (
    <section className="fade-in">
      <h2>Glossary</h2>
      <p>Simple explanations of tech & cybersecurity terms.</p>

      <div className="glossary-list">
        {terms.map((item) => (
          <article key={item.id} className="glossary-item">
            <h3>{item.term}</h3>
            <p>{item.definition}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GlossarySection;
