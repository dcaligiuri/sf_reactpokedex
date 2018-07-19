import React, {Component} from 'react';
import classes from './PokemonDescription.css';
import pokemonFlavorTextArr from './../../csv/pokemonFlavorText';

class PokemonDescription extends Component{

    state  = {
        description: null
    };

    componentWillReceiveProps(nextProps){
        if (this.props.pokemonId !== nextProps.pokemonId || this.props.activeVersion !== nextProps.activeVersion){
            //use last eng description for now.
            let lastDes = null;
            for (let des of pokemonFlavorTextArr){
                //english and correct pokemonId
                if (des[2] === "9" && des[0] == nextProps.pokemonId){
                    lastDes = des[3];
                }
            }
            this.setState({description: lastDes});
        }
    }

    componentWillMount(){

        for (let des of pokemonFlavorTextArr){
            //english and correct pokemonId
            if (des[2] === "9" && des[0] == this.props.pokemonId){
                this.setState({description: des[3]});
            }
        }
       
    }
    
    render(){
        return (
           <div className={classes.PokemonDes}>
              <p>{this.state.description}</p>
              {this.props.activeVersion}
           </div>
        );
    }

}

export default PokemonDescription;