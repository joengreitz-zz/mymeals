import React, { Component } from 'react';
import { addRecipe, removeFromCalendar} from '../actions'
import { connect } from 'react-redux'

class App extends Component {
  render() {
      console.log(this.props)
      return (
      <div>
          Hello World
      </div>
    )
  }
}

/*We want to connect App component to store so that we can get Calendar state that's living inside Redux store.*/
function mapStateToProps (calendar) {
  /*Create an array of days*/
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  /*Return object with calendar property that is the result of dayOrder.map (an array)*/
  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meals] = calendar[day][meal]
          ? calendar[day][meal]
          : null

          return meals
      }, {})
    })),
  }
}

/*Alternatively, include above render function:

doThing = () => {
  this.props.dispatch(addRecipe({}))
}

*/

function mapDispatchToProps (dispatch) {
  return {
    /*What we return will be passed to our component as props*/
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data))
  }
}

/*To dispatch an action inside of a component, connect that component.*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
