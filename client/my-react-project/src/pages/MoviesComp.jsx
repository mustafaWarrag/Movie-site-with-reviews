import { useEffect } from "react"
import { Link, useParams } from "react-router";
import MovieRequests from "../apiRequests/MovieRequests.js";
import img3 from "../images/placeholder-image-3.jpg"
import CreateReview from "./CreateReview.jsx";
import { Box, CardMedia, CircularProgress, Container, Paper, Skeleton, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

export default function MovieComp(props) {
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
                display:"flex", flexWrap:"nowrap",
                justifyContent:"space-between", p:3}}>
                <Box sx={{flexBasis:"40%"}}>
                    <CardMedia image={val.poster? val.poster : img3} 
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
                    {props.user.name ? 
                            <CreateReview user={props.user} views={val.reviews} />
                                :
                            <Link to={"/login"}><button style={{margin:"10px"}}>Login to add review</button></Link>
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
                                {views.name}
                            </Typography>
                            <Typography variant="subtitle1" sx={{fontSize:"1.1rem", fontWeight:300, textIndent:"5px"}}>
                                {views.review}
                            </Typography>

                            {views.stars && [...new Array(views.stars)].map((val,ind) => <Star key={ind} htmlColor="#f19" />) }
                            {/* implement a star rating in the Review model */}

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