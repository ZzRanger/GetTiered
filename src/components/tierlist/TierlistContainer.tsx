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

  const { name, categories, unsorted, id } = tierlistData;

  // TODO: Create better way to filter Items into categories

  return (
    <div className="h-full">
      {/* <Header /> */}
      <div> Get Tiered </div>
      <hr />
      <div> {name} </div>
      <div className="">
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            {categories.map((elm, index) => (
              // TODO: Implement CardContainer
              // Pass in Item props
              <div key={elm.id}>
                <CardContainer name={elm.name} id={elm.id} items={elm.content} />
              </div>
            ))}
            <div key={unsorted.id}>
              <CardContainer name={unsorted.name }id={unsorted.id} items={unsorted.content} />{" "}
              {/* Contains unsorted cards */}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
