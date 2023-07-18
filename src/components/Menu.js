import React, { useContext, useEffect } from 'react';
import { getUpToDateUser} from '../config/session';
import { Link} from 'react-router-dom';

import { UserContext } from '../config/UserContext';
import { Text, Avatar, Pane, Menu as Men, Icon, BarcodeIcon, HomeIcon,ChevronRightIcon,Popover, Position, ComparisonIcon, PeopleIcon, ShopIcon, InheritedGroupIcon} from 'evergreen-ui';


function Menu() {
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    getUpToDateUser().then((updatedUser) => {
      updateUser(updatedUser);
    });
  }, []);

  const menuItems = [
    { label: 'Home', icon: HomeIcon, page_path:"/home"},
    { label: 'Registros', icon: ComparisonIcon, 
    submenu:[
      { label: 'Produtos', icon: BarcodeIcon, page_path:"/product"},
      { label: 'Lojas', icon: ShopIcon, page_path:"/shop"}
    ]},
    { label: 'Usuários', icon: PeopleIcon, 
    submenu:[
      { label: 'Usuários', icon: PeopleIcon, page_path:"/user"},
      { label: 'Perfis', icon: InheritedGroupIcon, page_path:"/profile"}
    ]},
    // Add more menu items as needed
  ];

    
  return (
    <div style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"}}>
      <Pane style={{ display: 'flex', height: '80px', width:'100%', justifyContent:'space-between', 
      alignItems: 'center'}}>
        <div className="logo" style={{ marginRight: '20px' }}>
          <img height="80px" src={process.env.PUBLIC_URL +"/logo.png"} alt=""></img>
        </div>
        
        <Men width={'100%'}>
          <div style={{ display: 'flex'}}>
            
            <div className="items" style={{ display: 'flex'}}>
                  
              {menuItems.map((item, index) => (
                item.submenu ? 
                  <div  style={{marginRight:'5px'}}>
                    <Popover
                      position={Position.BOTTOM_LEFT}
                      content={
                        <>
                        {
                          item.submenu.map((subItem, subIndex) => (
                            <div>
                              <Link to={subItem.page_path}>

                                <Men.Item key={subIndex} >
                                  <Icon icon={subItem.icon} size={13} />
                                  &nbsp;
                                  &nbsp;
                                  {subItem.label}
                                </Men.Item>
                              </Link>
                            </div>
                          ))
                        }
                        </>
                        
                      }
                    >
                      <Men.Item key={index} >
                          <Icon icon={item.icon} size={13} />
                          &nbsp;
                          &nbsp;
                          {item.label}
                      </Men.Item>
                    </Popover>
                  </div>
                  :
                <>
                  <Link to={item.page_path} style={{marginRight:'5px'}}>

                    <Men.Item key={index} >
                      <Icon icon={item.icon} size={13} />
                      &nbsp;
                      &nbsp;
                      {item.label}
                    </Men.Item>
                  </Link>
                  
                </>
              
              ))}
            </div>
          </div>
        </Men>

        <div className="avatar"
              style={{
                marginRight:"30px",
                marginLeft: 'auto'
              }}>
          <Link to="/myprofile" height="45px" style={{display:"flex"}}>
                
            <div style={{display:"flex", alignItems:"center"}}>
              <Avatar
                  src=""
                  name={user.name} 
                  size={45}
                />
                &nbsp;
                &nbsp;

              <Text size={500}>{user.name}</Text>
              <Icon icon={ChevronRightIcon} size={14} />
            </div>
            
          </Link>
        </div>
      </Pane>
    </div>
  );



}

export default Menu;