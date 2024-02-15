import React, { Suspense } from "react";
import './App.css'
const List = React.lazy(() => import("remote/List"));
const Input = React.lazy(() => import("remote/Input"));



function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div>
      <h1>Host Application</h1>
      {/* <Input value={count} onChange={setCount} onSubmit={console.log} /> */}
      <List items={["Learn React", "Learn Vite", "Make an awesome app"]} />
    </div>
    </Suspense>
    
  )
}

export default App
