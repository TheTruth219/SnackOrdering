import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
position: fixed;
top:0;
background:white;
${props =>
  props.loading==="true"?`opacity:1;`:`opacity:0;`}
${props =>
  props.loading==="true"?`z-index:10;`:`z-index: -5;`}
height: 100%;
width: 100%;
display: flex;
flex-direction:column;
transition: all .5s;
justify-content:center;
img{
    height:500px;
    width:500px;
    margin:auto;
}
`

export default function Loader({loading,src,children}) {
    return (
        <Container loading={loading}>
            <img   alt="loading" src={src}/>
            {children}

        </Container>
    )
}
