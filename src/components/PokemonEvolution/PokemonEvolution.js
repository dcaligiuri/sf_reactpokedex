import React, {Component} from 'react';
import classes from './PokemonEvolution.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PokemonSprite from './PokemonSprite/PokemonSprite';
import PokemonName from './PokemonName/PokemonName';
import PokemonId from './PokemonId/PokemonId';
import pokemonSpeciesArr from './../../csv/pokemonSpecies';
import TypeContainer from '../../containers/TypeContainer/TypeContainer';

class PokemonEvolution extends Component{

    state = {
        evolChain: null
    }


    upperCaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getIdFromSpeciesUrl(str){
        var items = str.split("/");
        return items[items.length - 2 ];
    }

    pokemonNumtoThreeDigits(strNum){
        let num = Number(strNum);
        let newStr = "" + num;
        let pad = "000";
        let ans = pad.substring(0, pad.length - newStr.length) + newStr;
        return ans;
    }


    componentWillReceiveProps(nextProps){
        if (this.props.pokemonId !== nextProps.pokemonId ){
            let evolObj = {};
            const currentPokemonEvolLineId = pokemonSpeciesArr[Number(nextProps.pokemonId) - 1][4];
            for(let pokemon of pokemonSpeciesArr){
              let evolutionaryLineId = null;
              if (pokemon[4] === currentPokemonEvolLineId ){
                evolutionaryLineId = pokemon[4];
              }
              //add to object if same evol line as current pokemon
              if (evolutionaryLineId){
                    //key pokemonId and value pokemonName
                    evolObj[pokemon[0]] = pokemon[1];
              }
              
          }

          this.setState({evolChain: evolObj});
        }
    }

    componentDidMount(){

          let evolObj = {};
          const currentPokemonEvolLineId = pokemonSpeciesArr[Number(this.props.pokemonId) - 1][4];
          
          for(let pokemon of pokemonSpeciesArr){
              let evolutionaryLineId = null;
              if (pokemon[4] == currentPokemonEvolLineId){
                evolutionaryLineId = pokemon[4];
              }
              //add to object if same evol line as current pokemon
              if (evolutionaryLineId){
                    //key pokemonId and value pokemonName
                    evolObj[pokemon[0]] = pokemon[1];
              }
              
          }

          this.setState({evolChain: evolObj});

    }

    isLastPokemon(currentPokemonName, lastPokemonName){
        //if last pokemon, don't display chevron
        if (currentPokemonName === lastPokemonName){
            return 'none';
        }
        else 
            return '';
    }
 
    render(){
        let lastPokemonName = null; 
        if (this.state.evolChain){
            let tempLastPokemonName = this.state.evolChain;
            var { [Object.keys(this.state.evolChain).pop()]: last } = tempLastPokemonName;
            lastPokemonName = last;
        }

        let evolChain = this.state.evolChain ? Object.keys(this.state.evolChain).map(pokeId => 
        <div key={pokeId}>
            <PokemonSprite pokeId={pokeId}/>
            <PokemonName textColor='white' pokemonName={this.upperCaseFirst(this.state.evolChain[pokeId])} />
            <PokemonId 
                pokemonName={this.upperCaseFirst(this.state.evolChain[pokeId])} 
                pokeId={this.pokemonNumtoThreeDigits(pokeId)}
                textColor='white'/>
            <TypeContainer onBottom render="Types" pokemonId={pokeId}/>
            <FontAwesomeIcon style={{display: this.isLastPokemon(this.state.evolChain[pokeId], lastPokemonName )}} className={classes.Chevron} icon={faChevronDown}/> 
        </div>) : null;

        return (
            <div> 
                {evolChain ? <div className={classes.Background}>
                    <h2 style={{color: 'white', marginLeft: '15px'}}>Evolutions</h2>
                    {evolChain}
                </div> : null }

           </div>
        );
    }
}

export default PokemonEvolution;