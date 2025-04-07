'use client'
import TaskInput from "./components/taskInput";
import Context from "./components/context";
import Main from "./components/main";
import { useContext } from "react";
import { KanbanContext } from "./components/context";
export default function Home() {

  const { addTask, setAddTask,  } = useContext(KanbanContext)
  return (
    <div className="bg-[#2c43DD] min-h-screen p-10">
    <Context>
      <div className="flex gap-10 mb-10">
      {addTask && <TaskInput />}
      <button className="p-2 border border-black rounded-lg w-full bg-lemon-400" onClick={() => setAddTask(!addTask)}>
        {addTask ? 'Close' : 'Add Task'}
      </button>
      </div>
      
      <Main />
    </Context>
    </div>
  );
}
