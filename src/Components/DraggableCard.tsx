import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  todoId: number;
  todoText: string;
  index: number;
}

function DraggableCard({ todoId, index, todoText }: IDraggableCardProps) {
  return (
    <Draggable draggableId={todoId + ""} index={index}>
      {(drag, snapshot) => (
        <Card
          ref={drag.innerRef}
          {...drag.dragHandleProps}
          {...drag.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  background: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0 2px 5px rgba(0, 0, 0, 0.2)" : "none"};
  // 블록 금지(임시)
  user-select: none;
`;

export default memo(DraggableCard);
