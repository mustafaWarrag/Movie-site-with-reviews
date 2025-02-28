import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import img1 from "../images/placeholder-image-1.jpg"
import img2 from "../images/placeholder-image-2.jpg"
import img3 from "../images/placeholder-image-3.jpg"
import img4 from "../images/placeholder-image-4.jpg"
let images = [img1, img2, img3, img4];
import Pagination from "./Pagination.jsx";

export default function SearchResults(props) {
  let navi = useNavigate();
    
    useEffect(()=>{  //re-render the component on every search change
      //props.handleSearch(); //calling this would be stupid since that would lead to the componenet endlessly re-rendering
      navi(`/search?${props.queryType}=${props.query}&page=${props.page}`);


      //props.setLoading(false);
    },[props.search]);
    
    useEffect(()=>{ //re-render the component on every page change
      props.handleSearch(); 
      navi(`/search?${props.queryType}=${props.query}&page=${props.page}`);


      //props.setLoading(false); //something about this re-calls the handleSearch function with the first page results
    },[props.page]);

    
    if (props.loading) {
      return (
        <div className="modal-box">
          <div className="loader"></div>
        </div>
      )
    }
    

    return (
      <>
        <div style={{display:"flex",justifyContent:"space-evenly", padding:"10px", flexWrap:"nowrap"}}>
          {props.search.map((valObj,index) => <div className="search movies" style={{width:"23%"}} key={index}>
            <img src={valObj.poster? valObj.poster : img1} alt="Movie Poster" title="movie poster" style={{height:"230px"}} />
            <h3>{valObj.title}</h3>
            <p>{valObj.plot}</p>
            <span className="rated" style={{color:"cyan"}} >Rated:<br />{valObj.rated ? valObj.rated : "Unknown"}</span>
            <ul>{valObj.genres.map((vals, ind) => <li key={ind}>{vals}</li> )}</ul>
            <Link to={`/movies/id/${valObj._id}`}>View Reviews</Link>
          </div> )}
        </div>

          <div className="footer-pagination" style={{display:"flex", justifyContent:"center"}}>

            <Pagination page={props.page} handlePagination={props.handlePagination} 
            numOfPages={props.numOfPages}
            />

          </div>
      </>
    )
} 