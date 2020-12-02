import React from "react";
// import { Album } from "../../frontend/components/interface";
import { useRouter } from "next/router";
// import prisma from "../../prisma";

const AlbumPage = ({ album }: any) => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <>
      {console.log(pid)}
      {console.log(album)}
    </>
  );
};

export default AlbumPage;

export async function getStaticPath() {
  const res = await fetch("http://localhost:3000/api/albums");
  const albums = await res.json();
  const paths = albums.map((album: any) => `/albums/${album.id}`);

  return { paths, fallback: false };
}

export async function getServerSideProps({ params }: any) {
  const res = await fetch(`http://localhost:3000/api/albums/${params.pid}`);
  const album = await res.json();

  return { props: { album } };
}
