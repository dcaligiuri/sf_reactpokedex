import React, {Component} from 'react';
import classes from './PokemonId.css';

class PokemonId extends Component{

 
    render(){
        return (
           <div >
                <p className={classes.PokemonId}>
                    {'#' + this.props.pokeId}
                </p>
           </div>
        );
    }
}

export default PokemonId;


