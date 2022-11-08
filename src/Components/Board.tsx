import { ITodo } from "atoms";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  todos: ITodo[];
  boardId: string;
}

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IForm {
  todo: string;
}

function Board({ todos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    setValue("todo", "");
  };
  return (
    <Container>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(drop, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={drop.innerRef}
            {...drop.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableCard
                todoId={todo.id}
                todoText={todo.text}
                index={index}
                key={todo.id}
              />
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
  padding-top: 10px;
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
      ? props.theme.dragColor
      : props.isDraggingFromThis
      ? props.theme.dropColor
      : "none"};
  flex-grow: 1;
  border-radius: inherit;
  transition: background 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: inherit;
  }
`;

export default Board;

/*
Object.keys(obj)
Object.keys() 메소드는 주어진 객체의 속성 이름들을 일반적인 반복문과 
동일한 순서로 순회되는 열거할 수 있는 배열로 반환합니다.
*/
