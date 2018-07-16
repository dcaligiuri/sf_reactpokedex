import React, {Component} from 'react';
import PokemonType from '../../components/PokemonType/PokemonType';
import classes from './TypeContainer.css';

class TypeContainer extends Component{

   
    render(){
        let pokemonTypes = this.props.pokemonTypes ? this.props.pokemonTypes.map((item) => 
        (<PokemonType type={item.type.name} key={item.type.name}>{item.type.name}</PokemonType>)) : null;

        return (
            <div className={classes.TypeContainer}>
                {this.props.loading ? null : <strong><p>Type</p></strong>}
                {pokemonTypes}
            </div>
        )
    }
}

export default TypeContainer;