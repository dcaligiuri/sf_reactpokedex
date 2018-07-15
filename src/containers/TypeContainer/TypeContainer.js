import React, {Component} from 'react';
import PokemonType from '../../components/PokemonType/PokemonType';
import classes from './TypeContainer.css';

class TypeContainer extends Component{

   
    render(){
        let pokemonTypes = this.props.pokemonTypes ? this.props.pokemonTypes.map((item) => 
        (<PokemonType type={item.type.name} key={item.type.name}>{item.type.name}</PokemonType>)) : null;

        return (
            <div className={classes.TypeContainer}>
                <h4>Type</h4>
                {pokemonTypes}
            </div>
        )
    }
}

export default TypeContainer;