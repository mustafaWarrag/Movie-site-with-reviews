import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as badwords from "bad-words";
import { login, signout } from "../redux/reducers.js";

import UserRequests from "../apiRequests/UserRequests.js";
import { Box, Button, Container, IconButton, Modal, Paper, styled, TextField, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const MyBox = styled(Box)({
    height:"80vh", width:"99%",
    display:"flex", flexDirection:"column",
    justifyContent:"center", alignItems:"center",
    flexWrap:"nowrap",
});

export default function Login(props) {
    const username = useSelector((store) => store.user.username);
    const token = useSelector((store) => store.user.token);
    const dispatch = useDispatch();

    const [modalOpen, setModal] = useState(false); //one state to handle two alternating modal boxes
    const [error, setError] = useState("");
    
    let filter = new badwords.Filter;

    function badwordsCheckers(e) {
        if (filter.isProfane(e.target.value)) {
        setError("Input contains bad words");
        throw new Error("Input contains bad words");
        } else {
            setError("");
        }
    }

    const [input, setInput] = useState({});
    const [signInput, setSign] = useState({});
    
    let navi = useNavigate();

    function handleDetails(e) {
        let val = e.target.value;
        let nam = e.target.name;
        setInput((prev) => ({...prev, [nam]:val}));
    }
    function handleSignUp(e) {
        let val = e.target.value;
        let nam = e.target.name;
        setSign((prev) => ({...prev, [nam]:val}));
    }

    function createUser() {
        let data = {
            username:signInput.username,
            password:signInput.password
        };
        if (!data.username || !data.password) {
            setError("Error! Fill in the required fields");
            throw new Error("");
        }
        UserRequests.createUser(data).then((res) => {
            let cred = res.data.data.createUser;
            let errors = res.data.errors;
            //console.log(errors);
            //console.log(cred);
            if (!cred._id) {
                throw new Error(errors[0].message);
            }
            dispatch(login(cred));
            window.localStorage.setItem("token", token);
            //console.log(cred);
            //console.log(`username:${username}, token:${token}`);
            navi("/");
        }).catch((err) => {
            console.error(err);
            setError("Username may already exist");
        })
    }

    function signInHandle() {
        let data = {
            username:input.username,
            password:input.password
        };
        if (!data.username || !data.password) {
            setError("Error! Fill in the required fields");
            throw new Error("");
        }
        UserRequests.manageLogin(data).then((res) => {
            let cred = res.data.data.handleLogin;
            if (!cred.token) {
                throw new Error("something gone wrong"); 
            }
            dispatch(login(cred));
            localStorage.setItem("token", JSON.stringify(cred.token));
            //console.log(res.data.data);
            //console.log(`username:${username}, token:${token}`);
            navi("/");
        }).catch((err) => {
            //console.error(err);
            setError("Invalid Credentials or User may not exist")
        });
    }

    return (
        <div style={{display:"flex",alignContent:"center", flexDirection:"column", padding:"10px", flexWrap:"wrap"}}>
        {username ? 
        <Box className="logging" style={{margin:"10px"}}>
            <Typography variant="h3">Account Info here:</Typography>
            <Typography variant="h4">username:{username}</Typography>
        </Box>
        : 
        <Container disableGutters maxWidth="xl">
            <MyBox >
            {/* Log In */}
            <Modal sx={{alignContent:"center"}}
            disableScrollLock
            open={modalOpen} 
            onClose={()=>{setModal(false)}}
            >
                <MyBox sx={{height:"50vh"}}>
                    <Paper sx={{
                        width:"60vw", p:4,
                        display:"flex", flexDirection:"column",
                        justifyContent:"end", alignItems:"center", 
                        textAlign:"center",
                        flexWrap:"nowrap"
                    }}>
                        <IconButton onClick={()=>{setModal(false)}} 
                        sx={{
                            position:"relative",
                            top:0, left:"50%"
                        }}>
                            <Close />
                        </IconButton>
                        <Typography variant="h5">
                            Login here
                        </Typography>
                        <TextField type="text" required label="Your Username" onInput={badwordsCheckers} margin="normal" fullWidth
                        name="username" value={input.username || ""} onChange={handleDetails} />

                        <TextField type="password" required label="Your Password" onInput={badwordsCheckers} margin="normal" fullWidth
                        name="password" value={input.password || ""} onChange={handleDetails} />

                        <Typography variant="overline" sx={{color:"error.main"}}>
                            {error}
                        </Typography>
                        <Button variant="contained" disabled={error? true : false} sx={{display:"inline-block", width:"30%", m:2}} 
                        onClick={()=>{
                            signInHandle();
                        }}>
                            Login
                        </Button>
                        <Button variant="outlined" sx={{color:"secondary.main", borderColor:"secondary.main"}} 
                        onClick={()=>{setModal(false)}}>
                            Don't have an account? Sign Up here!
                        </Button>
                    </Paper>
                </MyBox>
            </Modal>
            
            {/* Create Account */}
                <MyBox>
                    <Typography variant="h4" sx={{textAlign:"center"}}>Sign Up!</Typography>

                    <TextField type="text" required label="Enter your username" onInput={badwordsCheckers} margin="normal" sx={{width:"50%"}}
                    name="username" value={signInput.username || ""} onChange={handleSignUp} />

                    <TextField type="password" required label="Enter your password" onInput={badwordsCheckers} margin="normal" sx={{width:"50%"}}
                    name="password" value={signInput.password || ""} onChange={handleSignUp} />

                    <Typography variant="overline" sx={{color:"error.main"}}>
                        {error}
                    </Typography>
                    
                    <Button variant="contained" color={"info"}
                    disabled={error? true : false} 
                    onClick={()=>{
                        createUser();
                    }}
                    sx={{m:1}}>
                        Create Account
                    </Button>

                    <Button variant="outlined" color={"warning"} 
                    onClick={()=>{setModal(true)}}
                    sx={{m:1}}>
                        Already have an account? Login here
                    </Button>
                </MyBox>
            </MyBox>
        </Container>
        }
        </div>
    )
}