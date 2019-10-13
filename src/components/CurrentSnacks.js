import React, { Component } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const SnacksContainer = styled.section`
display:flex;
flex-direction:column;
align-items:center;
h1 {
    margin:.6em;
}
h3 {
    text-align:center;
    &.copy{
       margin-top:1em; 
    }
}
hr {
    width: 30%;
    margin-top: 1.5em;
}
p{
    font-size:18px;
    text-align:center;
}
.copy{
    color:#828282;
    
}
.addIcon {
    background: #82828229;
    padding: 8px 15px;
    color:white;
    font-size: 26px;
    margin-right:10px;
    font-weight:bold;
}
.bubble {
    background: #fff;
    border-radius: 25px;
    color: #3B8CA0;
    padding: 1.6px 5px;
    font-size: 11px;
    margin-left: auto;
    align-self: center;
    font-weight:bold;
}
.vote {
    margin-left:auto;
    font-size:12px;
    padding-right:8px;
    color:grey;
}
.votingContainer {
    margin-bottom: 3em;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
}
.item_list{
    width:580px;
    
    h3 {
        color:white;
        background:#3B8CA0;
        padding:3px 8px;
        display:flex;
        flex-direction:row;
        font-size: 30px;
    }
}
.food_item {
    min-height: 42px;
    display: flex;
    align-items: center;
    background:#D6D6D6;

    &:nth-Child(odd){
        background:#9e9e9e85;
    }
   

}
.selection_item {
    min-height: 42px;
    display: flex;
    align-items: center;
}
.selection_list{
    width:420px;
    margin-left:1em;
    h3 {
        font-size: 30px;
        padding:0;
        display:flex;
        flex-direction:row;
    }
}
`
const apiCall = axios.create({
    baseURL:  'http://localhost:4000',
    headers: {'Authorization':'Bearer 33b55673-57c7-413f-83ed-5b4ae8d18827'},
  });

  const set = (key,value) => {
      return JSON.stringify(localStorage.setItem(key,value))
  }

export default class SnackVoting extends Component {
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
 
    if(localStorage.noVote === "true" && localStorage.m < m){
        let storageKeys = ["votes","m","selection"]
        storageKeys.map(key=>{
           return localStorage.removeItem(key);
        })
        set("noVote","false");
        
    }
    setTimeout(()=>{
      if(items.data){
        let sortedItems = items.data.sort( (a,b) => {
            return b.votes - a.votes 
        })
        let parsedData = localStorage.selection? JSON.parse(localStorage.selection):false;
        this.setState(prevState => (
            items.data !== prevState.items?{ items: sortedItems,loading:"false",selected:localStorage.votes !=null?localStorage.votes:0,
            votes:localStorage.votes? prevState.votes - localStorage.votes:3,
            selectedItems:parsedData?[...parsedData]:[] }:false));
      }
    },0)
   }
   
    render() {
        let foodList = this.state.items.map((item,index) => {
            return (
                <FoodItem index={index} handleVote={this.addVote} key={item.id} data={item} />                                          
            )
        });
        let selectionList = this.state.selectedItems.map(item => {
            if(item === undefined || item === null){
                return console.error("item undefined")
            }else{
                return  <div key={item.id} className="selection_item"> {item.brand} {item.product} <span style={{paddingRight:`0`}}className="vote">{item.votes}</span></div>
            }
           
           
        })
        
        return (
            <>
              <VoteContainer className="u-constrainer">
                  <h1 className="hdg hdg_2 mix-hdg_dark">Snack Voting</h1>
                  <h3 className="copy">Vote on the snacks you want to see in this month's rotation</h3>
                  <hr/>
                  <p style={{fontSize:`16px`, 
    marginBottom:`2em`}} className="copy">{this.state.votes === 0?<span style={{color:`red`,fontWeight:`bold`}}>You have no votes remaining this month</span>:`${this.state.votes} Votes Remaining`} </p>
                  <div className="votingContainer">
                      <div className="item_list">
                          <h3 className="copy">Available Items <span className="bubble">{this.state.items.length}</span></h3>
                          <div className="item_list__container">
                          {foodList}
                          </div>
                          
                      </div>
                      <div className="selection_list">
                          <h3 style={{textAlign:`left`}} className="copy">Selection <span style={{marginRight:`0`,background:`#3B8CA0`,color:`#fff`}} className="bubble">{this.state.selected}</span></h3>
                          <hr style={{margin:`0.3em 0px 0px 0px`,width:`100%`}}/>
                          {selectionList}
                      </div>
                  </div>
              </VoteContainer>  
            </>
        )
    }
}
