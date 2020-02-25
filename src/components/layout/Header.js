import React, { useContext } from "react";
import { auth } from "../Firebase";
import DataContext from "../Context";
import Logo from "../../assets/images/FT-Logo@3x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 64px;
  border-bottom: 3px solid #d6d8db;
  background-color: #374047;
  color: rgba(255, 255, 255, 1);
  padding-left: 20px;
`;

const HeaderSegment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderItemButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  height: 100%;
  font-size: 12px;
  cursor: pointer;
  color: #aeb2b5;
  background-color: #374047;
  padding: 20px;

  &:hover {
    background-color: #272f34;
    color: #ffffff;
  }

  &:focus {
    outline: none;
  }

  &.active {
    background-color: #272f34;
    color: #ffffff;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;

  &:hover {
    display: block;
    > div {
      display: block;
    }
  }
`;

const HeaderItem = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
  border-right: 1px solid #4a5258;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #ffffff;
  color: #374047;
  font-size: 12px;
  padding: 15px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  &:hover {
    background-color: #d5eafa;
  }
`;

const HeaderItemImageContainer = styled.div`
  border-right: 1px solid #979797;
  padding-right: 10px;
`;

const HeaderItemImage = styled.img`
  height: 22px;
  vertical-align: middle;
`;

const HeaderItemProductName = styled.h1`
  color: rgba(255, 255, 255, 1);
  font-size: 19px;
  font-weight: 400;
  text-transform: lowercase;
  margin: 0 0 0 10px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 18px;
  vertical-align: middle;
  margin-right: 10px;
`;

const UserIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  vertical-align: middle;
  margin-left: 10px;
`;

const Header = () => {
  const dataContext = useContext(DataContext);
  const logout = () => {
    auth.signOut();
    dataContext.unsubscribe.unsubscribe();
  };
  return (
    <Head>
      <HeaderSegment>
        <HeaderItemImageContainer>
          <HeaderItemImage src={Logo} alt="Logo" />
        </HeaderItemImageContainer>
        <HeaderItemProductName>cologne</HeaderItemProductName>
      </HeaderSegment>
      <HeaderSegment>
        <HeaderItem>
          <HeaderItemButton
            onClick={() => {
              dataContext.setContent.setContent("Demo");
            }}
            className={dataContext.content === "Demo" ? "active" : ""}
          >
            <Icon icon={["fas", "desktop"]} />
            Demos
          </HeaderItemButton>
        </HeaderItem>
        <HeaderItem>
          <HeaderItemButton
            onClick={() => {
              dataContext.setContent.setContent("Upload");
            }}
            className={dataContext.content === "Upload" ? "active" : ""}
          >
            <Icon icon={["fas", "folder"]} />
            Files
          </HeaderItemButton>
        </HeaderItem>
        <Dropdown>
          <HeaderItemButton>
            Welcome, {dataContext.user.name}
            <UserIcon icon={["fas", "user"]} />
          </HeaderItemButton>
          <DropDownContent>
            <div onClick={logout}>
              <Icon icon={["fas", "sign-out-alt"]} />
              Logout
            </div>
          </DropDownContent>
        </Dropdown>
      </HeaderSegment>
    </Head>
  );
};

export default Header;
