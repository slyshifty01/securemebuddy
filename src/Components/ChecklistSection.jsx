function ChecklistSection({ checklists, checklistProgress, onToggleItem }) {
  return (
    <section className="fade-in">
      <h2>Safety Checklists</h2>
      <div className="card-grid">
        {checklists.map((list) => {
          const completed = checklistProgress[list.id]?.length || 0;
          const total = list.items.length;

          return (
            <article key={list.id} className="card checklist-card">
              <h3>{list.title}</h3>
              <p>{list.description}</p>
              <p>
                Progress: {completed} / {total}
              </p>

              <ul className="checklist-items">
                {list.items.map((item, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          checklistProgress[list.id]?.includes(index) || false
                        }
                        onChange={() => onToggleItem(list.id, index)}
                      />
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ChecklistSection;
