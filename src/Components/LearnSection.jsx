function LearnSection({ lessons, selectedLesson, onSelectLesson }) {
  if (selectedLesson) {
    return (
      <section className="fade-in">
        <button onClick={() => onSelectLesson(null)}>← Back</button>
        <h2>{selectedLesson.title}</h2>
        <p>
          <em>{selectedLesson.level}</em>
        </p>
        <ol>
          {selectedLesson.content.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section className="fade-in">
      <h2>Learn the Basics</h2>
      <div className="card-grid">
        {lessons.map((lesson) => (
          <article
            key={lesson.id}
            className="card"
            onClick={() => onSelectLesson(lesson)}
          >
            <h3>{lesson.title}</h3>
            <p className="tag">{lesson.level}</p>
            <p>{lesson.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LearnSection;
