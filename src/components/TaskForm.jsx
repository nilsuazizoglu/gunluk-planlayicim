import { useState } from "react";
import { Plus, Save } from "lucide-react";

// Yeni görev ekleme ve mevcut görevi düzenleme formu.
export default function TaskForm({ onAddTask, taskToEdit, onSaveEdit, onCancelEdit }) {
  const [taskText, setTaskText] = useState("");
  const [category, setCategory] = useState("Kişisel");
  const [priority, setPriority] = useState("Orta");

  // Düzenleme moduna geçildiğinde form alanlarını seçili görevle doldur.
  // Formdaki metin değişirse kullanıcının yazdığı değer korunur.
  const [lastEditedId, setLastEditedId] = useState(null);
  if (taskToEdit && lastEditedId !== taskToEdit.id) {
    setTaskText(taskToEdit.text);
    setCategory(taskToEdit.category);
    setPriority(taskToEdit.priority);
    setLastEditedId(taskToEdit.id);
  }
  if (!taskToEdit && lastEditedId !== null) {
    setLastEditedId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const cleanText = taskText.trim();

    if (!cleanText) {
      alert("Lütfen önce bir görev yaz.");
      return;
    }

    const taskDetails = { text: cleanText, category, priority };

    if (taskToEdit) {
      onSaveEdit({ ...taskToEdit, ...taskDetails });
    } else {
      onAddTask(taskDetails);
    }

    setTaskText("");
    setCategory("Kişisel");
    setPriority("Orta");
    setLastEditedId(null);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="taskText">Bugün ne yapacaksın?</label>
      <div className="input-row">
        <input
          id="taskText"
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="Örn. JavaScript tekrar et"
          maxLength={100}
        />
        <button className="primary-button" type="submit">
          {taskToEdit ? <Save size={18} /> : <Plus size={18} />}
          {taskToEdit ? "Kaydet" : "Görev ekle"}
        </button>
      </div>

      <div className="form-options">
        <div>
          <label htmlFor="category">Kategori</label>
          <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>Kişisel</option>
            <option>Okul</option>
            <option>İş</option>
            <option>Sağlık</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority">Öncelik</label>
          <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option>Düşük</option>
            <option>Orta</option>
            <option>Yüksek</option>
          </select>
        </div>
        {taskToEdit && (
          <button className="text-button cancel-button" type="button" onClick={onCancelEdit}>
            Düzenlemeyi iptal et
          </button>
        )}
      </div>
    </form>
  );
}