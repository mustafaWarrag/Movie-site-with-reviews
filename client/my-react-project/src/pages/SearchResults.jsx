import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Pagination from "./Pagination.jsx";
import { Box, Button, CardMedia, Container, List, Paper, Skeleton, Typography } from "@mui/material";

export default function SearchResults(props) {
  let navi = useNavigate();
    useEffect(()=>{ //re-render the component on every page change
      props.handleSearch(); 
      //navi(`/search?${props.queryType}=${props.query}&page=${props.page}`);
      //props.setLoading(false);
    },[props.page]);

    
    if (props.loading) {
      return (
        <>
        <Container maxWidth="xl" disableGutters>
          <Box sx={{
          display:"flex", flexWrap:"wrap",
          justifyContent:"space-between", alignContent:"start",
          height:"80vh"
        }}>
            {[...new Array(4)].map((val, index) => 
            <Box key={index} sx={{width:"23%"}}>
              <Skeleton width={"100%"} height={"500px"} />
              <Skeleton width={"100%"} height={"10%"} />
            </Box>
            )}
          </Box>
        </Container>
        </>
      )
    }
    

    return (
      <>
        <Container maxWidth="xl" disableGutters>
          <Box sx={{
          display:"flex", flexWrap:"nowrap",
          justifyContent:"space-evenly", 
          alignItems:"center", alignContent:"center", 
          padding:"10px",
          height:"100vh"
          }}>
              {props.search.map((valObj,index) => 
              <Box key={index} sx={{width:"23%"}}>
                <Paper sx={{
                  display:"flex", flexDirection:"column",
                  flexWrap:"nowrap",
                  justifyContent:"space-between", alignContent:"space-evenly", 
                  p:3, 
                  minHeight:"650px"}}>
                
                <CardMedia image={valObj.poster ? valObj.poster : "https://placehold.co/800x600/000000/ffffff?text=Placeholder"} alt="Movie Poster" 
                title="movie poster" sx={{height:"230px", width:"100%"}} />

                <Typography variant="h5">{valObj.title}</Typography>
                <Typography variant="subtitle2">{valObj.plot}</Typography>
                <Box sx={{color:"cyan"}}>
                  Rated:<br />{valObj.rated ? valObj.rated : "Unknown"}
                </Box>
                <List>{valObj.genres.map((vals, ind) => <li key={ind}>{vals}</li> )}</List>
                <Link to={`/movies/id/${valObj._id}`}>
                  <Button variant="contained">
                    View Reviews
                  </Button>
                </Link>
                </Paper>
              </Box> 
            )}

            </Box>

            <Box sx={{display:"flex", justifyContent:"center"}}>

              <Pagination page={props.page} handlePagination={props.handlePagination} 
              numOfPages={props.numOfPages}
              />

            </Box>
          </Container>
      </>
    )
} 