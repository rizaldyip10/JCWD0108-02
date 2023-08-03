import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Link
} from "@chakra-ui/react";
import { Logout } from "../logins/logout";
import { BasicUsage } from "./modalAvatar";
import { useSelector } from "react-redux";

export const AvatarMenu = () => {
    const data = useSelector((state)=> state.cashier.value)
    console.log(data);
  return (
    <Menu>
      <MenuButton _hover={{ cursor: "pointer" }}>
        <Avatar size="md" name={data?.username} src={`http://localhost:8000/${data?.imgProfile}`} />
      </MenuButton>
      <MenuList>
        <MenuItem color={"black"}><BasicUsage/></MenuItem>
        {data.isAdmin ? (
          <MenuItem color="black" as={Link} href="http://localhost:3000/admin">
            Admin Dashboard
          </MenuItem>
        ) : null}
        <MenuDivider />
        <MenuItem>
          <Logout />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};


