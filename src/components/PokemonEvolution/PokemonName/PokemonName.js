import React, {Component} from 'react';
import classes from './PokemonName.css';

class PokemonName extends Component{

    render(){
        return (
           <div >
                <h3 style={{color: this.props.textColor}} className={classes.Name}>{this.props.pokemonName}</h3>
           </div>
        );
    }
}

export default PokemonName;


