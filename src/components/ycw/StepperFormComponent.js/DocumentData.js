// import { Box, Button } from '@mui/material'
// import React from 'react'
// import { useContext } from 'react'
// import { multiStepContext } from '../../../ContextApi/StepContext'
// import Document from "../../form/Document"

// function DocumentData() {
//   const {setCurrentSteps} = useContext(multiStepContext)
//   return (
//     <>
//     <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
//  <Box
//      marginTop={5}
//      sx={{

//        padding: 3,
//        bgcolor: "white",
//        borderRadius: 3,
//      }}
//    >
//       <Document/>
//       <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
//              <Button variant='contained' onClick={(()=>{setCurrentSteps(2)})}>back</Button>
//              <Button variant='contained' onClick={(()=>{setCurrentSteps(4)})}>NEXT</Button>
//          </Box>
     
//    </Box>

//  </Box>

//     </>
//   )
// }

// export default DocumentData

import axios from 'axios';
import React, {useEffect, useState} from 'react';

function DocumentData(){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  console.log(selectedFile)
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};



		const formData = new FormData();

		formData.append('document', selectedFile);


      const handleSubmission = async () => {
        let response = await axios.post("http://13.126.160.155:8080/user/document/upload?UserId=1234&documentContext=KYC&documentSide=FRONT&documentType=PASSPORT&isActive=true&isReuploaded=false",formData)
      }
    

	

	return(
    <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}
  

export default DocumentData