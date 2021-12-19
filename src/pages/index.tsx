import Head from 'next/head'
import Image from 'next/image'
import FileUploader from '../components/FileUpload'
// import styles from '../styles/Home.module.css'



export default function Home() {
  return (
    <div>
      <h1> Upload Files </h1>
      <FileUploader />
    </div>
  )
}

