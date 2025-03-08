import { Button, Container, Typography } from "@mui/material";

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
        <Typography variant="h4">
          Something's gone wrong :/
        </Typography>
        <Button href="/" variant="contained" sx={{m:1}}>
            Go to homepage?
        </Button>
      </Container>
    </>
  )
}
