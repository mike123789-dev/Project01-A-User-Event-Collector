import React, { memo, MouseEvent, useState, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Artist, Track } from "../../interfaces";
import Img from "../Img";
import icons from "../../constant/icons";
import { RootState } from "../../reduxModules";
import {
  StyledPlaybar,
  StyledTrackSection,
  StyledImgSection,
  StyledTrackArtist,
  StyledMainControlSection,
  StyledSideControlSection,
  StyledTrackTime,
  StyledTrackVolume,
  StyledTrackVolumeSlide,
  StyledPlaylistButtonWrapper,
  StyledPlaylistButton,
  StyledMainButtons,
  StyledSideButtons,
  StyledMiddleButtons,
  StyledPlayButtons,
} from "./styled";
import PlaybarTrackCard from "./PlaybarTrackCard";

interface Props {
  handleShowPlaylist: (e: MouseEvent) => void;
  showPlaylist: boolean;
}
const emptyTrack: Track = {
  id: 0,
  albumTrackNumber: 0,
  trackName: "",
  albumId: 0,
  Albums: { cover: "", id: 0, artistId: 0, albumName: "" },
  Artists: [{ artistName: "", id: 0, cover: "" }],
  Liked: false,
};

const Playbar: FC<Props> = memo(({ handleShowPlaylist, showPlaylist }: Props) => {
  const playList: Track[] = useSelector((state: RootState) => state.playQueue);
  const [headTrack, setHeadTrack] = useState<Track>(emptyTrack);

  useEffect(() => {
    if (playList.length <= 0) setHeadTrack(emptyTrack);
    else setHeadTrack(playList[0]);
  }, [playList]);

  const dispatch = useDispatch();
  const [volume, setVolume] = useState<number>(50);
  const fullPlayTime = "3:32";
  const currentPlayTime = "1:32";

  const {
    id: trackId,
    trackName,
    Albums: { cover, id: albumId },
    Artists,
    Liked: liked,
  } = playList[0] ? playList[0] : emptyTrack;

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setVolume(parseInt(e.currentTarget.value, 10));
  };

  const artists = (playingArtist: Artist[]) =>
    playingArtist.map((el, idx) => {
      if (idx === Artists.length - 1) {
        return (
          <Link href={`/artists/${el.id}`}>
            <StyledTrackArtist>{el.artistName}</StyledTrackArtist>
          </Link>
        );
      }
      return (
        <Link href={`/artists/${el.id}`}>
          <StyledTrackArtist>{el.artistName}</StyledTrackArtist>
          <span>, </span>
        </Link>
      );
    });

  return (
    <StyledPlaybar onClick={handleShowPlaylist}>
      <StyledTrackSection>
        <Link href={`/albums/${albumId}`}>
          <StyledImgSection>
            {cover ? (
              <Img varient="nowPlayingCover" src={cover} />
            ) : (
              <Img
                varient="nowPlayingCover"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIWFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFhktLSsrKystKysrKysrLSsrKy0tKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAJRABAQEAAAUEAgMBAAAAAAAAAAERAiFRYYEScZHwMUGh4fHB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOK0Se2LIBqpFgAfKbgLAANAAME0FNTF9IEolhmAuJhLTQCcXhNzp8lv2gbv4Xb+2bJ++Rn7/wCgu/dNT4TekoLb28LLGfVy/vmk4vANZfb70PbzjN4ep7A145M7epfvM9XwB6Z18ls6JvwWgvpWSd/dmdk0G/V2/wBOLindPV28G6C9Wk1dAIRPnwDV4icSG/IL/JzZn2meQW3qb3N7ciARdiXiScILeJObW4esEtpOOr6yZQPyzhZi+oElTl1+YVL9/oDbC9/4OyAvt/q8/wAZ/TKA1nfn3QtQBqfKb2SAqKYCGlXQQ0AWVKANrnRIgKuoAudfys+UoCms0gKTkJQWRbxISgeleQmAsk6VMMTQal6slT9guTyhSAgAFNQAAAABcTAAVAAAAXU0GxFADAAEBaQSA1UKABF0DyVAAABmtJQKkWpwgYigCCggEAwAAABUAANAXEWUGkFBA0ADSgsqU1aCpwnCWYAEABcMBEXABmLVwGeKqmLQQABFxAApgBhpQNBAWQ0qAvgSLoAiwGgUEAAqoYC0QgKSABFEsAwNXQZ0ka1nQXGbVANRQEqRQEwVAXUCAUUoMqqWAUhgCKYAi4iwGgAAAAAKtQgKEAMNNADDADBADQAAANRUAAACQAwSRQMDABFUGYKAiyBoNJQBUFBAAFQBQAAAAABAFQAAAAAAoAlUAKACKAYAAiwAMAFRcAQAAFBAUAAAwAAKCaKmgIoAGKAigILQAoAIpQEVAAAAABTQEUBCrUAIAGKABAAAAAATFQAFAlIiwDAgAAAYtQACAIoCKAIKAGBgAoCAAFAAwACCgIoCCoAABQAAAVFIAGAAAFiABAXAQIoJigAABEUAABBQBFAIUAAAAAQAFIABABFAFiABUigAAIRQEqwACABAAf/Z"
              />
            )}
          </StyledImgSection>
        </Link>

        <PlaybarTrackCard
          trackId={headTrack.id}
          trackName={headTrack.trackName}
          artist={artists(headTrack.Artists)}
        />
      </StyledTrackSection>

      <StyledMainControlSection>
        <StyledMainButtons>
          <StyledSideButtons>{icons.random}</StyledSideButtons>
          <StyledMiddleButtons>{icons.previous}</StyledMiddleButtons>
          <StyledPlayButtons>{icons.play}</StyledPlayButtons>
          <StyledMiddleButtons>{icons.next}</StyledMiddleButtons>
          <StyledSideButtons>{icons.repeat}</StyledSideButtons>
        </StyledMainButtons>
      </StyledMainControlSection>
      <StyledSideControlSection>
        <StyledTrackTime>
          {currentPlayTime} / {fullPlayTime}
        </StyledTrackTime>
        <StyledTrackVolume>
          <StyledTrackVolumeSlide
            type="range"
            value={volume}
            onChange={handleVolume}
            onClick={stopPropagation}
          />
        </StyledTrackVolume>
        <StyledPlaylistButtonWrapper>
          <StyledPlaylistButton showPlaylist={showPlaylist}>{icons.list}</StyledPlaylistButton>
        </StyledPlaylistButtonWrapper>
      </StyledSideControlSection>
    </StyledPlaybar>
  );
});

export default Playbar;
