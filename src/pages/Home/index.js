import React from 'react'


class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.location.user
        }
    }
    
    render() {
        console.log(this.props)
        return (
            <div>
                <p>Seu ID é: {this.state.id}</p>
            </div>
        )
    }
}


export default Home