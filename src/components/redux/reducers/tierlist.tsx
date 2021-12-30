import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { TierlistObj,CategoryObj,ItemObj,TierlistMap,Item } from "./types";

const createNewTierlist = (name: string): TierlistObj => {
  return {
    name: name,
    categories: [
      CategoryObj(uuid(), "S", []),
      CategoryObj(uuid(), "A", []),
      CategoryObj(uuid(), "B", []),
      CategoryObj(uuid(), "C", []),
      CategoryObj(uuid(), "D", []),
    ],
    unsorted: CategoryObj(uuid(), "empty", [
      ItemObj(uuid(), "/img/default1.jpeg", ""),
      ItemObj(uuid(), "/img/default2.jpeg", ""),
      ItemObj(uuid(), "/img/default3.jpeg", ""),
      ItemObj(uuid(), "/img/default4.jpeg", ""),
    ]),
    id: uuid(),
  };
};

const initialState: TierlistMap = {
  untitled: {
    name: "untitled",
    categories: [
      CategoryObj(uuid(), "S", []),
      CategoryObj(uuid(), "A", []),
      CategoryObj(uuid(), "B", []),
      CategoryObj(uuid(), "C", []),
      CategoryObj(uuid(), "D", []),
    ],
    unsorted: CategoryObj(uuid(), "empty", [
      ItemObj(uuid(), "/default1.jpeg", "hi"),
      ItemObj(uuid(), "/default2.jpeg", "hi2"),
      ItemObj(uuid(), "/default3.jpeg", "hi3"),
      ItemObj(uuid(), "/default4.jpeg", "hi4"),
    ]),
    id: uuid(),
  },
};

/**
 * Redux slice object that stores TierlistObj[]
 */
export const tierlistStore = createSlice({
  name: "tierlistStore",
  initialState,
  reducers: {
    /**
     * Loads tierlist data from Firestore (called only if tierlist instance exists in Firestore)
     * @param state current tierlist state
     * @param action tierlist state obtained from Firestore
     */
    getTierlistFromFirebase: (state,action) => {
      state[action.payload.name] = action.payload;
    },
    /* Action.payload is null */
    createTierlist: (state, action) => {
      let counter = 1;
      while (true) {
        let name = "untitled" + counter;
        if (Object.keys(state).includes(name)) {
          counter += 1;
        } else {
          state[name] = createNewTierlist(name);
          break;
        }
      }
    },
    /**
     * Creates a new TierlistObj with the new name and deletes the old TierlistObj
     * @param state tierlist state
     * @param action object: {active: string, rename: string}
     */
    renameTierlist: (state, action) => {
      state[action.payload.rename] = state[action.payload.active];
      state[action.payload.rename].name = action.payload.rename;
      delete state[action.payload.active];
    },
    /**
     * Adds items to the tierlist
     * @param state tierlist state
     * @param action object: {active: string, images: string}
     */
    addItems: (state, action) => {
      const active = action.payload.active;
      state[active].unsorted.content.push(
        ...action.payload.images.map((image: string, index: number) =>
          ItemObj(uuid(), image)
        )
      );
    },

    /**
     * Updates Category location of Item on tierlist
     * @param state tierlist state
     * @param action object: {active: string; id:string; oldCategory: string, oldIndex: number, newCategory: string, newIndex: number}
     */
    updateImageTier: (state, action) => {
      const { active, id, oldCategory, oldIndex, newCategory, newIndex } =
        action.payload;

      const currTierlist = state[active];
      let elm: Item;

      // Pop Item from old category
      if (oldCategory !== currTierlist.unsorted.id) {
        currTierlist.categories.every((value, index, arr) => {
          if (value.id === oldCategory) {
            elm = arr[index].content.splice(oldIndex, 1)[0];
            return false;
          }
          return true;
        });
      } else {
        elm = currTierlist.unsorted.content.splice(oldIndex, 1)[0];
      }

      // Add Item to new category
      if (newCategory !== currTierlist.unsorted.id) {
        currTierlist.categories.every((value, index, arr) => {
          if (value.id === newCategory) {
            arr[index].content.splice(newIndex, 0, elm);
            return false;
          }
          return true;
        });
      } else {
        currTierlist.unsorted.content.splice(newIndex, 0, elm!);
        
      }
    },
    /* Action.payload contains  */
    /**
     * Removes Item from tierlist
     * @param state tierlist state
     * @param action object: {active: string; id: string, category: string, index: string}
     */
    deleteImage: (state, action) => {
      const { active, id, category, idx } = action.payload;
      const currTierlist = state[active];
      if (category !== "empty") {
        currTierlist.categories.every((value, index, arr) => {
          if (value.id === category) {
            arr[index].content.splice(idx, 1);
          }
        });
      } else {
        currTierlist.unsorted.content.splice(idx, 1);
      }
    },
  },
});

export const {
  getTierlistFromFirebase,
  createTierlist,
  renameTierlist,
  addItems,
  updateImageTier,
  deleteImage,
} = tierlistStore.actions;

export default tierlistStore.reducer;

/* 
add image: adds images to redux
update image: update image tier location

Data Types
tiers: tierlist[]

tierlist:
 - name: tierlist name
 - content: images []
*/
