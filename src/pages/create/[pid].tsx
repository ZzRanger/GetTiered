import { useEffect, useState } from "react";
import { loadFromFirebase } from "../../components/firebase/firebase";
import Header from "../../components/layouts/header/header";
import TierlistContainer from "../../components/tierlist/TierlistContainer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getTierlistFromFirebase } from "../../components/redux/reducers/tierlist";
import { changeSession } from "../../components/redux/reducers/currentSession";
import { RootState } from "../../components/redux/store";

export default function TierlistPage() {
  const router = useRouter();
  const route = router.pathname;
  let { pid } = router.query;
  let id: string = pid as string;

  const dispatch = useDispatch();

  const activeTierlist = useSelector(
    (state: RootState) => state.currentSession.active
  );

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        let docSnap = await loadFromFirebase(id);

        // TODO: Populate Redux store with tierlist data
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          dispatch(getTierlistFromFirebase(docSnap.data()));
          dispatch(changeSession(docSnap.data().name));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    })();
    return () => {};
  }, [router.isReady]);
  return (
    <div className=" bg-gradient-to-b from-indigo-500 to-black text-white">
      <Header />
      <TierlistContainer />

      {/* <Footer /> */}
    </div>
  );
}
