import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {

    state = { lat: null, long: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ lat: position.coords.latitude })
                this.setState({ long: position.coords.longitude })
            },
            err => this.setState({ errorMessage: err.message })
        );
    }

    render() {
        if (this.state.errorMessage && !this.state.lat) {
            return (
            <div>
                <h1>Error: {this.state.errorMessage}</h1>
            </div>
            )
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} long={this.state.long}/>
        }
        return <Spinner />
    }
}

ReactDOM.render(<App />, document.getElementById('root'));