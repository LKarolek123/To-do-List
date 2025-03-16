import { useState, useEffect } from "react";

const CardStylesheet = {
  width: "100%",
  height: "auto",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Arial",
  color: "aqua",
  padding: "10px",
};

const Card = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    // Pobieramy zadania z LocalStorage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []); // Uruchamia się tylko raz przy pierwszym renderze
  
  useEffect(() => {
    // Zapisujemy zadania do LocalStorage po każdej zmianie stanu
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]); // Uruchamia się za każdym razem, gdy tasks się zmienia

  function addNewTask() {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  }

  function removeTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function moveTaskUp(index) {
    if (index > 0) {
      let newTasks = [...tasks];
      [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
      setTasks(newTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      let newTasks = [...tasks];
      [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
      setTasks(newTasks);
    }
  }

  function toggleEditing(index) {
    if (editingIndex === index) {
      setEditingIndex(null);
    } else {
      setEditingIndex(index);
      setEditText(tasks[index]);
    }
  }

  function saveEdit(index) {
    if (editText.trim() !== "") {
      const newTasks = [...tasks];
      newTasks[index] = editText;
      setTasks(newTasks);
    }
    setEditingIndex(null);
  }

  return (
    <div className="card" style={CardStylesheet}>
      <div className="task-generator">
        <h2 className="margin-5px">Task List</h2>
        <div className="flex-row">
          <input
            type="text"
            className="input-task"
            placeholder="Add your task here!"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />
          <button className="submit-task" onClick={addNewTask}>
            Submit Task
          </button>
        </div>
      </div>
      <ol>
        {tasks.map((t, index) => (
          <li key={index} className="task-on-list">
            {editingIndex === index ? (
              <input
                type="text"
                className="task-on-list edit-task"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(index)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                autoFocus
              />
            ) : (
              <span className="task-text">{index + 1 + ". "}{t}</span>
            )}
            <button className="button edit-task-button" onClick={() => toggleEditing(index)}>
              {editingIndex === index ? "Stop Editing" : "Edit Task"}
            </button>
            <button className="button remove-task" onClick={() => removeTask(index)}>❌</button>
            <button className="button move-task-up" onClick={() => moveTaskUp(index)}>⬆️</button>
            <button className="button move-task-down" onClick={() => moveTaskDown(index)}>⬇️</button>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default Card;