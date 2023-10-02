import "./App.css";
import {
  Button,
  Paper,
  Stack,
} from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
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
  const [countries, setCountries] = useState<string[]>([]);
  const [shops, setShops] = useState<string[]>([]);
  const [itemUnder, setItemUnder] = useState<string[]>([]);
  const [sensitivity, setSensitivity] = useState<string[]>([]);
  const [selectedCountries, setSelectedCounties] = useState<string | string[]>([]);
  const [selectedShops, setSelectedShops] = useState<string | string[]>([]);
  const [selectedSensitivity, setSelectedSensitivity] = useState<string[] | string>([])
  const [selectedItemUnder, setSelectedItemUnder] = useState<string[] | string>([])






  const requestItems: string[] =
    [
      'Country', 'Shop', 'Sensitivity Level', 'Items'
    ]
  const handleOptions = (options: any[], dataKey: string): string[] => {

    return [...new Set(options.map((i) => i[dataKey].toString(), { dataKey }))]
  }

  const filterOptions = (selectName: string, selectValue: string[] | string): string[] => {
    let data: string[] = []
    switch (selectName) {
      case 'country':
        console.log(shopData.filter(i => selectValue.includes(i.country)))
        if (selectValue.length > 0) {
          const data = shopData.filter(i => selectValue.includes(i.country))
          setShops(handleOptions(data, 'shop'));
        } else setShops(handleOptions(shopData, 'shop'))
        break;

      case 'shop':
        if (selectValue.length > 0) {
          console.log('shop switch')
          const findShopEntities = (shopData.filter(k => selectValue.includes(k.shop))).map(j => j['data entities']);
          const removeDoubleEntity= findShopEntities.length > 1 ? findShopEntities[0].concat(findShopEntities[1].filter((i: any) => !findShopEntities[0].includes(i))):findShopEntities;

          const data: string[]  = modelData.filter(i => removeDoubleEntity.includes(i.id))
          console.log(findShopEntities,removeDoubleEntity, data, modelData)

         setSensitivity(handleOptions(data, 'sensitivity'))

        } else setSensitivity(handleOptions(modelData, 'sensitivity'))
        break;

      case 'sensitivity level':
        if (selectValue.length > 0) {
          console.log('sensitivity level switch')
          const data = modelData.filter(i => selectValue.includes(i.sensitivity.toString()))
          setItemUnder(handleOptions(data, 'name'));
          console.log(data);
        
        }else setItemUnder( handleOptions(modelData, 'name'))
        break;

      default: console.log('default')

    }
    return data;
    // if (selectedCountries.length > 0) {
    //   console.log(shopData.filter(i => selectedCountries.includes(i.country)))
    //   const data = shopData.filter(i => selectedCountries.includes(i.country))
    //   setShops(() =>handleOptions(data, 'shop'));
    // }
  }

  useEffect(() => {
    console.log(selectedCountries)


  }, [selectedCountries])

  const getData = useCallback(() => {
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
  }, []);


  useEffect(() => {
    getData();

  }, [getData]);

  useEffect(() => {
    const countriesValue = handleOptions(shopData, 'country')
    const shopsValue = handleOptions(shopData, 'shop')
    const sensitivityValue = handleOptions(modelData, 'sensitivity')
    const itemUnderSensitivity = handleOptions(modelData, 'name');
    setCountries(countriesValue)
    setShops(shopsValue)
    setSensitivity(sensitivityValue)
    setItemUnder(itemUnderSensitivity)
  }, [shopData, modelData]);


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
          {selectedSensitivity.length >0 &&
          <MenuItems
            title={requestItems[3]}
            items={itemUnder}
            selections={selectedItemUnder}
            setSelections={setSelectedItemUnder}
            filterOptions={filterOptions}
          />}
        </Stack>
      </Paper>
      <Button size='medium' variant='contained'>Submit</Button>
    </div>
  );
}

export default App;
