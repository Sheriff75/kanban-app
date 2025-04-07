"use client";
import React, { useContext, useState, useEffect } from "react";
import { KanbanContext } from "./context";


const Main = () => {
  const {toDo, inProgress, done, setToDo, setInProgress, setDone  } = useContext(KanbanContext)
  const [draggedTask, setDraggedTask ] = useState<{taskName: string, projectName: string, priority: number, id: string}>({taskName: '', projectName: '', priority: 0, id: ''})
  const [draggedTarget, setDraggedTarget] = useState('')
  const [draggedFrom, setDraggedFrom] = useState('')
  

  // useEffect( ()=>{
  //   if(draggedTarget === 'inProgres') {
  //     setInProgress([...inProgress, ...draggedTask])
  //   }
  // }, [draggedTarget, draggedFrom, draggedTask])

  const handleFrom = () => {
    if (draggedFrom === 'toDo') {
      setToDo(toDo.filter((task) => task.id !== draggedTask.id));
    } else if (draggedFrom === 'inProgress') {
      setInProgress(inProgress.filter((task) => task.id !== draggedTask.id));
    } else if (draggedFrom === 'done') {
      setDone(done.filter((task) => task.id !== draggedTask.id));
    }
  }

  const handleDrop = () => {
    if (draggedTarget === 'toDo') {
      setToDo([...toDo, draggedTask]);
    } else if (draggedTarget === 'inProgress') {
      setInProgress([...inProgress, draggedTask]);
    } else if (draggedTarget === 'done') {
      setDone([...done, draggedTask]);
    }
  };

      useEffect( () => {
        console.log(inProgress)
      }, [inProgress])

  return (
    <div className="flex justify-between w-full p-10 bg-sky-500">
      <div className=" p-4 flex justify-between  gap-2 flex-col bg-sky-100 p-7  min-w-60"
       onDragOver={(e) => {e.preventDefault();setDraggedTarget('toDo')}}
       onDrop = {() => { setDraggedTarget('toDo'); handleFrom(); handleDrop()}}
       onDragExit={() => {setDraggedTarget('')}}
      >
        <h1 className="flex justify-center text-3xl font-bold  text-center">To Do</h1>
        {toDo.map((task, index) => (
          <div key={index} className="rounded-lg border bg-white text-black p-5" 
          onDragStart={() => { setDraggedTask(task); setDraggedFrom('toDo'); }} draggable >
            <h1>
              {task.taskName} - {task.projectName}
            </h1>
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>
      <div className=" p-4 flex justify-between  gap-2 flex-col bg-sky-100 p-7 min-w-60" 
      onDragOver={(e) => {e.preventDefault(); setDraggedTarget('inProgress')}} 
      onDragExit={() => {setDraggedTarget('')}} 
      onDrop = { () => { setDraggedTarget('inProgress'); handleFrom(); handleDrop()}}>
      <h1 className="flex justify-center text-3xl font-bold  text-center">In Progress</h1>
      {inProgress.map( (task, index) => (
        <div  className="rounded-lg border bg-white text-black p-5" key={index} onDragStart={() => { setDraggedTask(task); setDraggedFrom('inProgress'); }} draggable >
           <h1>
              {task.taskName} - {task.projectName}
            </h1>
            <p>Priority: {task.priority}</p>
          </div>
      ))}
      
      </div>
      <div className=" p-4 flex justify-between  gap-2 flex-col bg-sky-100 p-7 min-w-60 "
      onDrop = {() => { setDraggedTarget('done'); handleFrom(); handleDrop()}}
      onDragOver={(e) => {e.preventDefault(); setDraggedTarget('done')}} 
      onDragExit={() => {setDraggedTarget('')}}
      >
      <h1 className="flex justify-center text-3xl font-bold  text-center">Done</h1>
      {done.map( (task, index) => (
        <div className="rounded-lg border bg-white text-black p-5" key={index} onDragStart={() => { setDraggedTask(task); setDraggedFrom('done'); }} draggable
         
        >
          <h1>
              {task.taskName} - {task.projectName}
            </h1>
            <p>Priority: {task.priority}</p>
          </div>
      ))}
      </div>
    </div>
  );
};

export default Main;
