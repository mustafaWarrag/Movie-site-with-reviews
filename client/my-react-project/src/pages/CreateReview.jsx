import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { Star } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import * as badwords from "bad-words";

import ReviewRequests from "../apiRequests/ReviewRequests.js";

export default function CreateReview(props) {

    const username = useSelector((store) => store.user.username);
    
    const [review, setReview] = useState(""); //state to handle review input 
    const [stars, setStars] = useState(0); //state to handle the stars rating
    const [currentReviewId, setReviewId] = useState("");
    const [error, setError] = useState("");
    const [hasSubmitted, changeSub] = useState(false); //state to handle whether a review has been submitted or not

    const [hidden, setHidden] = useState(true); //state to handle the "add-review" input and button
    const [editing, setEditing] = useState(false); //state to handle when we're editing a review or not

    let params = useParams();
    let navi = useNavigate();

    let filter = new badwords.Filter;

    function handleInput(e) {
        setReview(e.target.value);
        if (filter.isProfane(e.target.value)) {
            setError("Please remove any offensive words");
        } else {
            setError("");
        }
        
    }

    function serveReview() {
        if (filter.isProfane(review)) {
            setError("Please remove any offensive words");
            throw new Error("Remove offensive any words");
        }
        if (review.length < 3) {
            setError("Input is too short, please write more about what you think of the movie");
            throw new Error(""); 
        }
        props.setLoading(true);
        let data = {
            username:username,
            review:review,
            movieId:params.id,
            stars:stars
        }
        ReviewRequests.addReview(data).then((res)=> {
            let response = res.data.data.createReview;
            //console.log(response);
            if (!response.user_id) {
                setError("Unable to post review, try again later")
                throw new Error();
            }
            console.log("review has been successfully submitted");
            props.grabMovieById(params.id);
            changeSub(true);
        }).catch((err)=> {
            //console.error(err);
            changeSub(false);
            props.setLoading(false);
        });

    }

    function reviewExists() {
         if (username) {
            let data = {
                username:username,
                page:0,
                num:10
            } 
            ReviewRequests.getReviewsByUser(data).then((res) => {
                let fetched = res.data.data.getReviewsByUser;
                //console.log(fetched);
                if (!fetched[0] || fetched.length < 0) {
                    throw new Error("No Reviews by this user");
                }
                let foundReview = fetched.find((val, index, arr) => val.movie_id === params.id);
                if (foundReview) {
                    //console.log(foundReview);
                    changeSub(true);
                    setReview(foundReview.review);  
                    setReviewId(foundReview._id);
                    console.log(`currentReviewId:${currentReviewId}`);
                }
            }).catch((err)=> {
                console.error(err);
            })
        }
        //console.log(`has submitted: ${hasSubmitted}`)
    }

    function editReview() {
        if (hasSubmitted === true && editing === true) {
            props.setLoading(true);
            //console.log(`editing now...`);
            let data = {
                id:currentReviewId,
                review:review,
            };
            ReviewRequests.updateReview(data).then((res)=> {
                let response = res.data.data;
                //console.log(response);
                console.log("review successfully updated");
                setEditing(false);
                props.grabMovieById(params.id);
            }).catch((err)=>{
                //console.error(err);
                props.setLoading(false);
            })
        }
    }

    function delReview() {
        props.setLoading(true);
        let data = {
            id:currentReviewId
        } 
        //console.log(`current review's id:${currentReviewId}`);
        ReviewRequests.deleteReview(data).then((res)=>{
            let response = res.data.data;
            //console.log(response);
            console.log("review has been deleted");
            props.grabMovieById(params.id);
            changeSub(false);
            setEditing(false);
        }).catch((err)=>{
            //console.error(err);
            props.setLoading(false);
        }) 
        
    }

    useEffect(()=>{
        reviewExists();
    },[]);

    useEffect(()=>{
    },[hasSubmitted])

    return(
        <> 
            {hasSubmitted? (
                <Box sx={{
                    display:"flex", flexDirection:"column",
                    justifyContent:"center", alignItems:"center",
                    flexWrap:"wrap"
                }}>
                    <Box sx={{display: editing? "none" : "block"}}>
                        <Typography variant="subtitle1">You posted:</Typography>
                        <Typography variant="h5" sx={{color:"secondary.100", m:1, ml:0}}>
                            "{review}"
                        </Typography>
                        <Button variant="outlined" color={"secondary"} 
                        sx={{m:1, ml:0,
                            
                        }}
                        onClick={(e)=>{
                            setEditing(true);
                        }}>
                            Edit Review
                        </Button>
                    </Box>

                    <Box sx={{
                        textAlign:"center", display: editing? "block" : "none"
                    }}>
                        <Typography variant="caption">
                            editing...
                        </Typography>
                        <br />
                        <TextField type="text" value={review} onChange={handleInput} sx={{mb:1}} />
                        <br/>
                        <Button variant="outlined" color={"secondary"} 
                        onClick={()=>{editReview()}}>
                            Submit edit
                        </Button>
                    </Box>
                    <br />
                    <Button variant="contained" color={"warning"} 
                    onClick={()=>{delReview()}}>
                        Delete Review
                    </Button>
                </Box>
            ) : (
            <Box>
                <Button variant="contained" sx={{display:hidden? "block" : "none"}} 
                    onClick={()=>{setHidden(false)}}>
                        Add Review
                </Button>
                
                <Box id="create-review-box" hidden={hidden} >
                    <TextField type="text" label="Write Your Review" required 
                    value={review} onChange={handleInput} margin="normal" fullWidth multiline minRows={3} /> 
                    
                    <Box> 
                        {[...new Array(5)].map((val, index, arr) => index <= stars? (
                            <Star key={index} component="svg" htmlColor="#f19" sx={{cursor:"pointer"}}
                            onClick={(e)=>{
                                setStars(index);
                                console.log(`stars:${stars}`);
                            }} />
                        ) : (<Star key={index} component={"svg"} sx={{cursor:"pointer"}}
                            onClick={(e)=>{
                                setStars(index);
                                console.log(`stars:${stars}`);
                            }}
                            />) 
                        )}
                    </Box>
                    <Typography variant="caption" sx={{color:"error.main"}}>
                        {error}
                    </Typography>
                    <br />
                    <Button variant="outlined" color="secondary" disabled={error? true: false}
                        onClick={()=>{serveReview()}}>
                            Submit review
                    </Button>
                </Box>
            </Box>
        )}
        </>
    )
}