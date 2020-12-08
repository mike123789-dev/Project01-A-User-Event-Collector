import React from "react";
import Link from "next/link";
import {
  StyledSamples,
  StyledSectionTitle,
  StyledSampleWrapper,
  StyledSample,
  StyledCover,
  StyledInfo,
  StyledName,
  StyledArtist,
  StyledIcon,
} from "./styled";
import Img from "../../Img";
import icons from "../../../constant/icons";

interface SampleProps {
  name: string;
  artists: string | [];
  cover: string;
}

const Sample = ({ name, artists, cover }: SampleProps): React.ReactElement => {
  return (
    <StyledSample>
      <StyledCover>
        <Img varient="nowPlayingCover" src={cover} />
      </StyledCover>
      <StyledInfo>
        <StyledName>{name}</StyledName>
        <StyledArtist>{typeof artists === "string" ? artists : "노래 아티스트 조인"}</StyledArtist>
        {/* TODO: 노래 artist join으로 변경 */}
      </StyledInfo>
    </StyledSample>
  );
};

interface SamplesProps {
  sectionTitle: string;
  data: SampleProps[];
  filter: string;
}

const Samples = ({ sectionTitle, data, filter }: SamplesProps): React.ReactElement => {
  const page = sectionTitle === "노래" ? "tracks" : sectionTitle === "앨범" ? "albums" : "artists";
  return (
    <StyledSamples>
      <Link href={`/search/${page}?filter=${filter}`}>
        <StyledSectionTitle>
          {sectionTitle}
          <StyledIcon>{icons.angleRight}</StyledIcon>
        </StyledSectionTitle>
      </Link>
      <StyledSampleWrapper>
        {data.map((el: any) => {
          const name =
            sectionTitle === "노래"
              ? el.trackName
              : sectionTitle === "앨범"
              ? el.albumName
              : el.artistName;

          const artists =
            sectionTitle === "노래"
              ? ["아티스트1", "아티스트2", "예정"]
              : sectionTitle === "앨범"
              ? el.Artists.artistName
              : "아티스트";
          return (
            <Sample
              name={name}
              artists={artists}
              cover={sectionTitle === "노래" ? el.Albums.cover : el.cover}
            />
          );
        })}
      </StyledSampleWrapper>
    </StyledSamples>
  );
};

export default Samples;
