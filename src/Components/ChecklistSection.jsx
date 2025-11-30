
function ChecklistSection({ items = [] }) {
  return (
    <section className="fade-in">
      <h2>Checklists</h2>

      <div className="card-grid">
        {(items ?? []).map((item) => (
          <article key={item.id} className="card">
            <h3>{item.title}</h3>
            <ul>
              {(item.steps ?? []).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ChecklistSection;
