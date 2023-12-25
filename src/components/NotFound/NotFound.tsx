import { useContext } from "react";
import { ThemeContext } from "../../App";
import NotFoundPurple from "./images/notfoundpurple.jpg";
import NotFoundRed from "./images/notfoundred.png";
import * as S from "./NotFound.style";
import { Modes } from "../../Enums";
import { useNavigate } from "react-router-dom";

export default function NotFound(props: any) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const redirect = () => {
    navigate(props.url)
  }

  return (
    <S.FormFields>
      <S.TextArea>
        <S.Title coloring={theme}>{props.title}</S.Title>
        <S.Description color={theme}>
          {props.descripton} <br /> או <S.otherPageLink onClick={redirect} color={theme}>{props.linkTitle}</S.otherPageLink>
        </S.Description>
      </S.TextArea>
      <S.Image src={theme === Modes.PURPLE_MODE ? NotFoundPurple : NotFoundRed } />
    </S.FormFields>
  );
}
