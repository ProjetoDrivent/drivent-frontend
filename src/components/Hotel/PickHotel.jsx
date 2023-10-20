import styled from 'styled-components';
import { Typography } from '@mui/material';
import HotelCard from './HotelCard.jsx';
import { useEffect, useRef, useState } from 'react';
import { getHotels } from '../../services/hotelApi.js';
import RoomCard from './RoomCard.jsx';
import useToken from '../../hooks/useToken.js';

export default function PickHotel() {
  const [hotelsList, setHotelsList] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(-1);
  const [selectedRoom, setSelectedRoom] = useState(-1);
  const [showRooms, setShowRooms] = useState(false);
  const token = useToken();
  const containerRef = useRef();

  function handleShowRooms(resRooms) {
    setRooms(resRooms);
    setShowRooms(true);
  }

  function scrollToRooms() {
    console.log(containerRef.current.scrollTop, containerRef.current.scrollHeight);
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }

  useEffect(() => {
    async function getAndSetHotels() {
      const hotels = await getHotels(token);
      setHotelsList(hotels);
    }
    getAndSetHotels();
  }, []);

  return (
    <div ref={containerRef}>
      <StyledTypography variant={'h6'}>Primeiro, escolha seu hotel</StyledTypography>
      <HotelCardContainer>
        {hotelsList.map((hotel) => {
          return (
            <HotelCard
              key={'Hotel ' + hotel.id}
              scroll={scrollToRooms}
              $hotel={hotel}
              $selected={selectedHotel}
              $selectHotel={setSelectedHotel}
              $setPickRooms={handleShowRooms}
            />
          );
        })}
      </HotelCardContainer>
      <div style={{ visibility: showRooms ? 'visible' : 'hidden' }}>
        <StyledTypography variant={'h6'}>Ótima pedida! Agora escolha seu quarto:</StyledTypography>
        <RoomsContainer>
          {rooms.map((room) => {
            return (
              <RoomCard key={'Room ' + room.id} $room={room} selected={selectedRoom} setSelected={setSelectedRoom} />
            );
          })}
        </RoomsContainer>
      </div>
      <div style={{ visibility: selectedRoom != -1 ? 'visible' : 'hidden' }}>
        <BookRoomButton>
          <StyledTypography variant={'h6'}>RESERVAR QUARTO</StyledTypography>
        </BookRoomButton>
      </div>
    </div>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  font-size: 20px;
  font-weight: 400;
  color: #8e8e8e;
`;

const HotelCardContainer = styled.div`
  width: fit-content;
  max-width: 100%;
  overflow-x: scroll;
  display: flex;
  align-items: center;

  padding-bottom: 15px;
  margin-bottom: 25px;

  > * {
    &:first-child {
      margin-left: 0px;
    }
  }
  > * {
    &:last-child {
      margin-right: 0px;
    }
  }
`;

const RoomsContainer = styled.div`
  width: 860px;

  margin-top: 15px;

  display: grid;
  grid-template-columns: repeat(4, 200px);
  row-gap: 10px;
  column-gap: 20px;
`;

const BookRoomButton = styled.button`
  width: 200px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #e0e0e0;
  margin-top: 50px;
  margin-bottom: 150px;

  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }

  > * {
    margin: 0px !important;
    font-size: 16px !important;
    font-weight: 400 !important;

    color: #000000 !important;
  }
`;
