import { useEffect, useRef, useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { pink, lightBlue } from '@mui/material/colors';
import { useDispatch } from "react-redux";
import { login, signout } from './redux/reducers.js';
import * as badwords from "bad-words";

import Home from './pages/Home.jsx';
import SearchResults from './pages/SearchResults.jsx';
import Navigation from './pages/Navigation.jsx';
import MovieComp from "./pages/MoviesComp.jsx";
import Login from './pages/Login.jsx';
import NoPage from './pages/NoPage.jsx';

import MovieRequests from './apiRequests/MovieRequests.js';
import UserRequests from './apiRequests/UserRequests.js';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const dispatch = useDispatch();

  let loaderRef = useRef(null);
  const [input, setInput] = useState(""); // state for the search movies input
  const [info, setInfo] = useState([ // state for default values for a movie in the database
    {
    _id:"573a1390f29313caabcd42e8",
    title:"default movie",
    plot:"lorem lorem lorem",
    genres:["film", "short"],
    rated:"PG",
    poster:""

    }
  ]);
  const [search, setSearch] = useState([]) //state to handle search results;
  const [page, setPage] = useState(0); //state to handle current page number
  const [numOfPages, setNumOfPages] = useState(1); //state to handle the total results
  const [ratings, setRatings] = useState(["All Ratings"]); //state to hold all the ratings after grabbing them from the database
  const [filterRating, setFilter] = useState("All Ratings"); //state to hold the selected rating from the array of options

  const [loading, setLoading] = useState(true); //state to handle whether the backend data has been fetched or not
  
  const darkTheme = createTheme({
    palette:{
      mode:"dark",
      primary:pink,
      secondary:lightBlue,
    }
  })

  function handleChange(e) {
    setInput(e.target.value);
  }
    
  function grabRatings() { 
    MovieRequests.getRatings().then((response)=> {
      //console.log(response.data);
      setRatings(["All Ratings"].concat(response.data.data.getRatings));
    })
    
  }
  function handleSelection(e) {
    setFilter(e.target.value);
    console.log("selected: " + e.target.value);
  }
  
  
  
  function handleSearch() {
    //props.setLoading(true);
    let rating = filterRating === "All Ratings"? null : filterRating;
    let data = {
      title:input,
      rated:rating 
    }
    MovieRequests.searchForMovie(data, page).then((res)=> {
      let response = res.data.data.searchForMovieByFilter;
      //console.log(response);  
      setSearch((prevArr)=> [...prevArr, ...response.movies]);
      setLoading(false);
      setNumOfPages(response.totalNumOfMovies);

    }).catch((err) => {
      console.error(err.response.data);
      setLoading(false);
    })
  }

  function handleLoadMoreData() {
    setPage((prevVal) => prevVal+1);
    setLoading(false);
    handleSearch();
  }

  let filter = new badwords.Filter;
  function tokenVerify() {
    let cache = localStorage.getItem("token");
    if (!cache) {
      console.log("No cache");
      localStorage.clear();
    } else {
      UserRequests.tokenAuth(JSON.parse(cache)).then((res) => {
        let cred = res.data.data.tokenVerify;
        if (!cred) {
          throw new Error("bad token");
        }
        //console.log(cred);
        //console.log(`username:${cred.username}, token:${cache}`);
        dispatch(login({username:cred.username, token:cache}));
      }).catch((err) => {
        console.error(err);
        localStorage.clear();
        dispatch(signout());
      })
    }
  }

  useEffect(()=>{
    grabRatings();
    tokenVerify();
    //remember to reapply strict mode
  },[]);

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation 
          handleSelection={handleSelection} handleChange={handleChange} handleSearch={handleSearch} 
          ratings={ratings} filterRating={filterRating}
          input={input} 
          setSearch={setSearch}
          setLoading={setLoading} 
          setPage={setPage}
          />
          }>
            <Route index element={<Home info={info} setInfo={setInfo} loading={loading} setLoading={setLoading} />} />
            <Route path="search" element={<SearchResults loading={loading} setLoading={setLoading}
            search={search} setSearch={setSearch} 
            page={page} setPage={setPage}
            numOfPages={numOfPages}
            handleLoadMoreData={handleLoadMoreData}
            />} />
            <Route path={`movies/id/:id`} element={<MovieComp info={info} setInfo={setInfo} 
            loading={loading} setLoading={setLoading}
            />} />
            <Route path={"login"} element={<Login  />} />
            <Route path={"*"} element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
