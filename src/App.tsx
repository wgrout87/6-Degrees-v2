import handleSubmit from './handles/handlesubmit';
import { useRef } from 'react';
import './App.css';

function App() {
  const dataRef = useRef<HTMLInputElement>(null)
 
  const submithandler = (e: any) => {
    e.preventDefault()
    if (dataRef.current) {
      handleSubmit(dataRef.current.value)
      dataRef.current.value = ""
    }
  }

  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type= "text" ref={dataRef} />
        <button type = "submit">Save</button>
      </form>
    </div>
  );
}

export default App;
