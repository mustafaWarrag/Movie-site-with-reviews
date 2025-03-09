import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Box, Button, CardMedia, Container, List, Paper, Skeleton, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";


function Loading(props) {
  return (
    <>
    <Container maxWidth="xl" disableGutters>
      <Box sx={{
      display:"flex", flexWrap:"wrap",
      justifyContent:"space-between", alignContent:"start",
      height:"80vh", p:3
    }}>
        {[...new Array(4)].map((val, index) => 
        <Box ref={props.loaderRef} key={index} sx={{width:"23%"}}>
          <Skeleton width={"100%"} height={"500px"} />
          <Skeleton width={"100%"} height={"10%"} />
        </Box>
        )}
      </Box>
    </Container>
    </>
  )
}

function NoMoreData(props) {
  return (
    <>
    <Container maxWidth="xl" disableGutters>
      <Box sx={{
      display:"flex", flexWrap:"wrap",
      alignItems:"center",
      justifyContent:"center", alignContent:"center",
      height:"30vh", p:1
    }}>
        <Typography variant={"h4"}>
          That's it folks! No more results :3
        </Typography>
      </Box>
    </Container>
    </>
  )
}

export default function SearchResults(props) {
  let navi = useNavigate();
  let loaderRef = useRef(null);
  
  useEffect(()=>{ //re-render the component on every page change
    props.setSearch([]);
    let firstRender = true;
    (async () => {
      if (firstRender) {
        props.setPage(1);
      }
    })();
    return () => {
      firstRender = false;
    };
  },[]);

    if (props.loading) {
      return <Loading />
    }
    return (
      <>
        <Container maxWidth="xl" disableGutters>
          <Box sx={{
          display:"flex", 
          flexWrap:"wrap",
          justifyContent:"space-evenly", 
          alignItems:"center", alignContent:"center", 
          padding:"10px",
          minHeight:"100vh"
          }}>
            
              {props.search && props.search.length > 0 ? props.search.map((valObj,index) => 
              <Box key={index} sx={{width:{lg:"23%",md:"23%", sm:"40%", xs:"80%"}}}>
                <Paper sx={{
                  display:"flex", flexDirection:"column",
                  flexWrap:"nowrap",
                  justifyContent:"space-between", alignContent:"space-evenly", 
                  p:3, mt:2,
                  minHeight:"650px"}}>
                
                <CardMedia image={valObj.poster ? valObj.poster : "https://placehold.co/800x600/000000/ffffff?text=Placeholder"} alt="Movie Poster" 
                title="movie poster" sx={{height:{sm:"230px", xs:"650px"}, width:"100%"}} />

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
            ) : (
              <Container maxWidth="xl" disableGutters>
                <Box sx={{
                display:"flex", flexWrap:"nowrap",
                justifyContent:"space-evenly", 
                alignItems:"center", alignContent:"center", 
                padding:"10px",
                height:"100vh"
                }}>
                  <Typography variant="h4">
                    No Movies were found :/
                  </Typography>
                </Box>
              </Container>
            )
            }
            
            </Box>
            
            <InfiniteScroll 
            next={props.handleLoadMoreData}
            dataLength={props.search.length}
            hasMore={props.numOfPages > props.search.length}
            loader={<Loading />}
            endMessage={<NoMoreData />}
            />

          </Container>
      </>
    )
  };