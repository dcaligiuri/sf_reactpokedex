import React, {Component} from 'react';
import classes from './PokemonEvolution.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
 
    render(){
        let evolChain = this.state.evolChain ? Object.keys(this.state.evolChain).map(pokeId => 
        <div key={pokeId}>
            <img className={classes.PokeSprite} src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokeId + '.png'}/> 
            <h3 className={classes.Name}>{this.upperCaseFirst(this.state.evolChain[pokeId])}</h3>
            <p className={classes.PokemonId}>{'#' + this.pokemonNumtoThreeDigits(pokeId)}</p>
            <FontAwesomeIcon className={classes.Chevron} icon={faChevronDown}/> 
        </div>) : null;

        return (
           <div className={classes.Background}>
                <h2 style={{color: 'white'}}>Evolutions</h2>
                {evolChain}
           </div>
        );
    }
}

export default PokemonEvolution;