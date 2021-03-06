import React, { useState } from "react";
import styled from "styled-components";
import Ellipsis from "../../Ellipsis";
import EllipsisModal from "../../Ellipsis/EllipsisModal";
import HoverPlayButton from "../../Button/HoverPlayButton";

interface StyledProps {
  hover?: boolean;
}

interface Props {
  hover?: boolean;
}

export const StyledGeneralHoverCover = styled.div<StyledProps>`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 1.75rem;
  left: 0rem;
  cursor: pointer;
  z-index: 200;
`;

const PlayButton = styled(HoverPlayButton)`
  position: absolute;
  bottom: 10%;
  left: 10%;
`;

const GeneralHoverCover: React.FC<Props> = ({ hover }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (e: MouseEvent) => {
    setShowModal(!showModal);
  };

  return (
    <>
      {hover ? (
        <StyledGeneralHoverCover>
          <PlayButton />
          <Ellipsis onClick={handleShowModal} />
        </StyledGeneralHoverCover>
      ) : (
        ""
      )}
      {showModal ? <EllipsisModal /> : ""}
    </>
  );
};

export default GeneralHoverCover;
