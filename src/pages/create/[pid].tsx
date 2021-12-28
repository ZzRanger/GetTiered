import Header from "../../components/layouts/header/header";
import TierlistContainer from "../../components/tierlist/TierlistContainer";

export default function TierlistPage() {
    return (
      <div className=" bg-gradient-to-b from-indigo-500 to-black text-white">
        <Header />
        <TierlistContainer />  
       
        {/* <Footer /> */}
      </div>
    );
  }