import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  todos: string[];
  boardId: string;
}

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

function Board({ todos, boardId }: IBoardProps) {
  return (
    <Container>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(drop, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={drop.innerRef}
            {...drop.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableCard todo={todo} index={index} key={todo} />
            ))}
            {drop.placeholder}
          </Area>
        )}
      </Droppable>
    </Container>
  );
}

const Container = styled.div`
  background: ${(props) => props.theme.boardColor};
  color: ${(props) => props.theme.textColor};
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background: ${(props) =>
    props.isDraggingOver
      ? "rgba(255, 255, 255, 0.1)"
      : props.isDraggingFromThis
      ? "rgba(0, 0, 0, 0.2)"
      : "none"};
  flex-grow: 1;
  border-radius: inherit;
  transition: background 0.3s ease-in-out;
`;

export default Board;

/*
Object.keys(obj)
Object.keys() 메소드는 주어진 객체의 속성 이름들을 일반적인 반복문과 
동일한 순서로 순회되는 열거할 수 있는 배열로 반환합니다.
*/
