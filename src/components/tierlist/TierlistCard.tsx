import { Draggable } from 'react-beautiful-dnd';
import { Item } from '../redux/reducers/tierlist';
import Image from 'next/image';
import test from './default1.jpeg';

export type Props = {
    item: Item,
    index: number
}
export default function TierlistCard({ item,index }: Props) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided,snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps}>
                    <Image className="" width={80} height={80} src={item.URL} alt={"ffff"} />
                </div>
            )}
        </Draggable>
    )
}