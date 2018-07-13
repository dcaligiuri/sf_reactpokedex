import React, {Component} from 'react';
import classes from './PokemonPhysical.css';

class PokemonPhysical extends Component{

    upperCaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render(){

        let abilities = this.props.abilities ? this.props.abilities.map((el) => 
        (<p key={el.ability.name}>{this.upperCaseFirst(el.ability.name)}</p>)) : null;
    
        return (
            <div>
                <p>Height</p>
                <p>{this.props.height + " m"}</p>
                <p>Weight</p>
                <p>{this.props.weight + " kg"}</p>
                <p>Abilities</p>
                {abilities}
        </div>
        );
            
    }
}

export default PokemonPhysical;