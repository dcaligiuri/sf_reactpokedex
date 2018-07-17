import React, {Component} from 'react';
import classes from './PokemonEvolution.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PokemonSprite from './PokemonSprite/PokemonSprite';
import PokemonName from './PokemonName/PokemonName';
import PokemonId from './PokemonId/PokemonId';
import EvolutionLoader from './../UI/EvolutionLoader/EvolutionLoader';

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

    modifyEvolChain(obj){
        //FURTHER ADDITIONS -> HANDLE EEVEE + HITMON STYLE MULTI EVOLUTIONS

        let evolObj = {};
        //push orig pokemon to array.
        let evolId = this.getIdFromSpeciesUrl(obj.chain.species.url);
        evolObj[evolId] = obj.chain.species.name;

        //if you evolve, push next pokemon to array.
        if (obj.chain.evolves_to.length > 0){
            let evolId2 = this.getIdFromSpeciesUrl(obj.chain.evolves_to[0].species.url);
            evolObj[evolId2] = obj.chain.evolves_to[0].species.name;
        }
        //if you never evolve, return array with orig pokemon
        else{
            return evolObj;
        }
        
        //add third evoled form
        if (obj.chain.evolves_to[0].evolves_to.length > 0){
            let evolId3 = this.getIdFromSpeciesUrl(obj.chain.evolves_to[0].evolves_to[0].species.url);
            evolObj[evolId3] = obj.chain.evolves_to[0].evolves_to[0].species.name;
        }
        return evolObj;
    }

    componentWillReceiveProps(nextProps){
        if (this.props.pokemonId !== nextProps.pokemonId ){
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + nextProps.pokemonId + '/')
            .then(res => {
              axios.get(res.data.evolution_chain.url)
                  .then(evolRes => {
                    let evolObj = this.modifyEvolChain(evolRes.data);
                    this.setState({evolChain: evolObj});
                  })
                  .catch(error => console.log(error))
            })
            .catch(error => console.log(error))   
        }
    }

    componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.props.pokemonId + '/')
          .then(res => {
            axios.get(res.data.evolution_chain.url)
                .then(evolRes => {
                    let evolObj = this.modifyEvolChain(evolRes.data);
                    this.setState({evolChain: evolObj});
                })
                .catch(error => console.log(error))
          })
          .catch(error => console.log(error))   
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
            <PokemonName pokemonName={this.upperCaseFirst(this.state.evolChain[pokeId])} />
            <PokemonId 
                pokemonName={this.upperCaseFirst(this.state.evolChain[pokeId])} 
                pokeId={this.pokemonNumtoThreeDigits(pokeId)}/>
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