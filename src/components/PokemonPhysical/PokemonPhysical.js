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
        (<h4 key={el.ability.name}>{this.upperCaseFirst(el.ability.name)}</h4>)) : null;

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