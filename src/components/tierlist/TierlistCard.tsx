import { Draggable } from 'react-beautiful-dnd';
import { Item } from '../redux/reducers/tierlist';

export type Props = {
    item: Item,
    index: number
}
export default function TierlistCard({ item, index }: Props) {
    // console.log("HIIII", item, index);
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided,snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps}>
                    <h4>{item.URL}</h4>
                </div>
            )}
        </Draggable>
    )
}