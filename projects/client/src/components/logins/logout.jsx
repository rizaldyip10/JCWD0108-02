import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setValue } from "../../redux/cashierSlice";

export const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const logout = () => {
        localStorage.removeItem("token")
        dispatch(setValue({}))
        setTimeout(() => {
            navigate("/login");
          }, 1000);
    }
    return(
      <Text color="red" cursor="pointer" onClick={logout}>
      Logout
    </Text>
    )
}