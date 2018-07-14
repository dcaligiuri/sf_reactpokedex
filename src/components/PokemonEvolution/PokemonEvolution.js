import React, {Component} from 'react';
import classes from './PokemonEvolution.css';
import axios from 'axios';

class PokemonEvolution extends Component{

    componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/evolution-chain/' + this.props.pokemonId + '/')
          .then(res => {
            console.log(res.data.chain.evolves_to);
            //this.setState({pokemonName: pokemonName});
          })
          .catch(error => console.log(error));
      }

 
    render(){
        return (
           <div className={classes.Background}>
               {this.props.pokemonId}
           </div>
        );
    }
}

export default PokemonEvolution;