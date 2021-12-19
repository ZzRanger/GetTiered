import React, { useState } from "react";

const FileUploader = (props: any) => {
	const [selectedFile, setSelectedFile] = useState<string[]>([]);
	const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event: any) => {
    const files: string[] = [];
    console.log(event.target.files);
    for (let i = 0; i < event.target.files.length; i++) {

      files.push(URL.createObjectURL(event.target.files[i]));
      console.log(event.target.files[i]);
    }
    setSelectedFile(files);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
	};


  return (
    <>
      <input type="file" name="file" onChange={changeHandler} multiple />
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
      {isFilePicked && (
          selectedFile.map((value, index) => 
          <img key={index} width={100} height={100} className="preview" src={value} alt="ff" />
          )
        )}
    </>
  );
};
export default FileUploader;
