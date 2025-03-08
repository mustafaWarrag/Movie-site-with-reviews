import { useEffect, useState } from 'react'
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
  const [search, setSearch] = useState([ //state for the default search results
    {
      title:"default search results",
      plot:"lorem lorem lorem",
      genres:["drama","placeholder"],
    }
  ]);
  const [ratings, setRatings] = useState(["All Ratings"]); //state to hold all the ratings after grabbing them from the database
  const [filterRating, setFilter] = useState("All Ratings"); //state to hold the selected rating from the array of options
  const [page, setPage] = useState(0); //state to handle current page number

  const [loading, setLoading] = useState(true); //state to handle whether the backend data has been fetched or not
  const [numOfPages, setNumOfPages] = useState(1); //state to handle the overall number of pages for the results
  
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
  

  function handleSearch() {
    setLoading(true);
    let rating = filterRating === "All Ratings"? null : filterRating;
    let data = {
      title:input,
      rated:rating 
    }
    MovieRequests.searchForMovie(data, page).then((res)=> {
      let response = res.data.data.searchForMovieByFilter;
      //console.log(response);  
      setSearch(response.movies);
      setLoading(false);
      
      let num = pageNumberCalc(response.totalNumOfMovies);
      //console.log(`num:${num}`);
      setNumOfPages(num);
    }).catch((err) => {
      console.error(err.response.data);
      setLoading(false);
    })
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

  function handlePagination(num) {
    setPage(num);
    setLoading(true);
    console.log(page);
  }
  
  function pageNumberCalc(num) {
    if (num % 4 !== 0) {
      return (Math.floor((num+1)/4))
    } else {
      return (Math.floor(num/4));
    }
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
  },[]);

            /*
            note to self:
            test the react app with Jest/Mocha
            dont forget the API key stuff too
            all done, just make it responsive to small devices
            */
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation 
          handleSelection={handleSelection} handleSearch={handleSearch} handleChange={handleChange} 
          ratings={ratings} filterRating={filterRating}
          input={input} 
          page={page} setPage={setPage}
          setLoading={setLoading}
          />
          }>
            <Route index element={<Home info={info} setInfo={setInfo} loading={loading} setLoading={setLoading} />} />
            <Route path="search" element={<SearchResults loading={loading} setLoading={setLoading}
            search={search} handleSearch={handleSearch}
            page={page} handlePagination={handlePagination} 
            numOfPages={numOfPages}
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
