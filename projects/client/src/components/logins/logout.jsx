import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export const Logout = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("token")
        setTimeout(() => {
            navigate("/login");
          }, 1000);
    }
    return(
        <Button colorScheme="green" onClick={logout}>
      Logout
    </Button>
    )
}