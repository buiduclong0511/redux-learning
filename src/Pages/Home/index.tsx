import styled from "styled-components";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { authSelector, logout } from "src/Redux";

export const Home: React.FC = () => {
  const userInfo = useSelector(authSelector).userInfo || {};
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <div className="info">
        <h5 className="heading">User Info</h5>
        {Object.keys(userInfo).map((key, index) => {
          // @ts-ignore
          const value = userInfo[key];
          return (
            <div className="infoItem" key={index}>
              <span className="label">{key}: </span>
              <span className="value">{value}</span>
            </div>
          );
        })}
        <div className="logoutBtn">
          <Button type="dashed" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .heading {
    font-size: 30px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  .infoItem {
    span {
      font-size: 18px;

      &.label {
        font-weight: bold;
      }
    }
  }

  .logoutBtn {
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
`;
