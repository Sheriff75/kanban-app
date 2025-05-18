import React from 'react'
import { useContext, useState } from 'react'
import { KanbanContext } from './context'
import { v4 as uuidv4 } from 'uuid'

const TaskInput = () => {
    const {toDo, setToDo, setAddTask} = useContext(KanbanContext)
    const [taskName, setTaskName] = useState('')
    const [projectName, setProjectName] = useState('')
    const [priority, setPriority] = useState<number>(1)
    const handleToDo = () => {
        setToDo([...toDo, {taskName, projectName, priority, id: uuidv4()}])
        setTaskName('')
        setProjectName('')
        setPriority(1)
    }

    const priorityColor = priority === 1 ? 'bg-blue-500' : priority === 2 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className='bg-white flex rounded-lg gap-2 p-4 py-2 flex-col justify-between  max-w-[500px]'>
        <span>
            <input required value={taskName} onInput={(e) => { setTaskName((e.target as HTMLInputElement).value)}} type='text' placeholder='Enter a task' className='border-2 border-gray-300 rounded-lg p-2' />
            <input required value={projectName} onInput={(e) => { setProjectName((e.target as HTMLInputElement).value)}} type='text' placeholder='Enter a task' className='border-2 border-gray-300 rounded-lg p-2' />
        </span>
        <span className='flex gap-2'>
            <button onClick={() => setPriority(1)} className={`${priorityColor} bg-blue-500 text-white rounded-[5px 5px 5px 20px] p-2 w-5 h-5`}></button>
            <button onClick={() => setPriority(2)} className={`${priority > 1 ? priorityColor: 'bg-gray-500'} bg-blue-500 text-white rounded-[5px 5px 5px 20px] p-2 w-5 h-5`}></button>
            <button onClick={() => setPriority(3)} className={`${priority > 2 ? priorityColor: 'bg-gray-500'} bg-blue-500 text-white rounded-[5px 5px 5px 20px] p-2 w-5 h-5`}></button>
        </span>
          <button className='border-2 border-black p-2 w-full text-red-300 bg-blue-500 w' onClick={() => {handleToDo(); setAddTask(false)}}>Add Task</button>  
    </div>
  )
}

export default TaskInput
