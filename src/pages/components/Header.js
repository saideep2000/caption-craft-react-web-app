import React, {useState} from 'react'

import AppBar from '@mui/material/AppBar';
import { Button, Tab, Tabs, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import DrawerComp from './DrawerComp';
import IconMini from './IconMini';
import { useNavigate } from 'react-router-dom';

const pages = ["Craft", "Posts", "Messages", "Profile", "Settings", "Help"]

function Header({ activeTab }) {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const findTabIndex = (tabName) => {
        return pages.indexOf(tabName);
    };
    const [value, setValue] = useState(findTabIndex(activeTab));
    const handleLogin = () => {
        try {
        navigate('/Login');
        } catch (error) {
        // Handle errors such as invalid login credentials
        console.error('Login failed:', error);
        }
    }
    const handleSignUp = () => {
        try {
            navigate('/SignUp');
        } catch (error) {
            // Handle errors such as invalid login credentials
            console.error('Login failed:', error);
        }
    }
    const handleIcon = () => {
        console.log("Icon clicked!");
        try {
            navigate('/Craft');
        } catch (error) {
        // Handle errors such as invalid login credentials
        console.error('Login failed:', error);
        }
    }
    const handleChange = (event, newValue) => {
        setValue(newValue); // Update the selected tab's value
        const page = pages[newValue]; // Get the page name based on the index
        navigate(`/${page}`); // Navigate to the selected page's route
    };
  return (
    <React.Fragment>
        <AppBar sx = {{background : "black"}}>
            <Toolbar>
                {
                    isMatch ? (
                        <>
                            <DrawerComp/>
                            <IconMini onClick = {handleIcon} sx={{ flexGrow: 0, mr: 'auto', ml: 'auto' }}/>
                        </>
                    ) : (
                        <>
                            <Tabs textColor='inherit' value = {value} onChange={handleChange} indicatorColor='white'>
                                {
                                    pages.map((page,index) => (
                                        <Tab key = {index} label = {page}/>
                                    ))
                                }
                            </Tabs>
                            <IconMini onClick = {handleIcon} sx={{ ml : "265px"}}/>
                            <Button sx = {{
                                marginLeft : "auto", background : "white", color : "#3c3c3c", mr : "10px", 
                                '&:hover': {
                                    color : "white",
                                    backgroundColor: 'green',
                                  },
                            }} varaint = "conatined" onClick={handleLogin}
                            > Login </Button>
                            <Button sx = {{
                                marginLeft : "5 px", background : "white", color : "#3c3c3c",
                                '&:hover': {
                                    color : "white",
                                    backgroundColor: 'green',
                                  },
                                }} varaint = "conatined" onClick={handleSignUp}
                                > Signup </Button>
                        </>
                    )
                }
                
            </Toolbar>
            
        </AppBar>
    </React.Fragment>

  )
}
export default Header