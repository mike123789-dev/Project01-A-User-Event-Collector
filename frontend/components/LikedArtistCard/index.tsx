import React from "react";
import styled from "styled-components";
import { Artist } from "../../interfaces";
import Img from "../Img";
import LikeButton from "../Button/LikeButton";

interface LikedArtistProps {
  varient: string;
  artist: Artist;
}

const StyledLikedArtist = styled.div`
  position: relative;
  & > img {
    margin-bottom: 1rem;
  }
  & > button {
    color: #fe1250;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    left: auto;
  }
  & svg {
    width: 1rem;
    height: 1rem;
  }
`;

const StyledArtistName = styled.div`
  text-align: center;
  width: 100%;
`;

const LikedArtistCard: React.FC<LikedArtistProps> = ({ varient, artist }: LikedArtistProps) => {
  return (
    <StyledLikedArtist>
      <Img varient={varient} src={artist.cover} />
      <LikeButton />
      <StyledArtistName>{artist.artistName}</StyledArtistName>
    </StyledLikedArtist>
  );
};

export default LikedArtistCard;
