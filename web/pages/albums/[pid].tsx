import React from "react";
import TrackList from "../../frontend/components/Tracklist";
import styled from "styled-components";
import Header from "../../frontend/components/Header";
import { DefaultCollector, DefaultEmitter } from "../../event";

const StyleAlbumPage = styled.div``;

const AlbumPage = ({ Albums }: any) => {
  return (
    <DefaultCollector>
      <DefaultEmitter>
        <h1>event emitter test</h1>
      </DefaultEmitter>

      <StyleAlbumPage>
        <Header
          cover={Albums.cover}
          albumName={Albums.albumName}
          description={Albums.description}
        />

        <DefaultEmitter>
          <TrackList Tracks={Albums.Tracks} />
        </DefaultEmitter>
      </StyleAlbumPage>
    </DefaultCollector>
  );
};

export default AlbumPage;

export async function getStaticPath() {
  const apiUrl = process.env.API_URL;
  const apiPort = process.env.API_PORT;

  const res = await fetch(`${apiUrl}:${apiPort}/api/albums`);
  const albums = await res.json();
  const paths = albums.map((album: any) => `/albums/${album.id}`);

  return { paths, fallback: false };
}

export async function getServerSideProps({ params }: any) {
  const apiUrl = process.env.API_URL;
  const apiPort = process.env.API_PORT;

  const res = await fetch(`${apiUrl}:${apiPort}/api/albums/${params.pid}`);
  const { Albums } = await res.json();

  return { props: { Albums } };
}
