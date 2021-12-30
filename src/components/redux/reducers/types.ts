
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
  