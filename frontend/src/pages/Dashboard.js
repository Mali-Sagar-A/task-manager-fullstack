import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const response = await api.get("/tasks");
    setTasks(response.data);
  };

  const createTask = async () => {
    if (!title) return;

    await api.post("/tasks", { title, description });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const updateStatus = async (task, newStatus) => {
    await api.put(`/tasks/${task.id}`, {
      ...task,
      status: newStatus,
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div className="navbar">
        <div>Task Manager</div>
        <div>
          Tasks: {tasks.length}
          <button
            className="logout-btn"
            onClick={logout}
            style={{ marginLeft: "15px" }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="main-container">
        <div className="container">
          <h3>Create Task</h3>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={createTask}>Add Task</button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3>Your Tasks</h3>

          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{task.title}</strong>

                <span className={`task-status status-${task.status}`}>
                  {task.status}
                </span>
              </div>

              <p>{task.description}</p>

              <select
                value={task.status}
                onChange={(e) => updateStatus(task, e.target.value)}
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>

              <br />
              <br />

              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
