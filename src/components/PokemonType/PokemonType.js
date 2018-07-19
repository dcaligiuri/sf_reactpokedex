import React, {Component} from 'react';
import classes from './PokemonType.css';
import pokemonTypesArr from './../../csv/pokemonTypes';

class PokemonType extends Component{

    upperCaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render(){
        let type = null;
        switch(this.props.type){
            case('fire'):
                type = <div className={[classes.Fire, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>;
                break;
            case('grass'):
                type = <div className={[classes.Grass, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('poison'):
                type = <div className={[classes.Poison, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('bug'):
                type = <div className={[classes.Bug, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('water'):
                type = <div className={[classes.Water, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('normal'):
                type = <div className={[classes.Normal, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('electric'):
                type = <div className={[classes.Electric, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;   
            case('fairy'):
                type = <div className={[classes.Fairy, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;   
            case('fighting'):
                type = <div className={[classes.Fighting, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break; 
            case('psychic'):
                type = <div className={[classes.Psychic, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('rock'):
                type = <div className={[classes.Rock, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('steel'):
                type = <div className={[classes.Steel, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('ice'):
                type = <div className={[classes.Ice, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('ghost'):
                type = <div className={[classes.Ghost, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('dark'):
                type = <div className={[classes.Dark, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('flying'):
                type = <div className={[classes.Flying, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('dragon'):
                type = <div className={[classes.Dragon, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            case('ground'):
                type = <div className={[classes.Ground, classes.PokemonType].join(' ')}>{this.upperCaseFirst(this.props.type)}</div>
                break;
            default:
                type = null;
        }
        return type;
    }
}

export default PokemonType;