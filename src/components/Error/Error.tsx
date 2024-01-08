import * as S from "./Error.style";
import { useNavigate } from "react-router-dom";
import { ErrorProps } from "./ErrorInterfaces";
import { useTheme } from "../../contexts/Theme";

export default function NotFound({
  url,
  image,
  title,
  description,
  linkTitle,
}: ErrorProps) {
  const theme = useTheme()[0];
  const navigate = useNavigate();

  const redirect = () => {
    if (url) {
      navigate(url);
    }
  };

  return (
    <S.ErrorWrapper>
      <S.Image src={image} />
      <S.TextArea>
        <S.Title coloring={theme.hexColor}>{title}</S.Title>
        <S.Description color={theme.hexColor}>{description}</S.Description>
        {linkTitle && (
          <S.Description color={theme.hexColor}>
            או{" "}
            <S.otherPageLink onClick={redirect} color={theme.hexColor}>
              {linkTitle}
            </S.otherPageLink>
          </S.Description>
        )}
      </S.TextArea>
    </S.ErrorWrapper>
  );
}
