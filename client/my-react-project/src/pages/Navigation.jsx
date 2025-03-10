//import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import {Outlet, Link, useNavigate} from "react-router";
import { Box, Button, Container, Divider, FormControl, IconButton, MenuItem, Select, Drawer, TextField, Typography } from "@mui/material";
import { MenuOutlined, PauseCircle, SearchTwoTone } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import myIcon from "../assets/motion-play.svg";
import Footer from "./Footer.jsx";
import { signout } from "../redux/reducers.js";

export default function Navigation(props) {
    const username = useSelector((store) => store.user.username);
    const token = useSelector((store) => store.user.token);
    const dispatch = useDispatch();

    let [drawerOpen, setDrawer] = useState(false);

    let navi = useNavigate();

    return (
        <>
        <Container disableGutters maxWidth="xl">
          <Box sx={{
            p:2, pb:0,
            display:"flex", flexWrap:"nowrap", 
            flexDirection:"row",
            justifyContent:"space-between", alignItems:"center"
            }}>

              {/* for large screens */}
              <Box sx={{
              display:{lg:"flex", md:"flex", sm:"none"}, 
              flexWrap:"nowrap", 
              flexDirection:"row", alignItems:"center"
              }}>
              <Typography variant="h4" sx={{
                display:"inline-block", m:0, 
                fontFamily:"Rubik, serif", 
                fontWeight:300, fontSize:{lg:"2rem", md:"1.7rem", sm:"1.3rem"} 
                }}>
                  <Typography sx={{
                    display:{lg:"inline", md:"none", sm:"none", xs:"none"},
                    fontSize:{lg:"2rem", md:"1.7rem", sm:"1.3rem"} 
                    }}>
                    Movies
                    </Typography> 
                  <img src={myIcon} style={{verticalAlign:"middle"}} />
              </Typography>
              
                <Link to={"/"} onClick={()=>{
                  props.setPage(0);
                }}>
                  <Button variant="contained" 
                  sx={{
                    display:"inline-block", 
                    m:1,
                    fontSize:{lg:"1rem", md:".8rem", sm:".6rem"},
                    //color:"primary.main",
                    ":hover":{
                      textDecoration:"underline"
                    }}}>
                    Home
                  </Button>
                </Link>
            
                {username ? (
                  <> 
                    <Link to={"/"} onClick={()=>{
                      dispatch(signout());
                      localStorage.clear();
                      }} >
                      <Button variant="outlined" color="primary"
                      sx={{
                        fontSize:{lg:"1rem", md:".8rem", sm:".6rem", xs:".6rem"}
                      }}  
                        >
                        Logout
                      </Button>
                    </Link>
                    <br/>
                    <Typography variant="h5" sx={{ml:1, 
                    fontSize:{lg:"1.3rem", md:"1rem", sm:".8rem", xs:".6rem"},
                    }}>
                      Welcome {username}
                    </Typography>
                  </>
                ) : (
                  <Link to={"/login"} onClick={()=>{
                    props.setPage(0);
                  }}>
                    <Button variant="contained"
                    sx={{
                        display:"inline-block",
                        //color:"primary.main",
                        fontSize:{lg:"1rem", md:".8rem", sm:".6rem", xs:".6rem"},
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

                {/* for small mobile devices */}
                <IconButton centerRipple size={"large"}
                onClick={()=>{
                  setDrawer(true);
                }} 
                sx={{
                  display:{lg:"none", md:"none", sm:"block"},
                  fontSize:"2rem", borderRadius:"30px"
                }}>
                  <MenuOutlined htmlColor={"#f19"} />
                </IconButton>

                <Drawer 
                open={drawerOpen}
                onClose={()=>{setDrawer(false)}}
                anchor={"left"}
                sx={{
                  "& MuiPaper-root-MuiDrawer-paper":{
                    bgcolor:"#000 !important",
                    boxShadow:"none"
                  }
                }}
                >
                  <Box sx={{
                  display:"flex", 
                  flexWrap:"nowrap", 
                  flexDirection:"column", alignItems:"center", width:"30vw"
                  }}>
                  <Typography variant="h4" sx={{
                    display:"inline-block", m:0, 
                    fontFamily:"Rubik, serif", 
                    fontWeight:300, fontSize:"2.3rem" 
                    }}>
                    <img src={myIcon} style={{verticalAlign:"middle"}} />
                  </Typography>
                
                  <Link to={"/"} onClick={()=>{
                    props.setSearch([]);
                    props.setPage(0);
                    setDrawer(false);
                  }}>
                    <Button variant="contained" 
                    sx={{
                      display:"inline-block", 
                      m:1,
                      fontSize:"1.0rem",
                      //color:"primary.main",
                      ":hover":{
                        textDecoration:"underline"
                      }}}>
                      Home
                    </Button>
                  </Link>
              
                  {username ? (
                    <> 
                      <Link to={"/"} onClick={()=>{
                        dispatch(signout());
                        localStorage.clear();
                        setDrawer(false);
                        }} >
                        <Button variant="outlined" color="primary"
                        sx={{
                          fontSize:"1rem"
                        }}  
                          >
                          Logout
                        </Button>
                      </Link>
                      <br/>
                      <Typography variant="h5" 
                      sx={{
                        ml:1, 
                        fontSize:"1rem",
                      }}>
                        Welcome {username}
                      </Typography>
                    </>
                  ) : (
                    <Link to={"/login"} onClick={()=>{
                      props.setPage(0);
                      setDrawer(false);
                    }}>
                      <Button variant="contained"
                      sx={{
                          display:"inline-block",
                          //color:"primary.main",
                          fontSize:"1rem",
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
                </Drawer>

              <FormControl sx={{
                p:4, pb:0, pt:0,
                display:"flex", 
                flexWrap:"nowrap", flexDirection:"row",
                justifyContent:"space-between", alignItems:"center"
              }}>
                <TextField type="search" onChange={props.handleChange} value={props.input} label='Search For Movies'
                sx={{
                  height:"10%",
                  width:{lg:"400px", md:"300px", sm:"200px"},
                  m:1
                }} 
                slotProps={{
                  input:{
                    startAdornment:(
                    <SearchTwoTone htmlColor="#f93" sx={{mr:1}} />
                    )
                  }
                }} />
                  <Button variant="outlined" 
                  sx={{height:"10%", ml:1,
                    fontSize:{lg:"1rem", md:".8rem", sm:".8rem"},
                  }}
                  onClick={()=>{
                    props.setSearch([]);
                    props.setPage(0); //to reset the page number on every new search
                    props.handleSearch(); //calling this after every submit will lead to the SearchResult comp being re-rendered
                    props.setLoading(true);
                    navi("/search?");
                  }}>
                    search
                  </Button>
                  <Select 
                  value={props.filterRating}
                  onChange={props.handleSelection} 
                  sx={{
                    display:"block", 
                    m:1, mr:0, p:"0px",
                    fontSize:{lg:".8rem", md:".6rem", sm:".6rem"},
                  }}
                  slotProps={{
                    input:{
                      //sx:{pr:"20px !important"}
                    }
                  }}
                  >
                    {props.ratings.map((val, index)=> 
                    index === 0 ? 
                    <MenuItem key={index} value={val} defaultValue>{val}</MenuItem> 
                    : 
                    <MenuItem key={index} value={val}>{val}</MenuItem>
                    )}
                  </Select>
              </FormControl>
            </Box>
      </Container>

      <Divider sx={{mb:2, borderColor:"primary.main"}} />

        <Outlet />
        <Footer />
      </>
    )
} 