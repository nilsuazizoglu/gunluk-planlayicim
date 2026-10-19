import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ListTodo, Sparkles } from "lucide-react";
import TaskForm from "../components/TaskForm.jsx";
import TaskItem from "../components/TaskItem.jsx";

const STORAGE_KEY = "gunluk-planlayicim-gorevler";

// Tarayıcıda daha önce kaydedilen görevleri yüklemeyi dener.
function getSavedTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(getSavedTasks);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Tümü");

  // Görev listesi değiştikçe tarayıcı hafızasını güncelle.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(taskDetails) {
    const newTask = {
      id: crypto.randomUUID(),
      ...taskDetails,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function saveEditedTask(updatedTask) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => task.id === updatedTask.id ? updatedTask : task)
    );
    setTaskToEdit(null);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(taskId) {
    const shouldDelete = window.confirm("Bu görevi silmek istediğine emin misin?");
    if (!shouldDelete) return;

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    if (taskToEdit?.id === taskId) setTaskToEdit(null);
  }

  const visibleTasks = useMemo(() => {
    if (activeFilter === "Tamamlananlar") return tasks.filter((task) => task.completed);
    if (activeFilter === "Devam edenler") return tasks.filter((task) => !task.completed);
    return tasks;
  }, [tasks, activeFilter]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const today = new Intl.DateTimeFormat("tr-TR", {
    weekday: "long", day: "numeric", month: "long"
  }).format(new Date());

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Günlük Planlayıcım ana sayfa">
          <span className="brand-icon"><ListTodo size={21} /></span>
          <span>günlük<span className="brand-light">planım</span></span>
        </a>
        <div className="today-label"><CalendarDays size={16} /> {today}</div>
      </header>

      <section className="welcome-section" id="top">
        <div className="welcome-copy">
          <span className="eyebrow"><Sparkles size={14} /> KENDİ TEMPOUNDA İLERLE</span>
          <h1>Bugün kendin için<br /><span>bir şeyler başarmanın</span> günü.</h1>
          <p>Planını yap, küçük adımlarla ilerle ve yaptıklarını işaretle.</p>
        </div>
        <div className="progress-card">
          <div className="progress-heading">
            <span>Günlük ilerleme</span>
            <CheckCircle2 size={19} />
          </div>
          <div className="progress-number">%{progress}</div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <p>{completedCount} / {tasks.length} görev tamamlandı</p>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel create-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">PLANINI OLUŞTUR</span>
              <h2>{taskToEdit ? "Görevi düzenle" : "Aklındakileri listele"}</h2>
            </div>
            <span className="heading-mark">01</span>
          </div>
          <TaskForm
            onAddTask={addTask}
            taskToEdit={taskToEdit}
            onSaveEdit={saveEditedTask}
            onCancelEdit={() => setTaskToEdit(null)}
          />
          <div className="small-tip"><Sparkles size={16} /> İpucu: Büyük işleri küçük, yapılabilir görevlere böl.</div>
        </div>

        <div className="panel list-panel">
          <div className="section-heading list-heading">
            <div>
              <span className="eyebrow">GÜNÜN LİSTESİ</span>
              <h2>Görevlerin <span className="count-bubble">{tasks.length}</span></h2>
            </div>
            <span className="heading-mark">02</span>
          </div>

          <div className="filter-row" aria-label="Görev filtresi">
            {["Tümü", "Devam edenler", "Tamamlananlar"].map((filter) => (
              <button
                key={filter}
                className={`filter-button ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="task-list">
            {visibleTasks.length > 0 ? visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onEdit={setTaskToEdit}
                onDelete={deleteTask}
              />
            )) : (
              <div className="empty-state">
                <span className="empty-icon"><ListTodo size={25} /></span>
                <h3>{tasks.length === 0 ? "İlk görevini ekle" : "Burada şimdilik bir şey yok"}</h3>
                <p>{tasks.length === 0 ? "Aklındaki bir işi yaz; planın burada şekillensin." : "Bu filtreye uyan bir görev bulunmuyor."}</p>
              </div>
            )}
          </div>
          <p className="privacy-note">Görevlerin bu tarayıcıda saklanır.</p>
        </div>
      </section>

      <footer className="footer">
        <span>Az az, her gün. ✳</span>
        <span>Günlük Planlayıcım · React ile hazırlandı</span>
      </footer>
    </main>
  );
}