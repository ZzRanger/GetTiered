import { useState, useEffect } from "react";
import {
  DragDropContext,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import CardContainer from "./CardContainer";
import { updateImageTier } from "../redux/reducers/tierlist";
export default function TierlistContainer() {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  useEffect(() => console.log(tierlistData));
  const onDragEnd = (DragObject: DropResult) => {
    if (DragObject.destination) {
      // TODO: Update Redux store here
      // Learn what's inside DragObject
      console.log(DragObject.destination?.droppableId);
      dispatch(
        updateImageTier({
          active: activeTierlist,
          id: DragObject.draggableId,
          oldCategory: DragObject.source.droppableId,
          oldIndex: DragObject.source.index,
          newCategory: DragObject.destination?.droppableId,
          newIndex: DragObject.destination?.index,
        })
      );
    }
  };
  // {active: string; id:string; oldCategory: string, oldIndex: number, newCategory: string, newIndex: number}
  // TODO: Call Redux store
  const activeTierlist = useSelector(
    (state: RootState) => state.currentSession.active
  );
  const tierlistData = useSelector(
    (state: RootState) => state.tierlistStore[activeTierlist]
  );

  const { name,categories,unsorted,id } = tierlistData;

  return (
    <div className="py-10 px-20">
      
    
      <div className="text-6xl"> {name} </div>
      <div className="">
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
           
            {categories.map((elm,index) => (
              <>
              <div key={elm.id} className="flex flex-row bg-gray-300">
              <div className="text-5xl flex text-black w-24 h-24  justify-center items-center bg-white">{elm.name}</div> 
                <CardContainer name={elm.name} id={elm.id} items={elm.content} />
                </div>
              </>
              
            ))}
            {/* Contains unsorted cards */}
            <div key={unsorted.id}>
              <CardContainer name={unsorted.name }id={unsorted.id} items={unsorted.content} />{" "}
              
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
