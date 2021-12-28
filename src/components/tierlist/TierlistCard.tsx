import { Draggable, DraggableStateSnapshot } from "react-beautiful-dnd";
import { Item } from "../redux/reducers/tierlist";
import Image from "next/image";
import test from "./default1.jpeg";

export type Props = {
  item: Item;
  index: number;
};

/**
 * Removes drop animation when Draggable over "delete" draggable
 * @param style 
 * @param snapshot 
 * @returns 
 */
function getStyle(style: any, snapshot: DraggableStateSnapshot) {
  if (!snapshot.isDropAnimating || snapshot.draggingOver !== "delete") {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
}

export default function TierlistCard({ item, index }: Props) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          <Image
            className=""
            width={80}
            height={80}
            src={item.URL}
            alt={"ffff"}
          />
        </div>
      )}
    </Draggable>
  );
}
