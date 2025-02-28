import { useEffect, useState } from "react"
import MovieRequests from "../apiRequests/MovieRequests.js";
import { useNavigate, useParams } from "react-router";

export default function CreateReview(props) {

    const [review, setReview] = useState(""); //state to handle review input 
    const [hasSubmitted, changeSub] = useState(false); //state to handle whether a review has been submitted or not

    const [hidden, setHidden] = useState(true); //state to handle the "add-review" input and button
    const [editing, setEditing] = useState(false); //state to handle when we're editing a review or not

    let params = useParams();
    let navi = useNavigate();


    function handleInput(e) {
        setReview(e.target.value);
        /*
        if (review.length < 3) {
            setReview("");
            return 
            //sanitize input
        }
        */
    }

    function serveReview() {
        let data = {
            review:review,
            name:props.user.name,
            userId:props.user.id,
            movieId:params.id
        }
        /*
        MoviesService.addReview(data).then((response)=> {
            console.log("review has been successfully submitted");
            changeSub(true);
            //navi(`/movies/id/${params.id}/`); //doesnt work
        }).catch((err)=> {
            console.error(err);
            changeSub(false);
        })
        */
    }

    function reviewExists() {
         if (props.views) {  
            props.views.map((v,i)=> {
                if (v.user_id === props.user.id) {
                    console.log(`v:${v.user_id} and current user:${props.user.name} match`) 
                    changeSub(true);
                    setReview(v.review);
                    }
            })
        }
        console.log(`has submitted: ${hasSubmitted}`)
    }

    function editReview() {
        let currentReviewId = "";
        if (hasSubmitted == true && editing == true) {
            console.log(`editing now...`);
            props.views.map((v,i) => {
                if (v.user_id === props.user.id) {
                    currentReviewId = v._id; 
               
                    let data = {
                        reviewId:currentReviewId,
                        review:review,
                        userId:props.user.id
                    };
                    /*
                    MoviesService.updateReview(data).then((response)=> {
                        console.log("review successfully updated");
                        //editing = false;
                        //navi(`/movies/id/${params.id}`);
                    }).catch((err)=>{
                        console.error(err);
                    })
                    */ 
                }
            });
        }
    }

    function delReview() {
        let currentReviewId = "";
        props.views.map((v)=> {
            if (v.user_id === props.user.id) {
                currentReviewId = v._id;
        
                console.log(`current review's id:${currentReviewId}`);
                /*
                MoviesService.deleteReview(currentReviewId, props.user.id).then((response)=>{
                    console.log("review has been deleted");
                    window.location.reload(); //only solution i found
                    //but it logs the user out

                    //use auth token to store the login session
                    //and then store it in the local storage
                    //then sign the user out if the token expired
                    
                    // learn how to use JWT and Passport [done] 
                    // and probably Mongoose [done]
                   
                    note to self:
                    test the react app with Jest/Mocha
                    figure out how to improve speed and perfomance
                    and cache images and site
                    dont forget the API key stuff too
                    and use GraphQL
                    

                }).catch((err)=>{
                    console.error(err);
                })
                */
            }
        })
    }

    useEffect(()=>{
        
        //ALL OF THIS is very scuffed
        //very very scuffed
        //though it kinda works
        
        //just need to sanitize inputs and logins 
        //as well as implment a system where users' info is actually stored in the database

        //also dont forget to reload the page on every add/edit/delete of a review
        //and find a way to be automatically signed in

        reviewExists();
    },[]);

    useEffect(()=>{

    },[hasSubmitted])

    return(
        <> 
            {hasSubmitted? (
                <div>
                    <h3>"{review}"</h3>
                    <button hidden={editing} onClick={(e)=>{
                        setEditing(true);
                    }}>
                        Edit Review
                    </button>
                    <span id="edit-box" hidden={!editing}>
                        <input type="text" value={review} onChange={handleInput} />
                        <button onClick={()=>{editReview()}}>
                            Submit edit
                        </button>
                    </span>
                    <button onClick={()=>{delReview()}}>Delete Review</button>
                </div>
            ) : (
            <div>
                <button onClick={()=>{setHidden(false)}}>Add Review</button>
                <br/>
                <div id="create-review-box" hidden={hidden} >
                    <input type="text" placeholder="write your review" required value={review} onChange={handleInput} />
                    <button onClick={()=>{serveReview()}}>Submit review</button>
                </div>
            </div>
        )}
        </>
    )
}