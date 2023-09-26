import "./App.css";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from 'react';
function App() {
  const [data, setData] = useState([]);

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8000/dataModel", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);
console.log(data)
  return (
    <div className="App">
      <Button>Hey</Button>
    </div>
  );
}

export default App;
