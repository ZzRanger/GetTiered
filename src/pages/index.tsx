import Head from "next/head";
import Image from "next/image";
import FileUploader from "../components/FileUpload";
import React from "react";
import TierlistContainer from "../components/tierlist/TierlistContainer";
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <TierlistContainer />
      <h1> Upload Files </h1>
      <FileUploader />
    </div>
  );
}
