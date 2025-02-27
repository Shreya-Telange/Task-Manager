import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask } from "../store/store";
import { useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/TaskManager.module.css";

const schema = yup.object().shape({
  task: yup.string().required("Task cannot be empty"),
});

function TaskManager() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState(null);

  const onSubmit = (data) => {
    dispatch(addTask({ text: data.task, date: new Date().toLocaleString() }));
    reset();
  };

  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className={styles.container}>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("task")} placeholder="Enter task" />
        <button type="submit">Add Task</button>
        {errors.task && <p>{errors.task.message}</p>}
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={styles.taskItem}>
            <div>
              <strong>{task.text}</strong>
              <p>{task.date}</p>
            </div>
            <button onClick={() => openModal(task)}>View</button>
            <button onClick={() => dispatch(removeTask(index))}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedTask && <Modal task={selectedTask} onClose={closeModal} />}
    </div>
  );
}

function Modal({ task, onClose }) {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Task Details</h2>
        <p><strong>Task:</strong> {task.text}</p>
        <p><strong>Date:</strong> {task.date}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default TaskManager;
