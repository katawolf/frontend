import React from 'react'
import LastDecisionComponent from './LastDecisionComponent'
import {Decision} from '../../models/Decision'
import ChooseDecisionMakerComponent from './ChooseDecisionMakerComponent'
import DecisionMaker from '../../models/DecisionMaker'
import ChooseDecisionAuthorityComponent from './ChooseDecisionAuthorityComponent'
import ChooseDecisionValueComponent from './ChooseDecsionValueComponent'
import SubmitDecisionComponent from './SubmitDecisionComponent'
import Card from 'react-bootstrap/Card'
import DisplayDecisionErrorComponent from './DisplayDecisionErrorComponent'
import DisplayDecisionSuccessComponent from './DisplayDecisionSuccessComponent'
import decisionResource from '../../resources/decision.resource'

const idName = 'decision-component'

interface IState {
  lastDecision?: Decision;
  decisionMakers: DecisionMaker[];
}

class TakeDecisionComponent extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props)
    this.state = {
      decisionMakers: []
    }
    this.init().then()
  }

  private async init() {
    const [lastDecision, decisionMakers] = await Promise
      .all([decisionResource.getLastDecision(), decisionResource.getDecisionMakers()])
    this.setState({lastDecision, decisionMakers})
  }

  render() {
    return (
      <section id={idName} className="container">
        <DisplayDecisionSuccessComponent/>
        <DisplayDecisionErrorComponent/>
        {this.state.lastDecision && <LastDecisionComponent decision={this.state.lastDecision}/>}
        {this.state.decisionMakers.length > 0 &&
        <Card>
          <Card.Body>
            <Card.Title>Take your decision</Card.Title>
            <Card.Body>
              <ChooseDecisionMakerComponent decisionMakers={this.state.decisionMakers}/>
              <ChooseDecisionAuthorityComponent/>
              <ChooseDecisionValueComponent/>
              <SubmitDecisionComponent/>
            </Card.Body>
          </Card.Body>
        </Card>}
      </section>
    )
  }
}

export default TakeDecisionComponent
