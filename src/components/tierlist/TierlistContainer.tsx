import { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import CardContainer from "./CardContainer";
import {
  deleteImage,
  renameTierlist,
  updateImageTier,
} from "../redux/reducers/tierlist";
import { changeSession } from "../redux/reducers/currentSession";
import MyDropzone from "../MyDropzone";
import { getFirestore } from "@firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import { saveTierlist } from "../firebase/firebase";

export default function TierlistContainer() {
  const color = [
    "bg-red-400",
    "bg-orange-300",
    "bg-yellow-200",
    "bg-green-200",
    "bg-green-400",
  ];

  const db = getFirestore();
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  // useEffect(() => console.log(tierlistData, title));
  const onDragEnd = (DragObject: DropResult) => {
    if (DragObject.destination) {
      if (DragObject.destination?.droppableId === "delete") {
        dispatch(
          deleteImage({
            active: activeTierlist,
            id: DragObject.draggableId,
            category: DragObject.source.droppableId,
            index: DragObject.source.index,
          })
        );
      }
      // TODO: Update Redux store here
      // Learn what's inside DragObject

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

  const saveToFirebase = async () => {
    // Save current session
    let copyOfTierlistData = JSON.parse(JSON.stringify(tierlistData));

    let res = await saveTierlist(copyOfTierlistData);
    console.log(res);
  };

  return (
    <div className="py-10 px-40">
      <div className="flex flex-row justify-between">
        <input
          type="text"
          onBlur={(event) => {
            if (event.target.value !== name) {
              dispatch(
                renameTierlist({
                  active: activeTierlist,
                  rename: event.target.value,
                })
              );
              dispatch(changeSession(event.target.value));
            }
          }}
          placeholder={"Add tierlist name"}
          spellCheck={false}
          className="bg-transparent text-6xl focus:outline-none "
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button
          className="text-4xl mb-2 bg-gray-700 rounded-2xl px-4 hover:shadow-2xl hover:bg-gray-900"
          onClick={saveToFirebase}
        >
          {" "}
          Save{" "}
        </button>
      </div>
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
                  <div
                    className={`text-5xl flex  ${color[index]} text-black w-20 h-full justify-center items-center`}
                  >
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
              className="flex flex-row items-center w-full h-20 "
            >
              <CardContainer
                name={unsorted.name}
                id={unsorted.id}
                items={unsorted.content}
              />{" "}
              <Droppable droppableId="delete" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    className="h-20 w-16"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="text-6xl">
                      <DeleteIcon fontSize="inherit" />
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        )}
        <MyDropzone />
      </div>
    </div>
  );
}
