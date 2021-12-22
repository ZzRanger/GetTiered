import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "./redux/reducers/tierlist";
import { RootState } from "./redux/store";

const FileUploader = (props: any) => {
  const dispatch = useDispatch();
	const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [isFilePicked,setIsFilePicked] = useState(false);
  const activeTierlist = useSelector(
    (state: RootState) => state.currentSession.active
  );

  const changeHandler = (event: any) => {
    const files: string[] = [];
    console.log(event.target.files);
    for (let i = 0; i < event.target.files.length; i++) {

      files.push(URL.createObjectURL(event.target.files[i]));
      console.log(event.target.files[i]);
    }
    setSelectedFile(files);
    setIsFilePicked(true);
    dispatch(addItems({active: activeTierlist, images:files}))
	};

	const handleSubmission = () => {
	};


  return (
    <>
      <input type="file" name="file" onChange={changeHandler} multiple />
      
      {isFilePicked && (
          selectedFile.map((value, index) => 
          <img key={index} width={100} height={100} className="preview" src={value} alt="ff" />
          )
        )}
    </>
  );
};
export default FileUploader;
