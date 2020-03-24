import React from 'react'
import Button from 'react-bootstrap/Button'
import { connect, ConnectedProps } from 'react-redux'
import { pushDecision } from '../../store/decision/action'

const mapDispatch = {
  pushDecision
}

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const idName = "validate-decision-component"

const SubmitDecisionComponent: React.FC<PropsFromRedux> = ({ pushDecision }) =>
  <div id={idName}>
    <Button variant="primary" type="submit" onClick={() => pushDecision()}>Submit</Button>
  </div>

export default connector(SubmitDecisionComponent)