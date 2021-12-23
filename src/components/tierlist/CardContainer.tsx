import { Droppable } from "react-beautiful-dnd";
import FileUploader from "../FileUpload";
import MyDropzone from "../MyDropzone";
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
    <div className="h-full w-full -mt-px " key={id}>
      
      <Droppable droppableId={id} direction="horizontal">
        {(provided,snapshot) => (
          
          <div className="flex flex-row items-center " ref={provided.innerRef} {...provided.droppableProps}>
          
           
            {items.map((item,index) => (
              <div key={index}>
                <TierlistCard item={item} key={item.id} index={index} />
                </div>
            ))}
            {provided.placeholder}
            {/* Invisible element to keep droppable open */}
             <div className="block h-20"> </div> 
           
          </div>
        )}
      </Droppable>
    </div>
  );
}
