import { todoState } from "atoms";
import { memo } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

// variable / constant

function App() {
  // state
  const [todos, setTodos] = useRecoilState(todoState);

  // function
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setTodos((current) => {
      const copyTodos = [...current];
      // 1) Delete item on source.index
      copyTodos.splice(source.index, 1);
      // 2) Put back the item on the destination.index
      copyTodos.splice(destination?.index, 0, draggableId);
      return copyTodos;
    });
  };

  // render
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Boards>
          <Droppable droppableId="one">
            {(drop) => (
              <Board ref={drop.innerRef} {...drop.droppableProps}>
                {todos.map((todo, index) => (
                  <Draggable draggableId={todo} index={index} key={todo}>
                    {(drag) => (
                      <Card
                        ref={drag.innerRef}
                        {...drag.dragHandleProps}
                        {...drag.draggableProps}
                      >
                        {todo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {drop.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Container>
    </DragDropContext>
  );
}

// style
const Container = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  background: ${(props) => props.theme.boardColor};
  color: ${(props) => props.theme.textColor};
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  background: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

export default memo(App);
