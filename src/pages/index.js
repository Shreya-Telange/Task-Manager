import TaskManager from "../components/TaskManager";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <TaskManager />
    </ErrorBoundary>
  );
}
