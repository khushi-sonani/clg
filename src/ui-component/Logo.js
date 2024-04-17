// material-ui
// import { useTheme }  '@mui/material/styles';
import logo from 'assets/images/users/logo.jpg';

const Logo = () => {
  // const theme = useTheme();

  return (
  
    //  if you want to use image instead of svg uncomment following, and comment out <svg> element.
     <div>    
        <img src={logo} alt="Berry" width="70" style={{ marginLeft:"50px"}} />
        {/* <p>Attendance System</p> */}
     </div>

     
     
    
  );
};

export default Logo;
