import { Button, CardActions, styled } from '@mui/material';
import Card from '@mui/material/Card';
import DeleteIcon from "@mui/icons-material/Delete";


export const ClassCard = styled(Card) ({
    width: "15vw"
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
    marginTop: "3vh"
})

export const Delete = styled(DeleteIcon)<{coloring: string}>(({coloring}) => ({
    color: coloring,
}))

export const StudentsButton = styled(Button) ({
    color: "black",
    fontWeight: "400",
    fontSize: "16px"
})