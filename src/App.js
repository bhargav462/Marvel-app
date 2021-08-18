import classes from './App.module.css';
import React, {useEffect,useState} from 'react'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import swal from 'sweetalert';
import marvel from './../src/assets/marvel.png'

function App() {

  const [characters,setCharacters] = useState([]);
  const [characterInput,setCharacterInput] = useState("");
  const [loading,setLoading] = useState(true);

  const searchCharacter = (e) => {
    console.log("click",characterInput)
    const url = `https://gateway.marvel.com/v1/public/characters?orderBy=name&nameStartsWith=${characterInput}&ts=1&apikey=257ba12696ea123873ccb4ff19326ea8&hash=79650ef57d02897ea4298210e0735c65&limit=30`
    setLoading(true)
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("data",data.data.results)
      if(data.data.results.length === 0){
         swal("No Data Found","Going to show some random data")
      }
      setCharacters(data.data.results)
      setLoading(false)
    })
  }

  const inputOnchage = (e) => {
    console.log("e",e.target.value)
    setCharacterInput(e.target.value)
  }

  useEffect(() => {
     if(characters.length === 0){
      const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=257ba12696ea123873ccb4ff19326ea8&hash=79650ef57d02897ea4298210e0735c65&limit=30`
      setLoading(true)
      fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("data",data.data.results)
        if(data.data.results.length === 0){
           swal("No Data Found","Going to show some random data")
        }
        setCharacters(data.data.results)
        setLoading(false)
      })
     }
  },[characters])

  return (
    <div className="App">
        <div className={classes["header"]}>
           <div className={classes["marvel-container"]}>
             <img src={marvel} />
           </div>
           <div className={classes["search-box"]}>
              <TextField
                label="Enter the Character Name"
                onChange={inputOnchage}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={searchCharacter}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
              />
           </div>
        </div>

        {
         loading ? (<div className={classes["loading"]}>
                      <CircularProgress />  
                    </div>) : 
        (<div className={classes["cards-container"]}>
          {characters.map((character,key) => {
              return (<div className={classes["card-container"]} key={key}>
                <div className={classes["image-container"]}>
                  <img src={`${character.thumbnail.path}/standard_fantastic.jpg`} />
                </div>
                <div className={classes["card-content"]}>
                  <h2 className={classes["name"]}>{character.name}</h2>
                  <p className={classes["description"]}>{character.description}</p>
                </div>
              </div>)
          })}
        </div>)
        }

    </div>
  );
}

export default App;
