'use client'
import React from 'react'
import { createContext, useState, useEffect } from 'react'

export const KanbanContext = createContext<{
    addTask: boolean;
    setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
    toDo: { taskName: string;
        projectName: string;
        priority: number;
    } [];
    setToDo: React.Dispatch<React.SetStateAction<{taskName: string, projectName: string}[]>>;
    inProgress: { taskName: string;
        projectName: string;
        priority: number;} [];
    setInProgress: React.Dispatch<React.SetStateAction<{taskName: string, projectName: string, priority: number}[]>>;
    done: {
        taskName: string;
        projectName: string;
        priority: number;
    } [];
    setDone: React.Dispatch<React.SetStateAction<{taskName: string, projectName: string, priority: number}[]>>;
}>({
    addTask: false,
    setAddTask: () => {},
    toDo: [],
    setToDo: () => {},
    inProgress: [],
    setInProgress: () => {},
    done: [],
    setDone: () => {}
})


const Context: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialToDo = localStorage.getItem('toDo') ? JSON.parse(localStorage.getItem('toDo') as string) : []              
    const [addTask, setAddTask] = useState<boolean>(false)
    const [toDo, setToDo] = useState(initialToDo)
    const [inProgress, setInProgress] = useState<{ taskName: string; projectName: string; priority: number }[]>([])
    const [done, setDone] = useState<{ taskName: string; projectName: string; priority: number }[]>([])

    useEffect(() => {
        localStorage.setItem('toDo', JSON.stringify(toDo))
    }, [toDo])
    
    const contextValues ={
        addTask,
        setAddTask, 
        toDo,
        setToDo,
        inProgress,
        setInProgress,
        done,
        setDone
      }
      
  return (
    <KanbanContext.Provider value={contextValues}>
        {children}
        </KanbanContext.Provider>

  )
}

export default Context