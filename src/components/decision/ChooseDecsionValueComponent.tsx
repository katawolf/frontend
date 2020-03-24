import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect, ConnectedProps } from 'react-redux'
import { DecisionState } from '../../store/decision/types'
import { chooseDecisionValue } from '../../store/decision/action'

const mapState = ({ decisionValue }: DecisionState) =>
  ({ decisionValue })

const mapDispatch = {
  chooseDecisionValue
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const idName = "choice-decision-value-component"

const ChooseDecisionValueComponent: React.FC<PropsFromRedux> = ({ decisionValue, chooseDecisionValue }) =>
  <Form id={idName}>
    <fieldset>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          Decision authority :
          </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="radio"
            label="Accepted"
            name="choiceDecisionValue"
            onChange={() => chooseDecisionValue("ACCEPTED")}
            checked={decisionValue === "ACCEPTED"}
          />
          <Form.Check
            type="radio"
            label="Refused"
            name="choiceDecisionValue"
            onChange={() => chooseDecisionValue("REFUSED")}
            checked={decisionValue === "REFUSED"}
          />
        </Col>
      </Form.Group>
    </fieldset>
  </Form>

export default connector(ChooseDecisionValueComponent)