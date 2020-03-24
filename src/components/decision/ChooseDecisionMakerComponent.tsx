import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DecisionMaker from '../../models/DecisionMaker'
import { connect, ConnectedProps } from 'react-redux'
import { chooseDecisionMaker } from '../../store/decision/action'

const mapDispatch = {
  chooseDecisionMaker
}

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

interface Props {
  decisionMakers: DecisionMaker[]
}

const idName = "choice-decision-maker-component"

const ChooseDecisionMakerComponent: React.FC<Props & PropsFromRedux> = ({ decisionMakers, chooseDecisionMaker }) => {

  const onChangeDecisionMaker = (decisionMakerName?: string) => {
    const decisionMaker = decisionMakers.find((it) => it.name === decisionMakerName)
    chooseDecisionMaker(decisionMaker)
  }

  return (
    <Form id={idName}>
      <Form.Group as={Row} controlId="formHorizontalEmail">
        <Form.Label column sm={2}>Decision maker : </Form.Label>
        <Col sm={10}>
          <Form.Control as="select" onChange={(event: any) => onChangeDecisionMaker(event.target.value)}>
            <option></option>
            {
              decisionMakers.map((decisionMaker) =>
                <option key={decisionMaker.name} value={decisionMaker.name}>{decisionMaker.name}</option>)
            }
          </Form.Control>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default connector(ChooseDecisionMakerComponent)