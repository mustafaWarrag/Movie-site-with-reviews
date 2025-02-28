import { GitHub, LinkedIn } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";

export default function Footer(props) {
    return (
        <>
            <Container maxWidth="xl" disableGutters>
                <Box sx={{
                    display:"flex", 
                    p:1.5,
                    borderTop:"2px solid",
                    borderColor:"primary.light", 
                    bgcolor:"common.black",
                    justifyContent:"space-between",
                }}>
                    <Typography variant="h5" sx={{fontStyle:"italic", letterSpacing:".4rem"}}>
                        Mustafa Warrag &copy;2025
                    </Typography>
                    <ButtonGroup>
                        <Button>
                            <GitHub />
                        </Button>
                        <Button>
                            <LinkedIn />
                        </Button>
                    </ButtonGroup>
                </Box>
            </Container>
        </>
    )
}