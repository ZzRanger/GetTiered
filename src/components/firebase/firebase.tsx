import { doc, getDoc, getFirestore, setDoc } from "@firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {  TierlistObj } from "../redux/reducers/types";

// TODO: Modularize this code

/**
 * Save tierlist to firebase once user clicks "Save"
 */
export async function saveTierlist(tierlistData: TierlistObj) {
  // TODO: Upload photos to GCP
  const storage = getStorage();

  // Iterate through all images in each category
  let categories = tierlistData.categories;

  for (let i = 0; i < categories.length; i++) {
    let content = categories[i].content;
    if (content.length > 0) {
      for (let j = 0; j < content.length; j++) {
        let item = content[j];
        const storageRef = ref(storage, item.id + ".jpg");
        // Upload photo to Google Cloud Storage
        await fetch(item.URL)
          .then((res) => res.blob())
          .then(
            (blob) => new File([blob], item.id + ".jpg", { type: "image/jpeg" })
          )
          .then((file) => uploadBytes(storageRef, file).then((snapshot) => {}));
        // Replace local URL with Storage URL
        let url = await getDownloadURL(storageRef);
        item.URL = url;
        content[j] = item;
      }
    }
  }

  // Upload unsorted photos to GCP
  let unsorted = tierlistData.unsorted;
  if (true) {
    let content = unsorted.content;
    if (content.length > 0) {
      for (let j = 0; j < content.length; j++) {
        let item = content[j];
        const storageRef = ref(storage, item.id + ".jpg");
        // Upload photo to Google Cloud Storage

        await fetch(item.URL)
          .then((res) => res.blob())
          .then(
            (blob) => new File([blob], item.id + ".jpg", { type: "image/jpeg" })
          )
          .then((file) => uploadBytes(storageRef, file).then((snapshot) => {}));
        // Replace local URL with Storage URL
        let url = await getDownloadURL(storageRef);
        item.URL = url;
        content[j] = item;
      }
    }
  }

  // Upload data to firebase
  const db = getFirestore();
  await setDoc(doc(db, "tierlists", tierlistData.id), tierlistData).then(() =>
    alert("FINISHED")
  );

  return Promise.resolve("Success");
}

/**
 * Load data into redux from firebase
 */
export async function loadFromFirebase(id: string) {
  // TODO: Given page ID, get corresponding document from firebase
    const db = getFirestore();

    const docRef = doc(db,"tierlists",id);
    
    const docSnap = await getDoc(docRef);
    return docSnap;
    
}
