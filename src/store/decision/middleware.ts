import {DecisionActionType, DecisionState} from './types'
import decisionResource from '../../resources/decision.resource'
import {pushDecisionErrorResponse, pushDecisionSuccessResponse} from './action'
import {Store} from 'redux'
import {now} from '../../services/date.service'

export type Next = (action: DecisionActionType) => void
export type DecisionStore = Store<DecisionState, DecisionActionType>

const middleware = (store: any) => (next: any) => (action: DecisionActionType) => {
  switch (action.type) {
    case 'PUSH_DECISION':
      next(action)
      const {errorMessage} = store.getState()
      if (!errorMessage) {
        pushDecision(store)
      }
      break
    default:
      next(action)
  }
}

const pushDecision = ({getState, dispatch}: DecisionStore) => {
  const {decisionMaker, decisionValue, decisionAuthority} = getState()
  decisionResource.postDecision({
    decisionMakerName: decisionMaker!!.name,
    value: decisionValue,
    authority: decisionAuthority,
    date: now()
  }).then(() => dispatch(pushDecisionSuccessResponse()))
    .catch(error => dispatch(pushDecisionErrorResponse(error)))
}

export default middleware
