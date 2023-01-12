import styled from 'styled-components';
import { PRIMARY } from '../utils/constanst';

export default function Title({title, subtitle}) {
    return (
            <Top>{title}</Top>
    )
}

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`

const Top = styled.h1`
    color: ${PRIMARY};
    font-size: 4vw;
    backdrop-filter: blur(10px) brightness(150%);
    padding: 50px;
    border-radius: 25px;
    font-family: "Archivo", sans-serif;

    background-image: linear-gradient(
      -225deg,
      ${PRIMARY} 0%,
      #5c1bf5 50%,
      ${PRIMARY} 100%
    );
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 2s linear infinite;
    display: inline-block;
    @keyframes textclip {
        to {
            background-position: 200% center;
        }
    }
`;