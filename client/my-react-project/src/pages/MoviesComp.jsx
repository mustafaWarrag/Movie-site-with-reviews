
import { Box, Button, CardMedia, CircularProgress, Container, Paper, Skeleton, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useEffect } from "react"
import { Link, useParams } from "react-router";

//import img3 from "../images/placeholder-image-3.jpg"
import CreateReview from "./CreateReview.jsx";
import MovieRequests from "../apiRequests/MovieRequests.js";

export default function MovieComp(props) {
    const username = useSelector((store)=> store.user.username);

    function grabMovieById(id) {
        MovieRequests.queryById(id).then((response)=>{
            let res = response.data.data.getMovieById[0];
            props.setInfo([res]);
            props.setLoading(false);
            console.log(res);
            console.log(id);
        }).catch((err)=> {
            console.error(err);
            props.setLoading(false);
        })
        
    }
    let params = useParams(); //the goat
    
    function dateFixer(date) {
        let update = new Date(date);
        let year = update.getFullYear();
        let month = update.getMonth() + 1;
        let day = update.getDate();
        return `${year}/${month}/${day}`
      }

    useEffect(()=>{
        props.setLoading(true);
        grabMovieById(params.id);
        console.log(typeof params.id);
        console.log(`url params: ${params.id}`);
    }, [params.id])

    if (props.loading) {
        return (
            <>
            <Box sx={{
                display:"flex", flexWrap:"nowrap",
                justifyContent:"space-between", p:3
                }}>
                <Skeleton variant="rectangular" height="530px" width={"400px"} />
                <Box sx={{width:"60%", p:3, pt:0}}>
                    <Skeleton variant="text" height="20px" />
                    <Skeleton variant="rectangular" height="60px" />
                    <br />
                    <Skeleton variant="rectangular" height="40px" />
                    <br />
                    <Skeleton variant="rounded" height="20px" width="20%" />
                </Box>
            </Box>
            <Skeleton variant="rectangular" height="80px" width="95%" sx={{m:3}} />
            </>
        )
    }

    return (
        <>
        <Container maxWidth="xl" disableGutters>
            {props.info.slice(0, 1).map((val, index) =>  
            <div key={index}>
            <Box  sx={{
                display:"flex", flexWrap:{sm:"nowrap", xs:"wrap"},
                justifyContent:"space-between", p:3}}>
                <Box sx={{flexBasis:{sm:"40%", xs:"100%"}}}>
                    <CardMedia image={val.poster? val.poster : "https://placehold.co/1280x768/000000/ffffff"} 
                    sx={{
                        height:"530px",
                        backgroundSize:"contain"
                        }} />
                </Box>

                <Box sx={{p:3, flexShrink:2}}>
                    <Typography variant="h3" sx={{fontWeight:700}}>
                        {val.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{fontWeight:300, fontSize:"1.5rem"}}>
                        {val.plot}
                    </Typography>
                    <Typography variant="overline" sx={{color:"primary.400", fontSize:"1.1rem"}}> 
                        Rated:{val.rated? val.rated : "Unknown"}
                    </Typography>
                    
                    <div>
                        Genres:
                        {val.genres.map((vals,ind, arr) => ind !== arr.length-1? (<Typography key={ind} variant="body1"
                            sx={{display:"inline", color:"secondary.main"}}>
                            {vals}, 
                            </Typography>) : (<Typography key={ind} variant="body1"
                            sx={{display:"inline", color:"secondary.main"}}>
                            {vals}
                            </Typography>)
                        )}
                    </div>
                    <br />
                    {username ? 
                            <CreateReview setLoading={props.setLoading} grabMovieById={grabMovieById} />
                                :
                            <Link to={"/login"}><Button sx={{margin:"10px"}}>Login to add review</Button></Link>
                    }
                </Box>

            </Box>

                <Box sx={{
                        bgcolor:"common.black",
                        border:"2px solid", borderRadius:"20px",
                        borderColor:"info.main",
                        p:5, m:3
                        }}>
                    {val.reviews && val.reviews.length > 0 ? val.reviews.map((views, indices) => 
                        <Paper variant="outlined" key={indices} sx={{m:2, p:2}}>
                            <Typography variant="h5" sx={{color:"primary.main", fontWeight:800}}>
                                {views.username}
                            </Typography>
                            <Typography variant="subtitle1" sx={{fontSize:"1.1rem", fontWeight:300, textIndent:"5px"}}>
                                {views.review}
                            </Typography>

                            {[...new Array(views.stars + 1)].map((val,ind) => <Star key={ind} htmlColor="#f19" />) }
                            
                            <Typography sx={{textAlign:"right", color:"secondary.200"}}>
                                Uploaded:
                                <em>{dateFixer(views.date)}</em>
                            </Typography> 
    
                        </Paper>) : <Box>
                                No reviews for this movie :/
                        </Box>}
                </Box>

            </div>
      )}
        </Container>
        </>
    )
}