import { Check, Pencil, Trash2 } from "lucide-react";

// Tek bir görevin görünümünü ve o göreve ait butonları oluşturur.
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? "is-completed" : ""}`}>
      <button
        className={`check-button ${task.completed ? "checked" : ""}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Görevi tamamlanmadı yap" : "Görevi tamamlandı yap"}
        title={task.completed ? "Tamamlanmadı yap" : "Tamamlandı yap"}
      >
        {task.completed && <Check size={17} />}
      </button>

      <div className="task-copy">
        <p className="task-name">{task.text}</p>
        <div className="task-meta">
          <span className="category-tag">{task.category}</span>
          <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>
            {task.priority} öncelik
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button className="icon-button" onClick={() => onEdit(task)} aria-label="Görevi düzenle" title="Düzenle">
          <Pencil size={17} />
        </button>
        <button className="icon-button delete-button" onClick={() => onDelete(task.id)} aria-label="Görevi sil" title="Sil">
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}