import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

const App = ({actions}) => (
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection actions={actions} />
  </div>
)

App.propTypes = {
  actions: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapDispatchToProps
)(App)
