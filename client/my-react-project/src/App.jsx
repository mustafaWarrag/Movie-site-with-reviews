import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, useParams} from "react-router";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { pink, lightBlue } from '@mui/material/colors';

import Home from './pages/Home.jsx';
import SearchResults from './pages/SearchResults.jsx';
import Navigation from './pages/Navigation.jsx';
import MovieComp from "./pages/MoviesComp.jsx";
import Login from './pages/Login.jsx';
import NoPage from './pages/NoPage.jsx';

import MovieRequests from './apiRequests/MovieRequests.js';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  const [input, setInput] = useState(""); // state for the search movies input
  const [info, setInfo] = useState([ // state for default values for a movie in the database
    { 
      //the default values is a band-aid solution until Axios fetches the data from the server
    _id:"573a1390f29313caabcd42e8",
    title:"default movie",
    plot:"lorem lorem lorem",
    genres:["film", "short"],
    rated:"PG",
    poster:""
    /*
    reviews:[{
      name:"default name",
      review:"default review",
      date:new Date()
      }]
    */
    }
  ]);
  //without the default values, React will throw a TypeError("reading property of undefined")
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
  const [user, setUser] = useState({ //state to handle user information
    name:null,
    id:null
  }); 
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
    /*
    let value = new String(input); //seach input must be stringified
    if (value.length < 1 || value === "") {
      if (filterRating === "All Ratings") {
        MoviesService.searchForMovie("G","rated", page).then((response)=> {  
          setSearch(response.data.movies);
          setLoading(false);
          let num = pageNumberCalc(response.data.total_results)
          setNumOfPages(num);
          console.log(response.data);
          console.log("searching by default ratings");
          
        })
      } else {
        MoviesService.searchForMovie(filterRating,"rated", page).then((response)=> {  
          setSearch(response.data.movies);
          setLoading(false);
          let num = pageNumberCalc(response.data.total_results)
          setNumOfPages(num);
          console.log(response.data);
          console.log("searching by ratings");
        })
      }

    } else {
      MoviesService.searchForMovie(value, "title", page).then((res)=>{
        setSearch(res.data.movies);
        setLoading(false);
        let num = pageNumberCalc(res.data.total_results)
        setNumOfPages(num);
        console.log(res.data);
      });
    }
    */
  }
    
  function grabRatings() { 
    MovieRequests.getRatings().then((response)=> {
      console.log(response.data);
      //setRatings(["All Ratings"].concat(response.data.rating))
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


  useEffect(()=>{
    grabRatings();
    //figure out a way to implement a loader function that doesnt break the backend service
    //implement a login function
    //fix the bug where the search results bring up movies that dont match the title
    //make a function that takes the totalMoviesNum and forms the corret number of pages that would fit them all

    // MAKE a conditional render for if the search results turn up empty or with an error
  },[]);


  return (
    <>
    
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation user={user} setUser={setUser} 
          handleSelection={handleSelection} handleSearch={handleSearch} handleChange={handleChange} 
          ratings={ratings}
          input={input} 
          page={page} setPage={setPage}
          query={new String(input).length > 0 ? new String(input) : new String(filterRating)} 
          queryType={new String(input).length > 0 ? "title" : "rated"}
          setLoading={setLoading}
          />
          }>
            <Route index element={<Home info={info} setInfo={setInfo} setLoading={setLoading} />} />
            <Route path="search" element={<SearchResults loading={loading} setLoading={setLoading}
            query={new String(input).length > 0 ? new String(input) : new String(filterRating)} 
            queryType={new String(input).length > 0 ? "title" : "rated"}
            search={search} handleSearch={handleSearch}
            page={page} handlePagination={handlePagination} 
            numOfPages={numOfPages}
            />} />
            <Route path={`movies/id/:id`} element={<MovieComp info={info} setInfo={setInfo} 
            user={user} 
            loading={loading} setLoading={setLoading}
            />} />
            <Route path={"login"} element={<Login user={user} setUser={setUser} />} />
            <Route path={"*"} element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    {/*
      <Navigation handleSeach={handleSearch} handleChange={handleChange} /> 
      <div className="main">
        <Home info={info} dateFixer={dateFixer} />
        <SearchResults search={search} />
      </div>
    */}
    </>
  )
}

export default App
