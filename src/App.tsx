import { todoState } from "atoms";
import Board from "Components/Boards";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

// variable / constant

function App() {
  // state
  const [todos, setTodos] = useRecoilState(todoState);

  // function
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    // setTodos((current) => {
    //   const copyTodos = [...current];
    //   // 1) Delete item on source.index
    //   copyTodos.splice(source.index, 1);
    //   // 2) Put back the item on the destination.index
    //   copyTodos.splice(destination?.index, 0, draggableId);
    //   return copyTodos;
    // });
  };

  // render
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
      </Container>
    </DragDropContext>
  );
}

// style
const Container = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export default App;
