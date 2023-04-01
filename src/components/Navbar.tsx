import { Layout, Menu } from 'antd';
import { Row } from 'antd/es/grid';
import { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useAction } from '../hooks/useAction';


const Navbar:FC = ():JSX.Element => {
  const navigate = useNavigate();
  const { isAuth, user } = useTypedSelector(state => state.auth);
  const { logout } = useAction();

  return (
    <Layout.Header>
      <Row justify="end">
        { isAuth 
          ? 
          <>
            <div style={{
              color: "white",
            }}>{ user.username || localStorage.getItem("username") }</div>
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
            >
              <Menu.Item 
                onClick={logout} 
                key={1}
              >
                Exit
              </Menu.Item>
            </Menu>
          </>
          : <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
          >
            <Menu.Item 
              onClick={() => navigate(RouteNames.LOGIN)} 
              key={1}
            >
              Login
            </Menu.Item>
          </Menu> 
        }
      </Row>
    </Layout.Header>
  )
}


export default Navbar;