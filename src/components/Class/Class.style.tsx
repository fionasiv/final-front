import { Button, CardActions, styled } from '@mui/material';
import Card from '@mui/material/Card';
import DeleteIcon from "@mui/icons-material/Delete";
import { mediaTheme } from '../../Theme';

export const ClassCard = styled(Card) ({
    [mediaTheme.breakpoints.up('md')]: {
        width: "16vw"
    },
    [mediaTheme.breakpoints.only('md')]: {
        width: "20vw"
    },
    [mediaTheme.breakpoints.only('sm')]: {
        width: "25vw"
    },
    [mediaTheme.breakpoints.only('xs')]: {
        width: "40vw"
    },
    [mediaTheme.breakpoints.down('xs')]: {
        width: "60vw"
    }
})

export const ClassName = styled("h3") ({
    margin: "1vh 0vw",
    fontSize: "20px"
})

export const SeatsLeft = styled("p") ({
    margin: "0vh",
})

export const SeatsTotal = styled("small") ({
    color: "gray",
})

export const Actions = styled(CardActions) ({
    marginTop: "3vh",
    display: "flex",
    justifyContent: "space-between"
})

export const Delete = styled(DeleteIcon)<{coloring: string}>(({coloring}) => ({
    color: coloring,
}))

export const StudentsButton = styled(Button) ({
    color: "black",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "2.75vh",
    textAlign: "initial"
})