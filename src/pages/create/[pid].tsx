import { useEffect, useState } from "react";
import { loadFromFirebase } from "../../components/firebase/firebase";
import Header from "../../components/layouts/header/header";
import TierlistContainer from "../../components/tierlist/TierlistContainer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getTierlistFromFirebase } from "../../components/redux/reducers/tierlist";
import { changeSession } from "../../components/redux/reducers/currentSession";

export default function TierlistPage() {
 

  return (
    <div className=" bg-gradient-to-b from-indigo-500 to-black text-white">
      <Header />
      <TierlistContainer />

      {/* <Footer /> */}
    </div>
  );
}
