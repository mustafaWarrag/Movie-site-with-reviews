//import { Link, Outlet } from "react-router-dom"
import { useEffect } from "react";
import {Outlet, Link, useNavigate} from "react-router";
import { Box, Button, Container, Divider, FormControl, MenuItem, Select, SvgIcon, TextField, Typography } from "@mui/material";
import Footer from "./Footer.jsx";
import { PauseCircle, SearchTwoTone } from "@mui/icons-material";
import myIcon from "../assets/motion-play.svg";

export default function Navigation(props) {
    let navi = useNavigate();

    useEffect(()=>{
      //props.handleSearch();
      //navi(`/search?${props.queryType}=${props.query}&page=${props.page}`);
    },[props.page])

    return (
        <>
        <Container disableGutters maxWidth="xl">
          <Box sx={{
            p:2, pb:0,
            display:"flex", flexWrap:"nowrap", 
            flexDirection:"row",
            justifyContent:"space-between", alignItems:"center"
            }}>
              <Box sx={{
              display:"flex", flexWrap:"nowrap", 
              flexDirection:"row", alignItems:"center"
              }}>
              <Typography variant="h4" sx={{
                display:"inline-block", m:0, 
                fontFamily:"Rubik, serif", fontWeight:300
                }}>
                  Movies 
                  <img src={myIcon} style={{verticalAlign:"middle"}} />
              </Typography>
              
                <Link to={"/"} >
                  <Button variant="contained" 
                  sx={{
                    display:"inline-block", 
                    m:1,
                    //color:"primary.main",
                    ":hover":{
                      textDecoration:"underline"
                    }}}>
                    Home
                  </Button>
                </Link>
            
                {props.user.name ? (
                  <Box> 
                    <Link to={"/"} onClick={()=>{props.setUser({name:null, id:null})}}>
                      <Typography sx={{
                        display:"inline-block", m:1,
                        color:"primary.main",
                        ":hover":{
                          textDecoration:"underline"
                        }
                      }}>
                        Logout
                      </Typography>
                    </Link>
                    <Typography variant="h5">
                      Welcome {props.user.name}
                    </Typography>
                  </Box>
                ) : (
                  <Link to={"/login"}>
                    <Button variant="contained"
                    sx={{
                        display:"inline-block",
                        //color:"primary.main",
                        ":hover":{
                          textDecoration:"underline"
                        }
                      }}>
                        Login
                      </Button>
                  </Link>
                  )
                }
                </Box>

              <FormControl sx={{
                p:2, pb:0, pt:0,
                display:"flex", 
                flexWrap:"nowrap", flexDirection:"row",
                justifyContent:"space-between", alignItems:"center"
              }} 
              onSubmit={(e)=>{
                  e.preventDefault();
                  props.handleSearch(); //calling this after every submit will lead to the SearchResult comp being re-rendered
                  props.setPage(0); //to reset the page number on every new search
                  props.setLoading(true); //very sus
                  
                  //navi(`/search?${props.queryType}=${props.query}&page=${props.page}`);
                  navi("/search");
                  }}>
                <TextField type="search" onChange={props.handleChange} value={props.input} placeholder='Search For Movies'
                sx={{
                  height:"10%",
                  width:"400px",
                  m:1}} 
                slotProps={{
                  input:{
                    startAdornment:(
                    <SearchTwoTone htmlColor="#f93" sx={{mr:1}} />
                    )
                  }
                }} />
                <span>
                  <Button type="submit" variant="outlined" sx={{height:"10%", ml:1}}>
                    search
                  </Button>
                  <Select sx={{display:"none"}}
                  value={"All Ratings"}
                  onChange={props.handleSelection}>
                    {props.ratings.map((val, index)=> 
                    index === 0 ? 
                    <MenuItem key={index} value={val} defaultValue>{val}</MenuItem> 
                    : 
                    <MenuItem key={index} value={val}>{val}</MenuItem>
                    )}
                  </Select>
                </span>
              </FormControl>
            </Box>
      </Container>

      <Divider sx={{mb:2, borderColor:"primary.main"}} />

        <Outlet />
        <Footer />
      </>
    )
} 