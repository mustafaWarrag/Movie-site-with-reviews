import { useState } from "react";
import { useNavigate } from "react-router";
export default function Login(props) {
    //implement a login function with input boxes and what not
    //warning, headache incoming
    //also remember to insert every user into the database with an id
    //window.history.state
    const [username, setName] = useState("");
    const [userId, setUserId] = useState("");
    let navi = useNavigate();

    function handleName(e) {
        setName(e.target.value);
    }
    function handleId(e) {
        setUserId(e.target.value);
    }

    return (
        <div style={{display:"flex",alignContent:"center", flexDirection:"column", padding:"10px", flexWrap:"wrap"}}>
        {props.user.name ? 
        <span className="logging" style={{margin:"10px"}}>
            <h2>Account Info here:</h2>
            <h3>username:{props.user.name}</h3>
        </span>
        : 
        <>
            <h3 style={{textAlign:"center"}}>Enter your details</h3>
            <input type="text" required placeholder="username here" value={username} onChange={handleName} style={{margin:"10px"}} />
            <input type="text" required placeholder="id here" value={userId} onChange={handleId} style={{margin:"10px"}} />
            <button onClick={()=>{
                props.setUser({name:username, id:userId});
                console.log(props.user);
                navi("/");
                }}>
                    create account
                </button>
        </>
        }
        </div>
    )
}