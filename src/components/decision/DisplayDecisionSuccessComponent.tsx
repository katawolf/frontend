import React from 'react'
import Alert from 'react-bootstrap/Alert'
import {connect, ConnectedProps} from 'react-redux'
import {DecisionState} from '../../store/decision/types'

const mapState = ({success}: DecisionState) => ({success})

const connector = connect(mapState, null)

type PropsFromRedux = ConnectedProps<typeof connector>

const idName = 'display-decision-success-component'

const DisplayDecisionSuccessComponent: React.FC<PropsFromRedux> = ({success}) => {
  return (
    <div id={idName}>
      {success &&
      <Alert variant="success">
        <Alert.Heading>The decision was made successfully</Alert.Heading>
      </Alert>}
    </div>)
}

export default connector(DisplayDecisionSuccessComponent)
