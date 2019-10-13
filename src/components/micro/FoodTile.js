import React from 'react'
import styled from '@emotion/styled'

const whiteText = "#ffffffba"
const Tile = styled.div`
display:flex;
flex-direction:column;
margin:1em;
.snackTile {
    position:relative;
    width:300px;
    height:230px;
    background:#fff;
    display:flex;
    box-shadow: 5px 6px 8px -4px rgba(0,0,0,0.75); 

    img {
        width:150px;
        height:auto;
        margin:auto;
    }
    .triangle {
        position: absolute;
        right: 4px;
        top: 4px;
        width: 0;
        height: 0;
        border-top: 0px solid transparent;
        border-right: 40px solid #0CC3DD;
        border-bottom: 41px solid transparent;
    
        span {
            position: absolute;
            left: 22px;
            top: 5px;
            color: ${whiteText};
            font-size: 14px;
        }
}

}
h4,h5 {
    color:${whiteText};
    
}
h4{
    margin-top:16px;
}
h5 {
    margin-top:12px;
    font-size: 15px;
}
    
`
export default function FoodTile({data}) {
    return (
        <Tile>
            <div className="snackTile">
                <div className="triangle"><span>{data.votes}</span></div>
                <img alt="company logo" src={data.image}></img>
            </div>
            <h4>{data.product}</h4>
            <h5>{data.brand}</h5>
        </Tile>
    )
}
