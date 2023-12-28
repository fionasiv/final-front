import { useContext } from "react";
import { ThemeContext } from "../../App";
import * as S from "./Error.style";
import { useNavigate } from "react-router-dom";

export default function NotFound(props: any) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const redirect = () => {
    navigate(props.url);
  };

  return (
    <S.ErrorWrapper>
        <S.Image src={props.image} />
      <S.TextArea>
        <S.Title coloring={theme.hexColor}>{props.title}</S.Title>
        <S.Description color={theme.hexColor}>{props.descripton}</S.Description>
        {props.linkTitle && (
          <S.Description color={theme.hexColor}>
            או {" "}
            <S.otherPageLink onClick={redirect} color={theme.hexColor}>
              {props.linkTitle}
            </S.otherPageLink>
          </S.Description>
        )}
      </S.TextArea>
    </S.ErrorWrapper>
  );
}
