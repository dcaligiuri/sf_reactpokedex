import React, {Component} from 'react';
import classes from './PokemonProPic.css';
import LoadScreen from '../UI/LoadScreen/LoadScreen';

class PokemonProPic extends Component{

    upperCaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render(){
        
        let pokemonProPic = this.props.loading ? <LoadScreen /> : <img className={classes.PokemonProPic}
        src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + this.props.pokemonPaddedId + ".png"} 
        alt={this.upperCaseFirst(this.props.pokemonName)} />;
        

        return (
            <div>
                {pokemonProPic}
            </div>
        )
    }
}

export default PokemonProPic;