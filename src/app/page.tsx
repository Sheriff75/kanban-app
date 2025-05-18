'use client'
import TaskInput from "./components/taskInput";
import Context from "./components/context";
import Main from "./components/main";
import { useContext } from "react";
import { KanbanContext } from "./components/context";
import { Box, Stack, Button} from "@mui/material";
export default function Home() {

  const { addTask, setAddTask,  } = useContext(KanbanContext)
  return (
    <Box
    sx = {{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#2c43DD',
      minHeight: '100vh',
      minWidth: { md: '100vw'},
      padding: '20px',
    }}
    >
    <Box sx = {{
      width: '100%'
    }}>
    <Context>
      <Stack
      sx ={{
        display: 'flex',
        gap: '10px',
        marginBottom: '10px'  
      }}>
      {addTask && <TaskInput />}
      <Button
      sx={{
        color: 'white',
        textTransform: 'initial',
        border: '1px solid white'
      }}
       onClick={() => setAddTask(!addTask)}>
        {addTask ? 'Close' : 'Add Task'}
      </Button>
      </Stack> 
      <Main />
    </Context>
    </Box>
    </Box>
  );
}
