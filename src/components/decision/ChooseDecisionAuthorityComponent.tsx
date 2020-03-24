import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect, ConnectedProps } from 'react-redux'
import { DecisionState } from '../../store/decision/types'
import { chooseDecisionAuthority } from '../../store/decision/action'

const mapState = ({ decisionMaker, decisionAuthority }: DecisionState) =>
  ({ decisionMaker, decisionAuthority })

const mapDispatch = {
  chooseDecisionAuthority
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const idName = "choice-decision-authority-component"

const ChooseDecisionAuthorityComponent: React.FC<PropsFromRedux> = ({ decisionMaker, decisionAuthority, chooseDecisionAuthority }) => {
  return (
    <Form id={idName}>
      {decisionMaker && <fieldset>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Decision authority :
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Recommandation"
              name="choiseDecisionAuthority"
              onChange={() => chooseDecisionAuthority("RECOMMANDATION")}
              checked={decisionAuthority === "RECOMMANDATION"}
            />
            {decisionMaker.hasSigningAuthority && <Form.Check
              type="radio"
              label="Signing"
              name="choiseDecisionAuthority"
              onChange={() => chooseDecisionAuthority("SIGNING")}
              checked={decisionAuthority === "SIGNING"}
            />}
            {decisionMaker.hasCreditAuthority && <Form.Check
              type="radio"
              label="Credit"
              name="choiceDecisionAuthority"
              onChange={() => chooseDecisionAuthority("CREDIT")}
              checked={decisionAuthority === "CREDIT"}
            />}
          </Col>
        </Form.Group>
      </fieldset>}
    </Form>)
}

export default connector(ChooseDecisionAuthorityComponent)