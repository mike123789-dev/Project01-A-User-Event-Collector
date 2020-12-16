import React, { FC, useEffect, useState } from "react";
import icons from "../../constant/icons";
import myAxios from "../../utils/myAxios";
import { StyledEmptyHeart, StyledFilledHeart } from "../Playbar/styled";

interface Props {
  type: "Tracks" | "Playlists" | "Albums" | "Artists";
  targetId: number;
}

const Heart: FC<Props> = ({ type, targetId }: Props) => {
  const [isLike, setIsLike] = useState(false);
  const reqPath = `/library/${type.toLowerCase()}/${targetId}`;

  useEffect(() => {
    const likedItem = localStorage.getItem("likedItem");
    if (likedItem !== null) {
      const { [`liked${type}`]: baseArray } = JSON.parse(likedItem);
      setIsLike(baseArray.includes(targetId));
    }
  }, []);

  const likeBtnHandler = () => {
    (async () => {
      if (!isLike) {
        await myAxios.post(reqPath, {}).then(() => {
          myAxios.get("/users/likedItem").then((res: any) => {
            localStorage.setItem("likedItem", JSON.stringify(res.data));
          });
        });
      } else {
        await myAxios.delete(reqPath).then(() => {
          myAxios.get("/users/likedItem").then((res: any) => {
            localStorage.setItem("likedItem", JSON.stringify(res.data));
          });
        });
      }
    })();

    setIsLike(!isLike);
  };

  return (
    <>
      {isLike ? (
        <StyledFilledHeart onClick={likeBtnHandler}>{icons.emptyHeart}</StyledFilledHeart>
      ) : (
        <StyledEmptyHeart onClick={likeBtnHandler}>{icons.emptyHeart}</StyledEmptyHeart>
      )}
    </>
  );
};

export default Heart;
