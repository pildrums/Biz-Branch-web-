import { todoState } from "atoms";
import Board from "Components/Board";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

// variable / constant

function App() {
  // state
  const [todos, setTodos] = useRecoilState(todoState);

  // function
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;

    // non movement
    if (!destination) return;

    // same board movement
    if (destination?.droppableId === source.droppableId) {
      setTodos((current) => {
        const boardCopy = [...current[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) Delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...current,
          [source.droppableId]: boardCopy,
        };
      });
    }

    // cross board movement
    if (destination?.droppableId !== source.droppableId) {
      setTodos((current) => {
        // 1) Delete item on source.index
        const sourceBoard = [...current[source.droppableId]];
        const taskObj = sourceBoard[source.index]
        sourceBoard.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        const destinationBoard = [...current[destination?.droppableId]];
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...current,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: destinationBoard,
        };
      });
    }
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
