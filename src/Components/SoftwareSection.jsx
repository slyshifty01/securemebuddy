import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

function SoftwareSection() {
  const [software, setSoftware] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSoftware() {
      const { data, error } = await supabase
        .from("software_recommendations")
        .select("*")
        .order("category", { ascending: true });

      if (error) {
        console.error("Error loading software recommendations:", error);
      } else {
        setSoftware(data || []);
      }

      setLoading(false);
    }

    loadSoftware();
  }, []);

  if (loading) return <p>Loading software recommendations...</p>;

  return (
    <section className="fade-in">
      <h2>Recommended Software & Tools</h2>
      <p>
        These are tools you may choose to use to help protect your accounts,
        devices, and privacy. Always choose what fits your comfort level and budget.
      </p>

      {software.length === 0 ? (
        <p>
          No software has been added yet. You can manage this list later in Supabase
          (software_recommendations table).
        </p>
      ) : (
        <div className="card-grid">
          {software.map((item) => (
            <article key={item.id} className="card">
              <h3>{item.name}</h3>
              <p className="tag">{item.category}</p>
              <p>{item.description}</p>
              {item.affiliate_link && (
                <p>
                  <a
                    href={item.affiliate_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default SoftwareSection;
