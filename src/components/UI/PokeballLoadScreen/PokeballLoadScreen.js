import React, {Component} from 'react';
import classes from './PokeballLoadScreen.css'

class PokeballLoadScreen extends Component{


    render(){

        return (
            <div className={classes.Pokeball}>
                <div className={classes.Top}>
                    <div className={classes.Middle_circle}>
                        <div className={classes.White_in}>
                        </div>
                    </div>
                </div>
                <div className={classes.Bottom}></div>
            </div>
        )
    }
}

export default PokeballLoadScreen;