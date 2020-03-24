import React from 'react'
import { Decision } from '../../models/Decision'
import Card from 'react-bootstrap/Card'

interface Props {
  decision: Decision
}

const idName = "last-decision-component"

const LastDecisionComponent: React.FC<Props> = ({ decision: { decisionMakerName, date, value } }) => {
  return (
    <Card id={idName}>
      <Card.Body>
        <Card.Title>Last decision</Card.Title>
        <Card.Text>The decision {value} take by {decisionMakerName} at {date.toString()}</Card.Text>
      </Card.Body>
    </Card>)
}

export default LastDecisionComponent