import "./App.css";
import {
  Button,
  Paper,
  Stack,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import MenuItems from "./MenuItems";
import { couldStartTrivia } from "typescript";

// interface IMenuItems {
//   items: string[];
// }
// interface IShopData {
//   id: number;
//   country: string;
//   shop: string;
//   dataEntities: number[];
// }

// interface ISelection {
//   name: string;
//   value: string;
// }



function App() {

  const [shopData, setShopData] = useState<any[]>([]);
  const [modelData, setModelData] = useState<any[]>([]);
  const [selectedSensitivity, setSelectedSensitivity] = useState<string[] | string>([])
  const [selectedCountries, setSelectedCounties] = useState<string | string[]>([]);
  const [selectedShops, setSelectedShops] = useState<string | string[]>([]);
  // const [countries, setCountries] = useState<string[]>([]);






  const requestItems: string[] =
    [
      'Country', 'Shops', 'Sensitivity Level'
    ]
  const handleOptions = (options: any[], dataKey: string): string[] => {
    //const filterOptions = 
    // switch (dataKey){
    //   case 'country':
    //     if(selectedCountries.length > 0){
    //       console.log('country')
    //       console.log(shopData.filter(i => i.country === selectedCountries))
    //     }
    //      break;
    //      default: 
    //      console.log('default');
    //     }
    return [...new Set(options.map((i) => i[dataKey].toString(), { dataKey }))]
  }
  const filterOptions = () => {
    console.log('in filter options')
  }

  const countries = handleOptions(shopData, 'country')
  const shops = handleOptions(shopData, 'shop')
  const sensitivity = handleOptions(modelData, 'sensitivity')
  if (selectedCountries.length > 0) {
    console.log('country')
    console.log(shopData.filter(i => i.country === selectedCountries))
  }

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
    // setCountries(handleOptions(shopData, 'country'))
  };
  useEffect(() => {
    getData();
    // setCountries(handleOptions(shopData, 'country'))
    // handleOptions(shopData, 'shop')
    // handleOptions(modelData, 'sensitivity')
  }, []);

  return (
    <div className="App">
      <Paper sx={{ padding: '2em', margin: '1em' }}>
        <Stack spacing={2}>
          <MenuItems

            title={requestItems[0]}
            items={countries}
            selections={selectedCountries}
            setSelections={setSelectedCounties}
            filterOptions={filterOptions}
          />
          <MenuItems
            title={requestItems[1]}
            items={shops}
            selections={selectedShops}
            setSelections={setSelectedShops}
            filterOptions={filterOptions}
          />
          <MenuItems
            title={requestItems[2]}
            items={sensitivity}
            selections={selectedSensitivity}
            setSelections={setSelectedSensitivity}
            filterOptions={filterOptions}
          />

        </Stack>
      </Paper>
      <Button size='medium' variant='contained'>Submit</Button>
    </div>
  );
}

export default App;
