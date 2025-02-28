import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NoPage(props) {
    return (
        <>
            <Container maxWidth="xl" disableGutters>
                <Box sx={{height:"90vh", p:3}}>
                    <Typography variant="h2">
                        Page not found :/
                    </Typography>
                    <br />
                    <Link to={"/"}>
                        <Button variant="outlined">
                            Return Home?
                        </Button>
                    </Link>
                </Box>
            </Container>
        </>
    )
}