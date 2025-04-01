import styled from 'styled-components';
import { DoorButton } from './DoorButton';

const LayoutContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RoomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const RoomTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  margin: 0;
`;

export const Layout = () => {
  return (
    <LayoutContainer>
      <RoomSection>
        <RoomTitle>My Room</RoomTitle>
        <DoorButton name="MyRoom_door" onClick={() => console.log('MyRoom clicked')} />
      </RoomSection>

      <RoomSection>
        <RoomTitle>Living Room</RoomTitle>
        <DoorButton name="LivingRoom_door" onClick={() => console.log('LivingRoom clicked')} />
      </RoomSection>

      <RoomSection>
        <RoomTitle>Kitchen</RoomTitle>
        <DoorButton name="Kitchen_door" onClick={() => console.log('Kitchen clicked')} />
      </RoomSection>
    </LayoutContainer>
  );
}; 