"use client";
import React, { useContext, useState, useEffect } from "react";
import { KanbanContext } from "./context";
import { Box, Typography } from "@mui/material";


const Main = () => {
  const {toDo, inProgress, done, setToDo, setInProgress, setDone  } = useContext(KanbanContext)
  const [draggedTask, setDraggedTask ] = useState<{taskName: string, projectName: string, priority: number, id: string}>({taskName: '', projectName: '', priority: 0, id: ''})
  const [draggedTarget, setDraggedTarget] = useState('')
  const [draggedFrom, setDraggedFrom] = useState('')


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
    <Box 
    sx = {{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: '20px',
      backgroundColor: 'purple'
    }}>
      <Box 
      sx = {{
        padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '5px', minWidth: {xs: '80px', md: '200px'}, backgroundColor: 'rgb(45, 129, 177)', borderRadius: '10px',
      }}
       onDragOver={(e) => {e.preventDefault();setDraggedTarget('toDo')}}
       onDrop = {() => { setDraggedTarget('toDo'); handleFrom(); handleDrop()}}
       onDragExit={() => {setDraggedTarget('')}}
      >
        <Typography 
      sx = {{ textAlign: 'center', fontSize: { xs: '14px', md: '25px'}, color: 'white'}}>To Do</Typography>
        {toDo.map((task, index) => (
          <Box  
        sx = {{padding: '15px', borderRadius: '10px', backgroundColor: 'white', }} key={index}
          onDragStart={() => { setDraggedTask(task); setDraggedFrom('toDo'); }} draggable >
            <Typography sx = {{fontSize: { xs: '11px', md: '14px', wordWrap: 'break-word'}}}>
              {task.taskName} - {task.projectName}
            </Typography>
            <Typography sx = {{fontSize: { xs: '11px', md: '14px', wordWrap: 'break-word'}}}>Priority: {task.priority}</Typography>
          </Box>  
        ))}
      </Box>
      <Box 
      sx = {{
        padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '5px', minWidth: {xs: '80px', md: '200px'}, backgroundColor: 'rgb(194, 191, 8)', borderRadius: '10px',
      }}
       
      onDragOver={(e) => {e.preventDefault(); setDraggedTarget('inProgress')}} 
      onDragExit={() => {setDraggedTarget('')}} 
      onDrop = { () => { setDraggedTarget('inProgress'); handleFrom(); handleDrop()}}>
      <Typography 
      sx = {{ textAlign: 'center', fontSize: { xs: '14px', md: '25px'}, color: 'white'}}  
      >In Progress</Typography>
      {inProgress.map( (task, index) => (
        <Box  
        sx = {{padding: '15px', borderRadius: '10px', backgroundColor: 'white', }} key={index} onDragStart={() => { setDraggedTask(task); setDraggedFrom('inProgress'); }} draggable >
           <Typography sx = {{fontSize: { xs: '11px', md: '14px', wordWrap: 'break-word'}}}>
              {task.taskName} - {task.projectName}
            </Typography>
            <Typography sx = {{fontSize: { xs: '11px', md: '14px', wordWrap: 'break-word'}}}>Priority: {task.priority}</Typography>
          </Box>
      ))}
      
      </Box>
      <Box 
      sx = {{
        padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '5px', minWidth: {xs: '80px', md: '200px'}, backgroundColor: 'rgb(54, 156, 7)', borderRadius: '10px',
      }}
      onDrop = {() => { setDraggedTarget('done'); handleFrom(); handleDrop()}}
      onDragOver={(e) => {e.preventDefault(); setDraggedTarget('done')}} 
      onDragExit={() => {setDraggedTarget('')}}
      >
      <Typography 
      sx = {{ textAlign: 'center', fontSize: { xs: '14px', md: '25px'}, color: 'white'}}  
      >Done</Typography>
      {done.map( (task, index) => (
        <Box  
        sx = {{padding: '15px', borderRadius: '10px', backgroundColor: 'white', }} key={index} onDragStart={() => { setDraggedTask(task); setDraggedFrom('done'); }} draggable
         
        >
          <Typography  sx = {{fontSize: { xs: '11px', md: '14px', wordWrap: 'break-word'}}}>
              {task.taskName} - {task.projectName}
            </Typography>
            <Typography sx = {{fontSize: { xs: '11px', md: '14px', wordWrap: 'break-word'}}}>Priority: {task.priority}</Typography>
          </Box>
      ))}
      </Box>
    </Box>
  );
};

export default Main;
