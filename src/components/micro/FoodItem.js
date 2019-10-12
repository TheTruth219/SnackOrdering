import React from 'react'
import styled from '@emotion/styled'

const Item = styled.div`
p {
    font-size:15px;
    color:grey;
}

`
export default function FoodItem({data,handleVote},index) {
    return (
        <Item className="food_item"><span onClick={()=>handleVote(data,index)} className="addIcon">+</span><p>{data.brand} {data.product}</p> <span className="vote">{data.votes}</span></Item>
    )
}
