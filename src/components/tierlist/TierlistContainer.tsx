import { useState, useEffect } from "react";
import {
  DragDropContext,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import CardContainer from "./CardContainer";
import { renameTierlist,updateImageTier } from "../redux/reducers/tierlist";
import { changeSession } from "../redux/reducers/currentSession";
import FileUploader from "../FileUpload";
import MyDropzone from "../MyDropzone";
export default function TierlistContainer() {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  useEffect(() => console.log(tierlistData, title));
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
  const [title, setTitle] = useState(name);

  return (
    <div className="py-10 px-40">
      {/* <div className="text-6xl">
        {name}
      </div> */}
      <input
        type="text"
        onBlur={(event) => {
          dispatch(
            renameTierlist({
              active: activeTierlist,
              rename: event.target.value,
            }),
            
          )
          dispatch(
            changeSession(
              event.target.value
            )
          )
        }
        }
        placeholder={"Add tierlist name"}
        spellCheck={false}
        className="bg-transparent text-6xl focus:outline-none "
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div className="">
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            {/* Top border of tierlist */}
            <hr className="bg-gray-700 h-0.5" />

            {categories.map((elm, index) => (
              <>
                <div
                  key={elm.id}
                  className="flex flex-row bg-gray-300 h-20 items-center w-full"
                >
                  <div className="text-5xl  flex text-black w-20 h-full justify-center items-center bg-white">
                    {elm.name}
                  </div>
                  <CardContainer
                    name={elm.name}
                    id={elm.id}
                    items={elm.content}
                  />
                </div>
                <hr className="bg-gray-700 h-0.5" />
              </>
            ))}
            {/* Contains unsorted cards */}
            <div
              key={unsorted.id}
              className="flex flex-row items-center w-full"
            >
              <CardContainer
                name={unsorted.name}
                id={unsorted.id}
                items={unsorted.content}
              />{" "}
            </div>
          </DragDropContext>
        )}
        <MyDropzone />
      </div>
    </div>
  );
}
