import { useEffect, useState } from "react";
import { loadFromFirebase } from "../../components/firebase/firebase";
import Header from "../../components/layouts/header/header";
import TierlistContainer from "../../components/tierlist/TierlistContainer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getTierlistFromFirebase } from "../../components/redux/reducers/tierlist";

export default function TierlistPage() {
  const router = useRouter();
  const route = router.pathname;
  // const id = route.substring(route.lastIndexOf("/") + 1);
  let { pid } = router.query;
  let id: string = pid as string;
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        let docSnap = await loadFromFirebase(id);

        // TODO: Populate Redux store with tierlist data
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          dispatch(getTierlistFromFirebase(docSnap.data()));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    })();
    return () => {
      setLoad(true);
    };
  }, [router.isReady]);

  return (
    <div className=" bg-gradient-to-b from-indigo-500 to-black text-white">
      <Header />
      <TierlistContainer />

      {/* <Footer /> */}
    </div>
  );
}
