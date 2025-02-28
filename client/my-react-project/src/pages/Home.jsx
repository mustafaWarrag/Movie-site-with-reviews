import { Link } from "react-router";
import { useEffect } from "react";
import { Container, Box, CardMedia, Typography, List, Paper, ListItem, Card, CardContent, Button } from "@mui/material"
import { PlayCircleFilledTwoTone } from "@mui/icons-material"
import img1 from "../images/placeholder-image-1.jpg"
import img2 from "../images/placeholder-image-2.jpg"
import img3 from "../images/placeholder-image-3.jpg"
import img4 from "../images/placeholder-image-4.jpg"
//import placeholderImg from "https://placehold.co/1280x768";


import MovieRequests from "../apiRequests/MovieRequests.js";

let images = [img1, img2, img3, img4];

export default function Home(props) {

  function queryHomeMovies() {
    MovieRequests.getAll(29,4).then((response)=> {
      //console.log(response.data.data.getMovies);
      let res = response.data.data.getMovies;
      console.log(res instanceof Array);
      console.log(res)
      props.setInfo(res);
    }).catch((err) => {
      console.error("cant get movies: " + err);
    })
    /*
    if (!window.sessionStorage.getItem("defaultData")) {
        MoviesService.getAll().then((res)=>{
          console.log(res.data);
          props.setInfo(res.data.movies);
          window.sessionStorage.setItem("defaultData", JSON.stringify(res.data.movies)) //caching data so it doesnt have to fetch the data on every refresh
          console.log("data wasn\'t cached");
        })
      } else {
        console.log("data was cached!, no need to fetch");
        console.log(JSON.parse(window.sessionStorage.getItem("defaultData")));  
        props.setInfo(JSON.parse(window.sessionStorage.getItem("defaultData")));
      }
    //setInfo(res.data);
    //console.log(JSON.parse(window.sessionStorage.getItem("defaultData")));  
   */
  }
  useEffect(()=> {
    queryHomeMovies();
  },[])
    return (
      <Container maxWidth="xl" disableGutters>
        <Box sx={{
          display:"flex",
          flexWrap:"wrap",
          justifyContent:"space-between", alignContent:"center",
          mt:5
        }}>
          <Box sx={{width:"100%"}}>
          <CardContent sx={{
            p:0,
            ":last-child":{pb:0}
          }}>
            <CardMedia image={props.info[0].poster? props.info[0].poster : "https://placehold.co/1280x768/000000/ffffff"} sx={{
              height:"80vh",
              display:"flex",
              justifyContent:"left", alignItems:"end",
              backgroundColor:"#333",
              backgroundBlendMode:"overlay",
              backgroundSize:"contain",
              backgroundPosition:"50% 50%"
              }}>
                <Box sx={{p:3}}>
                  <Typography variant="h6" sx={{fontSize:"2.2rem"}}>
                    {props.info[0].title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{m:1, ml:0, fontSize:"1.1rem"}}>
                    {props.info[0].plot}
                  </Typography>
                  <Button variant="contained">
                    <PlayCircleFilledTwoTone />Play Movie
                  </Button>
                  <Link to={`/movies/id/${props.info[0]._id}`} style={{color:"#fff"}}>
                    <Button variant="outlined" color="error.light" sx={{ml:1}}>
                      Check Reviews
                    </Button>
                  </Link>
                </Box>
            </CardMedia>
             
          </CardContent>
          </Box>
          
          <Container sx={{
            mb:3,
            display:"flex", flexWrap:"wrap",
            justifyContent:"space-between"
          }}>
            {props.info.slice(1,4).map((val, index) =>  
            <Card elevation={3} key={index} sx={{
              //borderColor:"info.main",
              bgcolor:"primary.900",
              width:"30%", 
              mt:5, pb:0
              }}>
              
              <CardContent sx={{
                p:0,
                "& :last-child":{pb:1}
                }}>
                <CardMedia image={val.poster? val.poster : img4} sx={{
                  height:"600px",
                  display:"flex",
                  justifyContent:"left", alignItems:"end",
                  backgroundColor:"#222",
                  backgroundBlendMode:"overlay",
                  backgroundSize:"cover",
                  backgroundPosition:"50% 50%"
                  }}>
                <Box sx={{p:3}}>
                <Typography variant="h4">
                  {val.title}
                </Typography>
                <Typography variant="caption">
                  {val.plot}
                </Typography>
                <Box sx={{
                  display:"flex", 
                  flexWrap:"wrap",
                  justifyContent:"space-between",
                  }}>
                    <Box sx={{display:"none"}}>
                      <Typography variant="overline">Rated:</Typography>
                      <Typography variant="body1" sx={{color:"warning.main"}}>
                        {val.rated? val.rated : "Unknown"}
                      </Typography>
                    </Box>
                
                <Box className="genres">
                  <Typography variant="overline">Genres:</Typography>
                  <List sx={{display:"inline"}}>[
                    {val.genres.map((val,index, arr) => index === arr.length-1? (
                    <Typography key={index} variant="button" sx={{display:"inline"}}>
                        {val}
                    </Typography> 
                    ) : (
                    <Typography key={index} variant="button" sx={{display:"inline", mr:1}}>
                      {val},
                    </Typography>
                    )
                  )}
                  ]
                  </List>
                </Box>
                
                </Box>
                {/*
                <div className="reviews">
                  {props.info.reviews.map((valObj, index)=> 
                    <div style={{border:"1px solid #fff", padding:"5px", margin:"10px"}} key={index}>
                    <h3 style={{color:"#51f"}}><strong>{valObj.name}</strong></h3>
                    <p>{valObj.review}</p> 
                    <blockquote>--uploaded:{props.dateFixer(valObj.date)}</blockquote>
                  </div>)}
                </div>
                */}
                <Link to={`/movies/id/${val._id}`} style={{textDecoration:"none"}}>
                  <Button variant="contained" onClick={()=>{props.setLoading(true)}}>
                    See Reviews
                  </Button>
                </Link>
                </Box>
                </CardMedia>

              </CardContent>
            </Card>
            )}
          </Container>
        </Box>
      </Container>
    )
}