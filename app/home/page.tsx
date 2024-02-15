import React from 'react'
import TaskList from './components/taskList'
import TaskInput from './components/taskInput'
const Tasks = () => {
  return (
    <div className='container'>
      <TaskInput/>
      <TaskList/>
    </div>
  )
}

export default Tasks
