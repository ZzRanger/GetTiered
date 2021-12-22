import { Draggable } from 'react-beautiful-dnd';
import { Item } from '../redux/reducers/tierlist';

export type Props = {
    item: Item,
    index: number
}
export default function TierlistCard({ item, index }: Props) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided,snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps}>
                    <img width={100} height={100} src={item.URL} alt={item.caption} />
                    
                </div>
            )}
        </Draggable>
    )
}