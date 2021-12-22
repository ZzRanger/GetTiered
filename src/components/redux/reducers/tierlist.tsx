import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
/**
 * Data type for tierlists
 */
export type TierlistObj = {
  name: string;
  categories: Category[];
  unsorted: Category;
  id: string;
};

/**
 * Represents each row on the tierlist
 */
export type Category = {
  id: string;
  name: string;
  content: Item[];
};

/**
 * Creates a Category object
 * @param id unique identifier for category
 * @param name name of category (i.e. 'S')
 * @param content holds the items inside the category
 * @returns Category
 */
export const CategoryObj = (
  id: string,
  name: string,
  content: Item[] = []
): Category => ({ id, name, content });

/**
 * This is the individual element inside the tierlist
 */
export type Item = {
  id: string;
  URL: string;
  caption: string;
};

/**
 * Creates an Item object
 * @param id unique identifier for item
 * @param URL location that item is stored inside the browser
 * @param caption text description of item
 * @returns Item
 */
export function ItemObj(id: string, URL: string, caption = ""): Item {
  return { id, URL, caption };
}

/**
 * Object that stores data grouped by tierlist
 * Key: tierlist name
 * Object: TierlistObj
 */
export type TierlistMap = {
  [name: string]: TierlistObj;
};

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
      ItemObj(uuid(), "Test", ""),
      ItemObj(uuid(), "Test2", ""),
      ItemObj(uuid(), "Test3", ""),
      ItemObj(uuid(), "Test4", ""),
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
      ItemObj(uuid(), "Test", ""),
      ItemObj(uuid(), "Test2", ""),
      ItemObj(uuid(), "Test3", ""),
      ItemObj(uuid(), "Test4", ""),
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
        console.log("RAN");
      }
    },
    /* Action.payload contains  */
    /**
     * Removes Items from tierlist
     * @param state tierlist state
     * @param action object: {active: string; id: string, category: string, index: string}
     */
    deleteImages: (state, action) => {
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
  createTierlist,
  renameTierlist,
  addItems,
  updateImageTier,
  deleteImages,
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
