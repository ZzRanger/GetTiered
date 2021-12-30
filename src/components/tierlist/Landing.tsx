import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RootState } from "../redux/store";

export default function LandingPage() {
  const activeTierlist = useSelector(
    (state: RootState) => state.currentSession.active
  );
  const routeID = useSelector((state: RootState) => state.tierlistStore[activeTierlist].id);
  const router = useRouter();
  return (
    <div className="flex flex-row ">
      <div className="flex flex-col flex-grow text-white bg-black">
        <div className="text-center px-40 pt-16 text-5xl">
          {" "}
          Build the ultimate tierlist in minutes{" "}
        </div>
        <div className="flex justify-center">
          <ul className="list-disc list-inside text-2xl p-10 ">
            <li>Simple UI</li>
            <li>Save with a button</li>
            <li>Share using a link</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            className="text-4xl mb-2 bg-blue-400 rounded-xl w-60 h-20 hover:shadow-2xl hover:bg-blue-700"
            onClick={() => router.push(`/create/${routeID}`)}
          >
            {" "}
            Create Tierlist{" "}
          </button>
        </div>
      </div>
      <video
        className="border-4 w-7/12 h-screen object-cover"
        id="background-video"
        autoPlay
        loop
        muted
        poster="https://assets.codepen.io/6093409/river.jpg"
      >
        <source
          src="https://assets.codepen.io/6093409/river.mp4"
          type="video/mp4"
        />
      </video>
      {/* <div className="h-10 border-4">Test</div>
      <div className="h-10 border-4"> Test2 </div> */}
    </div>
  );
}
