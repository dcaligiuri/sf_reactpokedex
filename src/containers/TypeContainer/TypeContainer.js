import React, {Component} from 'react';
import PokemonType from '../../components/PokemonType/PokemonType';
import classes from './TypeContainer.css';
import pokemonTypesArr from './../../csv/pokemonTypes';

class TypeContainer extends Component{

    state = {
        currPokemonTypes: null
    }

    translateTypeId(typeId){
        if (typeId === "1"){
            return 'normal';
        }
        else if (typeId === "2"){
            return 'fighting'
        }
        else if (typeId === "3"){
            return 'flying'
        }
        else if (typeId === "4"){
            return 'poison'
        }
        else if (typeId === "5"){
            return 'ground'
        }
        else if (typeId === "6"){
            return 'rock'
        }
        else if (typeId === "7"){
            return 'bug'
        }
        else if (typeId === "8"){
            return 'ghost'
        }
        else if (typeId === "9"){
            return 'steel'
        }
        else if (typeId === "10"){
            return 'fire'
        }
        else if (typeId === "11"){
            return 'water'
        }
        else if (typeId === "12"){
            return 'grass'
        }
        else if (typeId === "13"){
            return 'electric'
        }
        else if (typeId === "14"){
            return 'psychic'
        }
        else if (typeId === "15"){
            return 'ice'
        }
        else if (typeId === "16"){
            return 'dragon'
        }
        else if (typeId === "17"){
            return 'dark'
        }
        else if (typeId === "18"){
            return 'fairy'
        }
        else 
            return null;
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.pokemonId){
            let currPokemonTypes = [];
            for(let type of pokemonTypesArr){
            if (type[0] == nextProps.pokemonId){
                const englishType = type[1];
                currPokemonTypes.push(this.translateTypeId(englishType));
            }
            
        }
        this.setState({currPokemonTypes: currPokemonTypes});
        }
       
    }

    componentWillMount(){
        let currPokemonTypes = [];
        for(let type of pokemonTypesArr){
            if (type[0] == this.props.pokemonId){
                const englishType = type[1];
                currPokemonTypes.push(this.translateTypeId(englishType));
            }
            
        }
        this.setState({currPokemonTypes: currPokemonTypes});
    }

    findBottomStyling(){
        let bottomStyling = null;
        if (this.props.onBottom){
            if (this.state.currPokemonTypes.length === 2 ){
                bottomStyling = {marginLeft: '25%'};
            }
            else if (this.state.currPokemonTypes.length === 1){
                bottomStyling = {marginLeft: '38%'};
            }
        }
        return bottomStyling;
    }

    render(){
        let pokemonTypes = this.state.currPokemonTypes ? this.state.currPokemonTypes.map((type) => 
        (<PokemonType type={type} key={type}>{type}</PokemonType>)) : null;

        return (
            <div className={classes.TypeContainer} style={this.findBottomStyling()}>
                {this.props.loading || this.props.onBottom ? null : <strong><p>Type</p></strong>}
                {pokemonTypes}
            </div>
        )
    }
}

export default TypeContainer;