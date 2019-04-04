import React, { Component } from 'react'
import Header from 'src/views/common/Header.tsx'
import Footer from 'src/views/common/Footer.tsx'
import Background from 'src/views/common/Background.tsx'

export default class Profile extends Component<Props , State> {
    constructor(props: Props){
        super(props);
    }
    render() {
        return (
        <div>
            <Header isUserLoggedIn = {true}/>
            <Background blueBackgroundHeight = {'100px'}>

            </Background>
            <Footer/>
        </div>
        )
    }
}

interface Props{}
interface State{}