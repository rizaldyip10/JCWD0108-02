import { Box, Button } from "@chakra-ui/react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

export const Deactivate = ({ blogId, isDeleted}) => {
//   const [isDeleted, setIsDeleted] = useState(false); 
  const checkDeletedStatus = async (id) => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/products/${id}`);
    //   setIsDeleted(response.data.isDeleted);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isDeleted);
  const deactiveProduct = async (id) => {
    try {
      console.log(id);
      const response = await Axios.delete(`http://localhost:8000/api/products/${id}`);
      console.log(response);
    //   setIsDeleted(true);
    window.location.reload()
    }
    catch(error){

    }
  };

  return (
    <Box>
      {isDeleted ? (
        <Button bg={"green"} color={"white"} onClick={() => deactiveProduct(blogId)}>Activate </Button>
      ) : (
        <Button bg={"red"} color={"white"} onClick={() => deactiveProduct(blogId)}>Deactivate </Button>
      )}
    </Box>
  );
};
