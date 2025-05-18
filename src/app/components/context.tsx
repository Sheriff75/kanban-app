"use client";

type Task = {
  id: string;
  taskName: string;
  projectName: string;
  priority: number;
  status: "toDo" | "inProgress" | "done";
};




import React, { createContext, useState, useEffect } from "react";

export const KanbanContext = createContext<{
  addTask: boolean;

  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;

  toDo: { taskName: string; projectName: string; priority: number; id: string }[];
  setToDo: React.Dispatch<
    React.SetStateAction<
      { taskName: string; projectName: string; priority: number; id: string }[]
    >
  >;

  inProgress: { taskName: string; projectName: string; priority: number; id: string }[];
  setInProgress: React.Dispatch<
    React.SetStateAction<
      { taskName: string; projectName: string; priority: number; id: string }[]
    >
  >;

  done: { taskName: string; projectName: string; priority: number; id: string }[];
  setDone: React.Dispatch<
    React.SetStateAction<
      { taskName: string; projectName: string; priority: number; id: string }[]
    >
  >;
  id: string;
}>({
  addTask: false,
  setAddTask: () => {},
  toDo: [],
  setToDo: () => {},
  inProgress: [],
  setInProgress: () => {},
  done: [],
  setDone: () => {},
  id: "",
});

const Context: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addTask, setAddTask] = useState<boolean>(false);
  const [toDo, setToDo] = useState<
    { taskName: string; projectName: string; priority: number; id: string }[]
  >([]);
  const [inProgress, setInProgress] = useState<
    { taskName: string; projectName: string; priority: number; id: string }[]
  >([]);
  const [done, setDone] = useState<
    { taskName: string; projectName: string; priority: number; id: string }[]
  >([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const tasks: Task[]  = await response.json();
      console.log("Fetched tasks:", tasks); // Debugging log
      setToDo(tasks.filter((task) => task.status === "toDo"));
      setInProgress(tasks.filter((task) => task.status === "inProgress"));
      setDone(tasks.filter((task) => task.status === "done"));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTasks = React.useCallback(async () => {
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toDo, inProgress, done }),
    });
  }, [toDo, inProgress, done]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (toDo.length || inProgress.length || done.length) {
      updateTasks();
    }
  }, [toDo, inProgress, done, updateTasks]);

  const contextValues = {
    addTask,
    setAddTask,
    toDo,
    setToDo,
    inProgress,
    setInProgress,
    done,
    setDone,
    id: "",
  };

  return (
    <KanbanContext.Provider value={contextValues}>
      {children}
    </KanbanContext.Provider>
  );
};

export default Context;