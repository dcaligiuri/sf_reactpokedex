import React, {Component} from 'react';
import classes from './PokemonPhysical.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import abilitiesArr from './../../csv/abilities';
import pokemonAbilitiesArr from './../../csv/pokemonAbilities';


class PokemonPhysical extends Component{

    state = {
        abilities : null
    }

    upperCaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.pokemonId){
            let abilities = [];
            for (let pokemon of pokemonAbilitiesArr){
                if (pokemon.pokemon_id == nextProps.pokemonId){
                    for (let ability of abilitiesArr){
                        if (pokemon.ability_id == ability.id){
                            abilities.push(ability.identifier);
                        }
                    }
                }
            }
            this.setState({abilities: abilities})
        }
       
    }

    componentWillMount(){
        let abilities = [];
        for (let pokemon of pokemonAbilitiesArr){
            if (pokemon.pokemon_id == this.props.pokemonId){
                for (let ability of abilitiesArr){
                    if (pokemon.ability_id == ability.id){
                        abilities.push(ability.identifier);
                    }
                }
            }
        }
        this.setState({abilities: abilities})
    }

    render(){


        let abilities = this.state.abilities ? this.state.abilities.map((abilityName) => 
        (<h4 key={abilityName}>{this.upperCaseFirst(abilityName)}</h4>)) : null;

        if (this.props.height){
            return (
                <div className={classes.PhysicalChart}>
                    <div className={classes.Left}>
                        <h4 style={{color:'white'}}>Height</h4>
                        <h4>{this.props.height + " m"}</h4>
                        <h4 style={{color:'white'}}>Weight</h4>
                        <h4>{this.props.weight + " kg"}</h4>
                        <h4 style={{color:'white'}}>Gender</h4>
                        <div> 
                            {this.props.genderRate !== '8' ? <FontAwesomeIcon icon={faMars} /> : null}
                            {this.props.genderRate !== '0' ? <FontAwesomeIcon icon={faVenus} /> : null}
                        </div>
                    </div>
                    <div className={classes.Right}>
                        <h4 style={{color:'white'}}>Abilities</h4>
                        {abilities}
                    </div>
                </div>
            );
        }
        else 
            return null;
    
        
            
    }
}

export default PokemonPhysical;