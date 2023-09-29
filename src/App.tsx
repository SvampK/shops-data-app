import "./App.css";
import {
  Button,
  FormControl,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import MenuItems from './MenuItems'

function App() {
  interface IMenuItems {
    items: string[];
  }
  interface IShopData {
    id: number;
    country: string;
    shop: string;
    dataEntities: number[];
  }
  const [shopData, setShopData] = useState<[]>([]);
  const [modelData, setModelData] = useState<[]>([]);
  const [selections, setSelections] = useState<string[]>([])

  const requestItems: string[] = 
  [
    'Country', 'Shops', 'Sensitivity Level'
  ]


  const getData = () => {
    var requestOptions: object = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8000/shops", requestOptions)
      .then((response) => response.json())
      .then((result) => setShopData(result))
      .catch((error) => console.log("error", error));

    fetch("http://localhost:8000/dataModel", requestOptions)
      .then((response) => response.json())
      .then((result) => setModelData(result))
      .catch((error) => console.log("error", error));
    console.log(shopData)
    console.log(modelData)
  };
  
  useEffect(() => {
    getData();

  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selections>) => {
    const { target: { value } } = event;
    setSelections(
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log('selections1', selections)
  };


  return (
    <div className="App">
      <FormControl fullWidth margin='normal' variant="filled">
      <Stack spacing={2}>
       <MenuItems items={requestItems} handleChange={handleChange} selections={selections}></MenuItems>
      </Stack>
      </FormControl>
      <Button size='medium' variant='contained'>Submit</Button>
    </div>
  );
}

export default App;
