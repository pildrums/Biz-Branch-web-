import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const todos = ["a", "b", "c", "d", "e", "f"];

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Boards>
          <Droppable droppableId="one">
            {(drop) => (
              <Board ref={drop.innerRef} {...drop.droppableProps}>
                {todos.map((todo, index) => (
                  <Draggable draggableId={todo} index={index}>
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

export default App;
