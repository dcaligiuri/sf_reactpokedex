import React, {Component} from 'react';
import PokemonType from '../../components/PokemonType/PokemonType';
import classes from './TypeContainer.css';
import pokemonTypesArr from './../../csv/pokemonTypes';
import typeEfficacyArr from './../../csv/typeEfficacy';

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
            let currPokemonTypesId = [];
            let currPokemonTypes = [];
            for(let type of pokemonTypesArr){
            if (type.pokemon_id == nextProps.pokemonId){
                const typeId = type.type_id;
                currPokemonTypesId.push(type.type_id);
                currPokemonTypes.push(this.translateTypeId(typeId));
            }
            
        }

        if(this.props.render === "Weak Against"){
            let currPokemonWeaknesses = this.getWeaknesses(currPokemonTypesId);
            this.setState({currPokemonTypes: currPokemonWeaknesses});
        }
        else if(this.props.render === "Types"){
            this.setState({currPokemonTypes: currPokemonTypes});
        }

        }
       
    }


    getTypesWeakAgainst(typeId){
        let typesWeakAgainst = [];
        for (let enemyMove of typeEfficacyArr){
            if (enemyMove.target_type_id === typeId && Number(enemyMove.damage_factor) > 100){
                typesWeakAgainst.push(enemyMove.damage_type_id);
            }
        }
        return typesWeakAgainst;        
    }


    getTypesStrongAgainst(typeId){
        let typesStrongAgainst = [];
        for (let enemyMove of typeEfficacyArr){
            if (enemyMove.target_type_id === typeId && Number(enemyMove.damage_factor) < 100){
                typesStrongAgainst.push(enemyMove.damage_type_id);
            }
        }
        return typesStrongAgainst;   
    }

    getWeaknesses(typeIdArr){



        
        let type1WeakAgainst = this.getTypesWeakAgainst(typeIdArr[0]);
        let type1StrongAgainst = this.getTypesStrongAgainst(typeIdArr[0]);
        let type2WeakAgainst = null;
        let type2StrongAgainst = null;
        let finalWeaknesses = [];

        //if there's a second type
        if (typeIdArr[1]){
            type2WeakAgainst = this.getTypesWeakAgainst(typeIdArr[1]);
            type2StrongAgainst = this.getTypesStrongAgainst(typeIdArr[1]);
        }

      
        //you have a second type
        if (type2WeakAgainst && type2StrongAgainst){
            for(let type2Id of type2WeakAgainst){
                if (type1StrongAgainst.includes(type2Id) === false){
                    finalWeaknesses.push(this.translateTypeId(type2Id));
                }
            }
            for(let type1Id of type1WeakAgainst){
                //second part of if statement ensures that the same type is not added twice
                if (type2StrongAgainst.includes(type1Id) === false && finalWeaknesses.includes(this.translateTypeId(type1Id)) === false){
                    finalWeaknesses.push(this.translateTypeId(type1Id));
                }
            }
        }
        //one type
        else{
            finalWeaknesses = type1WeakAgainst.map(id => this.translateTypeId(id));
        }

        return finalWeaknesses;

    }


    componentWillMount(){
        let currPokemonTypes = [];
        let currPokemonTypesId = [];
        for(let type of pokemonTypesArr){
            if (type.pokemon_id == this.props.pokemonId){
                const typeId = type.type_id;
                currPokemonTypesId.push(typeId);
                currPokemonTypes.push(this.translateTypeId(typeId));
            }
        }

        if(this.props.render === "Weak Against"){
            let currPokemonWeaknesses = this.getWeaknesses(currPokemonTypesId);
            this.setState({currPokemonTypes: currPokemonWeaknesses});
        }
        else if(this.props.render === "Types"){
            this.setState({currPokemonTypes: currPokemonTypes});
        }
        //let currPokemonWeaknesses = this.getWeaknesses(currPokemonTypesId);
        //this.setState({currPokemonWeaknesses: currPokemonWeaknesses});

        
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
                {this.props.loading || this.props.onBottom ? null : <strong><p>{this.props.render}</p></strong>}
                {pokemonTypes}
            </div>
        )
    }
}

export default TypeContainer;