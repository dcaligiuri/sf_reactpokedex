import React, {Component} from 'react';
import classes from './DesktopContainer.css';

class DesktopContainer extends Component{

   
    render(){
       
        return (
            <div className={classes.hello}>
               <p>HELLO</p>
            </div>
        )
    }
}

export default DesktopContainer;