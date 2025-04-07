"use client";
import React from "react";
import { createContext, useState, useEffect } from "react";

export const KanbanContext = createContext<{
  addTask: boolean;
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  toDo: {
    taskName: string;
    projectName: string;
    priority: number;
    id: string;
  }[];
  setToDo: React.Dispatch<
    React.SetStateAction<
      { taskName: string; projectName: string; priority: number; id: string }[]
    >
  >;
  inProgress: {
    taskName: string;
    projectName: string;
    priority: number;
    id: string;
  }[];
  setInProgress: React.Dispatch<
    React.SetStateAction<
      { taskName: string; projectName: string; priority: number; id: string }[]
    >
  >;
  done: {
    taskName: string;
    projectName: string;
    priority: number;
    id: string;
  }[];
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
  const initialToDo = localStorage.getItem("toDo")
    ? JSON.parse(localStorage.getItem("toDo") as string)
    : [];
  const initialInProgress = localStorage.getItem("inProgress")
    ? JSON.parse(localStorage.getItem("inProgress") as string)
    : [];
  const initialDone = localStorage.getItem("done")
    ? JSON.parse(localStorage.getItem("done") as string)
    : [];
  const [addTask, setAddTask] = useState<boolean>(false);
  const [toDo, setToDo] = useState(initialToDo);
  const [inProgress, setInProgress] = useState(initialInProgress);
  const [done, setDone] = useState(initialDone);

  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDo));
    localStorage.setItem("inProgress", JSON.stringify(inProgress));
    localStorage.setItem("done", JSON.stringify(done));
  }, [toDo, inProgress, done]);

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
