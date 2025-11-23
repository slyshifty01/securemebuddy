import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ScamReportsSection() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      const { data, error } = await supabase
        .from("scam_reports")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase error loading scam reports:", error);
      } else {
        setReports(data);
      }

      setLoading(false);
    }

    loadReports();
  }, []);

  if (loading) return <p className="fade-in">Loading scam reports…</p>;

  return (
    <section className="fade-in">
      <h2>Scam Reports</h2>
      <p>Recent scam alerts and reports collected to help keep you safe.</p>

      <div className="scam-report-list">
        {reports.length === 0 && (
          <p>No scam reports available yet.</p>
        )}

        {reports.map((report) => (
          <article key={report.id} className="scam-report-card">
            <h3>{report.title}</h3>
            <p className="tag">{report.category}</p>

            {report.date && (
              <p>
                <strong>Date:</strong> {report.date}
              </p>
            )}

            <p>
              <strong>Summary:</strong> {report.summary}
            </p>

            <details>
              <summary>View full details</summary>
              <p>{report.details}</p>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ScamReportsSection;
