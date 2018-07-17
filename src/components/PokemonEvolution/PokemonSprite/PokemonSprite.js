import React, {Component} from 'react';
import classes from './PokemonSprite.css';

class PokemonSprite extends Component{

 
    render(){
        return (
           <div >
                <img className={classes.PokeSprite} 
                    alt={this.props.pokeName}
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.props.pokeId + '.png'}/> 
           </div>
        );
    }
}

export default PokemonSprite;


