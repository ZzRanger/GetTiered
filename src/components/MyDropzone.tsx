import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch,useSelector } from "react-redux";
import { addItems } from "./redux/reducers/tierlist";
import { RootState } from "./redux/store";

export default function MyDropzone() {
  const dispatch = useDispatch();

  const activeTierlist = useSelector(
    (state: RootState) => state.currentSession.active
  );

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const files: string[] = [];
    for (let i = 0; i < acceptedFiles.length; i++) {

      files.push(URL.createObjectURL(acceptedFiles[i]));
    }
    dispatch(addItems({active: activeTierlist, images:files}))
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="bg-gray-400 mx-40 mt-4 py-20 flex justify-center items-center rounded"
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      <p>Drop the files here </p>
    </div>
  );
}
