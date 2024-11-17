import styled from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';
import { useEffect } from 'react';
import { useCallback } from 'react';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  function togglePopup() {
    setSettings((prevState) => ({
      ...prevState,
      visible: !prevState.visible
    }));
  }
  document.body.style = visible ? 'overflow: hidden;' : 'overflow: auto;';
  const cachedTogglePopup = useCallback(togglePopup, [setSettings]);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('dnLlJK')) {
        cachedTogglePopup(e);
      }
    });
  }, [cachedTogglePopup]);

  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key !== 'Escape') {
        return;
      }
      const isPopupOpened = visible === true;
      if (!isPopupOpened) {
        return;
      }
      cachedTogglePopup();
    }

    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [cachedTogglePopup, visible]);

  return (
    <PopupContainer visible={visible}>
      <StyledPopup>
        <CloseIcon onClick={togglePopup} />

        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />

        <PopupInfo origin={origin} location={location} />

        <PopupEpisodes episodes={episodes} />
      </StyledPopup>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visible 0.3s;

  ${({ visible }) =>
    visible &&
    `
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;
  transition: 2s;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1000px) {
    width: 65%;
  }
  @media (max-width: 768px) {
    width: 85%;
  }
`;

const CloseIcon = styled.div`
  cursor: pointer;
  position: fixed;
  right: calc(30% - 10px);
  top: calc(10vh - 30px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;
  transition: 2s;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
  }

  &:before {
    left: 4.5px;
    transform: rotate(-45deg);
  }

  &:after {
    right: 4.5px;
    transform: rotate(45deg);
  }

  @media (max-width: 1000px) {
    right: calc(18% - 10px);
  }

  @media (max-width: 768px) {
    right: calc(10% - 10px);
  }
`;
