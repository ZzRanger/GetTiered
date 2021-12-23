import Head from "next/head";
import Image from "next/image";
import FileUploader from "../components/FileUpload";
import React from "react";
import TierlistContainer from "../components/tierlist/TierlistContainer";
import Header from "../components/layouts/header/header";
import Footer from "../components/layouts/Footer/footer";
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className=" bg-gradient-to-b from-indigo-500 to-black text-white">
      <Header />
      <TierlistContainer />      
      {/* <Footer /> */}
    </div>
  );
}
