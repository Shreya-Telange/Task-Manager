import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask } from "../store/store";
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

  const onSubmit = (data) => {
    dispatch(addTask({ text: data.task, date: new Date().toLocaleString() }));
    reset();
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
            <button onClick={() => dispatch(removeTask(index))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
