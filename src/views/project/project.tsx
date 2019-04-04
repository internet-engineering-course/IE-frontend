import React, { Component } from 'react'
import Header from 'src/views/common/Header.tsx'
import Footer from 'src/views/common/Footer.tsx'
import Bar from "src/views/common/bar/Bar.tsx";

export default class project extends Component<Props , State> {
    constructor(props: Props){
        super(props);
    }
    render() {
        return (
			<div>
				<Header isUserLoggedIn={true} />
				<main>
					<Bar height={'100px'}/>
				</main>
				<Footer />
			</div>
        )
    }
}

interface Props{}
interface State{}