import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

function GuidesSection() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGuides() {
      const { data, error } = await supabase
        .from("how_to_guides")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading guides:", error);
      } else {
        setGuides(data || []);
      }

      setLoading(false);
    }

    loadGuides();
  }, []);

  if (loading) return <p>Loading guides...</p>;

  return (
    <section className="fade-in">
      <h2>How-To Guides</h2>
      <p>Step-by-step instructions to help you lock down your accounts and devices.</p>

      {guides.length === 0 ? (
        <p>No guides yet. You can add them later in Supabase (how_to_guides table).</p>
      ) : (
        <div className="card-grid">
          {guides.map((guide) => {
            let steps = [];
            if (guide.steps) {
              try {
                steps = Array.isArray(guide.steps)
                  ? guide.steps
                  : JSON.parse(guide.steps);
              } catch {
                steps = [];
              }
            }

            return (
              <article key={guide.id} className="card">
                <h3>{guide.title}</h3>
                {guide.category && <p className="tag">{guide.category}</p>}
                {guide.difficulty && (
                  <p>
                    <strong>Level:</strong> {guide.difficulty}
                  </p>
                )}

                {steps.length > 0 ? (
                  <ol>
                    {steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p>Steps coming soon.</p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default GuidesSection;
