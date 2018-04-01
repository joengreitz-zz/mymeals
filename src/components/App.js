import React, { Component } from 'react';
import { addRecipe } from '../actions'

class App extends Component {
  state = {
    calendar: null
  }

  /*When our component mounts, run lifecycle method*/
  componentDidMount () {
    /*Grab store from props*/
    const { store } = this.props
    /*Subscribe to any changes that happen in redux store and call setState to get state out of store and into component state*/
    store.subscribe(() => {
      this.setState(() => ({
        /*When store changes, calendar should be whatever store.getState() returns us i.e. current state of our store*/
        calendar: store.getState()
      }))
    })
  }

  /*Call store.dispatch and envoke addRecipe action creator*/
  submitFood = () => {
    this.props.store.dispatch(addRecipe({
      day: 'monday',
      meal: 'breakfast',
      recipe: {
        label: this.input.value
      }
    }))
    /*Reset input value to be an empty string*/
    this.input.value = ''
  }

  render() {
    return (
      <div>
          <input
            type='text'
            ref={(input) => this.input = input}
            placeholder="Monday's Breakfast"
          />
          <button onClick={this.submitFood}>Submit</button>

          <pre>
            Monday Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
          </pre>
        </div>
    );
  }
}

export default App;
