// App.jsx
import React from "react"
import { useState } from "react";
import "./App.css";
import Input from "./components/Input";

import List from "./components/List"

const App = ()  =>{
  const [count, setCount] = useState(0)

  return (
    <>
      <Input value={count} onChange={setCount} onSubmit={console.log} />
      <List items={["Learn React", "Learn Vite", "Make an awesome app"]} />
    </>
  );
}

export default App;