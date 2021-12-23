jest.mock('uuid',() => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

import tierlistReducer,{
  addItems,
  updateImageTier,
  deleteImages,
  createTierlist,
  renameTierlist,
} from "../components/redux/reducers/tierlist";
test("sample test", () => {
  expect(1).toEqual(1);
});

test("should return the initial state", () => {
  expect(
    tierlistReducer(undefined, {
      type: undefined,
    })
  ).toEqual({
    untitled: {
      name: "untitled",
      content: [],
      id: "0",
      categories: ["S", "A", "B", "C", "D"],
    },
  });
});

test("test tierlist reducer actions", () => {
  let state = tierlistReducer(
    undefined,
    addItems({ active: "untitled", images: ["test1", "test2"] })
  );

  state = tierlistReducer(
    state,
    updateImageTier({ active: "untitled", id: 1, category: "D" })
  );
  state = tierlistReducer(
    state,
    updateImageTier({ active: "untitled", id: 0, category: "A" })
  );
  state = tierlistReducer(
    state,
    updateImageTier({ active: "untitled", id: 1, category: "B" })
  );
  state = tierlistReducer(
    state,
    updateImageTier({ active: "untitled", id: 0, category: "S" })
  );

  expect(state).toEqual({
    untitled: {
      name: "untitled",
      content: [
        { id: "0", URL: "test1", caption: "", category: "S" },
        { id: "1", URL: "test2", caption: "", category: "B" },
      ],
      id: "0",
      categories: ["S", "A", "B", "C", "D"],
    },
  });

  state = tierlistReducer(state, createTierlist({}));
  state = tierlistReducer(state, createTierlist({}));

  expect(state).toEqual({
    untitled: {
      name: "untitled",
      content: [
        { id: "0", URL: "test1", caption: "", category: "S" },
        { id: "1", URL: "test2", caption: "", category: "B" },
      ],
      id: "0",
      categories: ["S", "A", "B", "C", "D"],
    },
    untitled1: {
      name: "untitled1",
      content: [],
      id: "1",
      categories: ["S", "A", "B", "C", "D"],
    },
    untitled2: {
      name: "untitled2",
      content: [],
      id: "2",
      categories: ["S", "A", "B", "C", "D"],
    },
  });
  state = tierlistReducer(
    state,
    renameTierlist({ active: "untitled1", rename: "Boba" })
  );
  state = tierlistReducer(
    state,
    addItems({
      active: "Boba",
      images: ["Green Tea", "Oolong Tea", "Strawberry Tea", "White Tea"],
    })
  );
  // state = tierlistReducer(state,deleteImages({ active: 'Boba',images: ['Green Tea, Strawberry Tea'] }));

  expect(state).toEqual({
    untitled: {
      name: "untitled",
      content: [
        { id: "0", URL: "test1", caption: "", category: "S" },
        { id: "1", URL: "test2", caption: "", category: "B" },
      ],
      id: "0",
      categories: ["S", "A", "B", "C", "D"],
    },
    Boba: {
      name: "Boba",
      content: [
        { id: "0", URL: "Green Tea", caption: "", category: "" },
        { id: "1", URL: "Oolong Tea", caption: "", category: "" },
        { id: "2", URL: "Strawberry Tea", caption: "", category: "" },
        { id: "3", URL: "White Tea", caption: "", category: "" },
      ],
      id: "1",
      categories: ["S", "A", "B", "C", "D"],
    },
    untitled2: {
      name: "untitled2",
      content: [],
      id: "2",
      categories: ["S", "A", "B", "C", "D"],
    },
  });
  state = tierlistReducer(
    state,
    deleteImages({ active: "Boba", images: ["Green Tea", "Strawberry Tea"] })
  );
  expect(state).toEqual({
    untitled: {
      name: "untitled",
      content: [
        { id: "0", URL: "test1", caption: "", category: "S" },
        { id: "1", URL: "test2", caption: "", category: "B" },
      ],
      id: "0",
      categories: ["S", "A", "B", "C", "D"],
    },
    Boba: {
      name: "Boba",
      content: [
        { id: "1", URL: "Oolong Tea", caption: "", category: "" },
        { id: "3", URL: "White Tea", caption: "", category: "" },
      ],
      id: "1",
      categories: ["S", "A", "B", "C", "D"],
    },
    untitled2: {
      name: "untitled2",
      content: [],
      id: "2",
      categories: ["S", "A", "B", "C", "D"],
    },
  });
});

export {};
