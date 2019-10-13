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
height: 100vh;
width: 100vw;
display: flex;
flex-direction:column;
transition: all .5s;
img{
    margin:auto;
}
`

export default function Loader({loading,src}) {
    return (
        <Container loading={loading}>
            <img height="1000px" width="1000px" alt="loading" src={src}/>
            <h1 style={{marginTop:`4em`,fontSize:`40px`,alignSelf:`center`,position:`absolute`,top:`70vh`}}>We'll be back shortly....</h1>

        </Container>
    )
}
