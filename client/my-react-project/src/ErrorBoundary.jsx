import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

export default function FallbackErrorBoundary() {
  return (
    <>
      <Container disableGutters maxWidth="xl" 
      sx={{
        height:"100vh", 
        bgcolor:"common.black", color:"common.white",
        display:"flex", flexDirection:"column",
        justifyContent:"center", alignItems:"center"
        }}>
          <Paper elevation={3} sx={{
            p:3, bgcolor:"#121212",
            display:"flex", flexDirection:"column",
            justifyContent:"center", alignItems:"center"
          }}>
            <Typography variant="h4" sx={{color:"common.white"}}>
              Something's gone wrong :/
            </Typography>
            <Button href="/" variant="contained" sx={{m:1, bgcolor:pink[500]}}>
                Go to homepage?
            </Button>
          </Paper>
      </Container>
    </>
  )
}
