import { Droppable } from "react-beautiful-dnd";
import { Item } from "../redux/reducers/tierlist";
import TierlistCard from "./TierlistCard";

/**
 * This is the horizontal container that holds the Cards of the tierlist
 * @param param0
 * @returns
 */

export type Props = {
  name: string;
  id: string;
  items: Item[];
};
export default function CardContainer({ name, id, items }: Props) {
  return (
    <div className="h-20 border-4">
      <Droppable droppableId={id} direction="horizontal">
        {(provided,snapshot) => (
          
          <div className="flex flex-row" ref={provided.innerRef} {...provided.droppableProps}>
            <h2> {name}</h2>
            {items.map((item,index) => (
              <div key={index}>
                <TierlistCard item={item} key={item.id} index={index} />
                </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
