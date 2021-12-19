import { createSlice } from "@reduxjs/toolkit";
import { iteratorSymbol } from "immer/dist/internal";

export type TierlistObj = {
  name: string;
  content: Item[];
  id: number;
  categories: string[];
};

export type Item = {
  id: number;
  URL: string;
  caption: string;
  category: string;
};

export function ItemObj(
  this: any,
  id: number,
  URL: string,
  caption: string,
  category: string
) {
  this.id = id;
  this.URL = URL;
  this.caption = caption;
  this.category = category;
}

export type TierlistMap = {
  [name: string]: TierlistObj;
};

const initialTierlist: TierlistObj = {
  name: "untitled",
  content: [],
  id: 0,
  categories: ["S", "A", "B", "C", "D"],
};

const initialState: TierlistMap = {
  untitled: {
    name: "untitled",
    content: [],
    id: 0,
    categories: ["S", "A", "B", "C", "D"],
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
          state[name] = {
            name,
            content: [],
            id: counter,
            categories: ["S", "A", "B", "C", "D"],
          };
          break;
        }
      }
    },
    /* Action.payload contains {active: string, rename: string} */
    renameTierlist: (state, action) => {
      state[action.payload.rename] = state[action.payload.active];
      state[action.payload.rename].name = action.payload.rename;
      delete state[action.payload.active];
    },
    /* Action.payload contains {active: string; images: [img1, img2]} */
    addImages: (state, action) => {
      const active = action.payload.active;
      const length = state[active].content.length;
      state[active].content.push(
        ...action.payload.images.map((image: string, index: number) => {
          return { id: length + index, URL: image, caption: "", category: "" };
        })
      );
    },

    /* Action.payload contains {active: string; id:number; category: string} */
    updateImageTier: (state, action) => {
      const active = action.payload.active;
      state[active].content.every((value, index, array) => {
        if (value.id === action.payload.id) {
          array[index].category = action.payload.category;
          return false;
        }
        return true;
      });
    },
    /* Action.payload contains {active: string; images: [img1, img2]} */
    deleteImages: (state, action) => {
      const active = action.payload.active;
      state[active].content = state[active].content.filter(
        (image) => !action.payload.images.includes(image.URL)
      );
    },
  },
});

export const {
  createTierlist,
  renameTierlist,
  addImages,
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
