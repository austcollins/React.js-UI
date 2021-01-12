import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * API Calls
 */

const API_URL = '/api/';

/**
 * Components
 */

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            isLoaded: false,
            value: 0
        };
    }

    componentDidMount() {
        this.updateValue();
        // Set up a timer to update the value every second
        this.timerID = setInterval(
            () => this.updateValue(),
            1000
        );
    }

    updateValue() {
        // get the value from the API

        fetch("https://counters-dot-sse-2019.appspot.com/" + this.state.name)
        .then(res => res.text())
      .then(
        (res) => {
            console.log(res)
          this.setState({
            isLoaded: true,
            value: res
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        const { error, isLoaded, value } = this.state;
        if (error) {
            console.log(error);
            return (
                <div class="counter">
                        <p class="name">{this.state.name} : ERROR</p>
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div class="counter">
                        <p class="name">{this.state.name} : Loading...</p>
                </div>
            );
        } else {
            return (
                <div class="counter">
                        <p class="name">{this.state.name} : {this.state.value}</p>
                        <input type="number" class="counter_newval"/>
                        <button class="add">add</button>
                        <button class="set">set</button>
                        <button class="delete">delete</button>
                        <button class="refresh">refresh</button>
                </div>
            );
        }
    }
}

/**
 * Base Application Component
 */

function App() {
    return (
      <main>
            <header>
              <h1>Counters</h1>
            </header>
            <section id="add-counter">
                <p>
                    <input  autoFocus id="add-name"
                            title="only accepts digits and letters a-z"
                            pattern="[a-zA-Z0-9_]+"
                            placeholder="Enter name..."
                    />
                    <button id="add-counter">Create</button>
                </p>
            </section>
            <section id="counters">
                <Counter name="counter1"/>
                <Counter name="counter2" />
                <Counter name="counter3" />
                <Counter name="counter4" />
            </section>
            <footer>

            </footer>
      </main>
    );
}
  
/**
 * Initial Render
 */

ReactDOM.render(
    <App />,
    document.getElementById('root')
);