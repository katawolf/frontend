import React from 'react'
import Alert from 'react-bootstrap/Alert'
import {connect, ConnectedProps} from 'react-redux'
import {DecisionState} from '../../store/decision/types'

const mapState = ({errorMessage}: DecisionState) => ({errorMessage})

const connector = connect(mapState, null)

type PropsFromRedux = ConnectedProps<typeof connector>

const idName = 'display-decision-error-component'

const DisplayDecisionErrorComponent: React.FC<PropsFromRedux> = ({errorMessage}) => {
  return (
    <div id={idName}>
      {errorMessage &&
      <Alert variant="danger">
        <Alert.Heading>An error occurred during the decision</Alert.Heading>
        <p>{errorMessage}</p>
      </Alert>}
    </div>)
}

export default connector(DisplayDecisionErrorComponent)
