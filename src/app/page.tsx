'use client'
import TaskInput from "./components/taskInput";
import Context from "./components/context";
import Main from "./components/main";
import { useContext } from "react";
import { KanbanContext } from "./components/context";
export default function Home() {

  const { addTask, setAddTask, toDo } = useContext(KanbanContext)
  return (
    <div>
    <Context>
      {addTask && <TaskInput />}
      <button className="p-2 border border-black rounded-lg w-full " onClick={() => setAddTask(!addTask)}>
        {addTask ? 'Close' : 'Add Task'}
      </button>
    </Context>
    </div>
  );
}
