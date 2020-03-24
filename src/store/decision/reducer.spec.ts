import decisionReducer, {initialState} from './reducer'
import {DecisionActionType, DecisionState} from './types'
import {DecisionAuthority, DecisionValue} from '../../models/Decision'

const decisionMaker = {
  name: 'name',
  hasSigningAuthority: true,
  hasCreditAuthority: false
}

const currentState: DecisionState = {
  ...initialState,
  decisionMaker,
  decisionAuthority: 'RECOMMANDATION',
  decisionValue: 'ACCEPTED'
}

describe('decision reducer', () => {
  test('should handle initial state', () => {
    expect(
      decisionReducer(undefined, {} as DecisionActionType)
    ).toEqual({
      decisionAuthority: 'RECOMMANDATION',
      decisionValue: 'ACCEPTED',
      success: false
    })
  })

  test('should handle CHOOSE_DECISION_MAKER', () => {
    expect(
      decisionReducer(initialState, {
        type: 'CHOOSE_DECISION_MAKER',
        payload: decisionMaker
      })
    ).toEqual({
      ...initialState,
      decisionMaker
    })

    expect(
      decisionReducer({...initialState, decisionMaker}, {
        type: 'CHOOSE_DECISION_MAKER',
        payload: {...decisionMaker, name: 'toto'}
      })
    ).toEqual({
      ...initialState,
      decisionMaker: {...decisionMaker, name: 'toto'}
    })

    expect(
      decisionReducer({...initialState, decisionMaker}, {
        type: 'CHOOSE_DECISION_MAKER'
      })
    ).toEqual(initialState)

    expect(
      decisionReducer({
        decisionAuthority: 'CREDIT',
        decisionValue: 'REFUSED',
        success: false
      }, {
        type: 'CHOOSE_DECISION_MAKER',
        payload: decisionMaker
      })
    ).toEqual({
      ...initialState,
      decisionMaker
    })
  })

  test.each([
    'RECOMMANDATION',
    'SIGNING',
    'CREDIT'
  ] as DecisionAuthority[])('should handle CHOOSE_DECISION_AUTHORITY', (decisionAuthority) => {
    expect(
      decisionReducer(initialState, {
        type: 'CHOOSE_DECISION_AUTHORITY',
        payload: decisionAuthority
      })
    ).toEqual({
      ...initialState,
      decisionAuthority
    })
  })

  test.each([
    'ACCEPTED',
    'REFUSED'
  ] as DecisionValue[])('should handle CHOOSE_DECISION_AUTHORITY', (decisionValue) => {
    expect(
      decisionReducer(initialState, {
        type: 'CHOOSE_DECISION_VALUE',
        payload: decisionValue
      })
    ).toEqual({
      ...initialState,
      decisionValue
    })
  })

  test('should handle PUSH_DECISION', () => {
    expect(
      decisionReducer(initialState, {
        type: 'PUSH_DECISION'
      })
    ).toEqual({
      ...initialState,
      errorMessage: 'You must choose a decision maker !'
    })

    expect(
      decisionReducer(currentState, {
        type: 'PUSH_DECISION'
      })
    ).toEqual({
      ...initialState,
      decisionMaker,
      decisionAuthority: 'RECOMMANDATION',
      decisionValue: 'ACCEPTED'
    })
  })

  test('should handle PUSH_DECISION_SUCCESS_RESPONSE', () => {
    expect(
      decisionReducer(currentState, {
        type: 'PUSH_DECISION_SUCCESS_RESPONSE'
      })
    ).toEqual({
      ...initialState,
      success: true
    })
  })

  test('should handle PUSH_DECISION_ERROR_RESPONSE', () => {
    const errorMessage = 'An error'
    expect(
      decisionReducer(currentState, {
        type: 'PUSH_DECISION_ERROR_RESPONSE',
        payload: errorMessage
      })
    ).toEqual({
      ...currentState,
      errorMessage,
      success: false
    })
  })
})
