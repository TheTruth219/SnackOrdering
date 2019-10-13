import React, { Component } from 'react';
import styled from '@emotion/styled';
import geo from '../assets/media/images/geo.jpg'
import axios from 'axios';
import FoodTile from './micro/FoodTile';


const whiteText = "#ffffffba"
const SnacksContainer = styled.section`
display:flex;
flex-direction:column;
align-items:center;
background:url(${geo});
h1 {
    margin:.6em .6em 0px;
    color:#fff;
}
h3 {
    text-align:center;
    &.copy{
       margin-top:1em;
       color:${whiteText}; 
    }
}


p{
    font-size:18px;
    text-align:center;
}

.container {
    margin-top: 2em;
    margin-bottom: 3em;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    max-width:1300px;
}

`
const apiCall = axios.create({
    baseURL:  'http://localhost:4000',
    headers: {'Authorization':'Bearer 33b55673-57c7-413f-83ed-5b4ae8d18827'},
  });


export default class CurrentSnacks extends Component {
    constructor(props){
        super(props);
        this.state={
            items:[], 
        }
    }
    
   
        
    
    // ******************** GET SNACK INFORMATION ************************
   async componentDidMount(){
       // Get all items from the DB and set state. Hide the loader when everything has been updated. 
    let items = await apiCall.get('/snacks');
 
    if(items.data){
        this.setState({
            items:[...items.data]
            }
        )
    }
   }
   
    render() {
      let Tiles = this.state.items.map(item => {
          return <FoodTile
           key = {item.id}
           data={item}
           />
       } )
        
        return (
            
              <SnacksContainer id="current" >
                  <h1 className="hdg hdg_2 mix-hdg_dark">Currently In Stock</h1>
                  <h3 className="copy">Here are the snacks that are available in the Nerdery kitchen now.</h3>
                  
                  <div className="container">
                     {Tiles} 
                  </div>
              </SnacksContainer>  
            
        )
    }
}
