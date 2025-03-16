import { useState } from 'react'
import './App.css'
import Leaderboard from './components/Leaderboard';
import Card from './components/Card';


function App() {
  const [task, setTask] = useState("");

  return (
    <div className="main-container">
      <div className="to-do-container">
        
          <h1 className="main-header">My Things To Do This Week</h1>
        
        <Leaderboard></Leaderboard>
      </div>
      
    </div>
  )
}

export default App
