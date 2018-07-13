import React, {Component} from 'react';
import classes from './PokemonPhysical.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';


class PokemonPhysical extends Component{

    upperCaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render(){

        let abilities = this.props.abilities ? this.props.abilities.map((el) => 
        (<p key={el.ability.name}>{this.upperCaseFirst(el.ability.name)}</p>)) : null;
    
        return (
            <div className={classes.PhysicalChart}>
                <div className={classes.Left}>
                    <p style={{color:'white'}}>Height</p>
                    <p>{this.props.height + " m"}</p>
                    <p style={{color:'white'}}>Weight</p>
                    <p>{this.props.weight + " kg"}</p>
                    <p style={{color:'white'}}>Gender</p>
                    <FontAwesomeIcon icon={faMars} />
                    <FontAwesomeIcon icon={faVenus} />
                </div>
                <div className={classes.Right}>
                    <p style={{color:'white'}}>Abilities</p>
                    {abilities}
                </div>
            </div>
        );
            
    }
}

export default PokemonPhysical;