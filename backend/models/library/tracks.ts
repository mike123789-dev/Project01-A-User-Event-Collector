import prisma from "../../prisma";
import { getTrackCard } from "../tracks";

const getUserLikeTracks = async (id: number): Promise<[]> => {
  const trackIdArr: any = await prisma.users_Like_Tracks.findMany({
    where: { userId: id },
  });
  const tracks: any = await Promise.all(
    trackIdArr.map((elem: any) => getTrackCard(elem.trackId))
  );
  return tracks;
};

const postUserLikeTracks = async (
  userId: number,
  trackId: number
): Promise<String | Error> => {
  try {
    await prisma.users_Like_Tracks.create({
      data: {
        Users: {
          connect: { id: userId },
        },
        Tracks: {
          connect: { id: trackId },
        },
      },
    });
    return "Success Post";
  } catch (err) {
    return new Error("Fail Post");
  }
};
const deleteUserLikeTracks = async (
  userId: number,
  trackId: number
): Promise<String | Error> => {
  try {
    await prisma.users_Like_Tracks.deleteMany({
      where: {
        userId,
        trackId,
      },
    });
    return "Success Delete";
  } catch (err) {
    return new Error("Fail Delete");
  }
};
export { getUserLikeTracks, postUserLikeTracks, deleteUserLikeTracks };
