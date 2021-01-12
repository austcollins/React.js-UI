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
            value: 0,
            inputValue: ''
        };
        this.inputValueChanged = this.inputValueChanged.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.addToCounter = this.addToCounter.bind(this);
        this.setCounter = this.setCounter.bind(this);
        this.refreshCounter = this.refreshCounter.bind(this);
        this.deleteCounter = this.deleteCounter.bind(this);
        // passed from parent
        this.deleteCounterHandler = this.deleteCounterHandler.bind(this);

    }

    componentDidMount() {
        this.updateValue();
        // Set up a timer to update the value every second
        this.timerID = setInterval(
            () => this.updateValue(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    inputValueChanged(evt) {
        this.setState({inputValue: evt.target.value});
    }

    updateValue() {
        // get the value from the API
        fetch(API_URL + this.state.name)
        .then(res => res.text())
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            value: res
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

    addToCounter(evt) {
        const requestOptions = {
            method: 'POST',
            body: this.state.inputValue
        };
        fetch(API_URL + this.state.name, requestOptions)
        .then(res => res.text())
      .then(
        (res) => {
            console.log(res);
          this.setState({
            isLoaded: true,
            value: res
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

    setCounter(evt) {
        const requestOptions = {
            method: 'PUT',
            body: this.state.inputValue
        };
        fetch(API_URL + this.state.name, requestOptions)
        .then(res => res.text())
      .then(
        (res) => {
            console.log(res);
          this.setState({
            isLoaded: true,
            value: res
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

    refreshCounter(evt) {
        this.updateValue();
    }

    deleteCounter(evt) {
        /* TODO: Delete the react component */
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(API_URL + this.state.name, requestOptions)
      .then(
        (res) => {
            console.log(res);
          this.setState({
            isLoaded: false,
          });
          this.deleteCounterHandler(this.props.name)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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
                        <input type="number" class="counter_newval" value={this.state.inputValue} onChange={this.inputValueChanged}/>
                        <button class="add" onClick={this.addToCounter}>add</button>
                        <button class="set" onClick={this.setCounter}>set</button>
                        <button class="delete" onClick={this.deleteCounter}>delete</button>
                        <button class="refresh" onClick={this.updateValue}>refresh</button>
                </div>
            );
        }
    }
}

/**
 * Base Application Component
 */

class App  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counters: [],
            counterNameInput: '',
        }

        this.deleteCounterHandler = this.deleteCounterHandler.bind(this);
        this.addCounter = this.addCounter.bind(this);
        this.counterNameInputChanged = this.counterNameInputChanged.bind(this);
    }
    addCounter(evt) {
        const counters = this.state.counters;
        counters.push(this.state.counterNameInput);
        this.setState({
            counters: counters,
            counterNameInput: ''
    });
    }
    counterNameInputChanged(evt) {
        this.setState({counterNameInput: evt.target.value});
    }
    deleteCounterHandler(name) {
        const counters = this.state.counters;
        const index = counters.indexOf(name);
        if (index > -1) {
            counters.splice(index, 1);
        }
        this.setState({counters: counters});
    }
    render() {
        const counterElements = [];

        for (const counter in this.state.counters) {
            counterElements.push(<Counter name={this.state.counters[counter]} deleteCounterHandler={this.deleteCounterHandler}/>);
        }
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
                                placeholder="Enter name..." onChange={this.counterNameInputChanged}
                        />
                        <button id="add-counter" onClick={this.addCounter}>Create</button>
                    </p>
                </section>
                <section id="counters">
                    {counterElements}
                </section>
                <footer>

                </footer>
        </main>
        );
    }
}
  
/**
 * Initial Render
 */

ReactDOM.render(
    <App />,
    document.getElementById('root')
);