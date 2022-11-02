import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  todo: string;
  index: number;
}

function DraggableCard({ todo, index }: IDraggableCardProps) {
  return (
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
  );
}

const Card = styled.div`
  background: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  // 블록 금지(임시)
  user-select: none;
`;

export default memo(DraggableCard);
