import decisionResource from '../../resources/decision.resource'
import middleware from './middleware'
import {DecisionActionType, DecisionState} from './types'
import {pushDecision, pushDecisionErrorResponse, pushDecisionSuccessResponse} from './action'
import {initialState} from './reducer'
import {now} from '../../services/date.service'

jest.mock('../../services/date.service')
jest.mock('../../resources/decision.resource')

const createMiddleware = (state: DecisionState = initialState) => {
  const store: any = {
    getState: jest.fn(() => state),
    dispatch: jest.fn()
  }
  const next = jest.fn()

  const invoke = (action: DecisionActionType) => middleware(store)(next)(action)

  return {store, next, invoke}
}

const decisionMaker = {
  name: 'name',
  hasSigningAuthority: true,
  hasCreditAuthority: false
}

describe('middleware', () => {

  describe.each(['CHOOSE_DECISION_MAKER',
    'CHOOSE_DECISION_AUTHORITY',
    'CHOOSE_DECISION_VALUE',
    'PUSH_DECISION_SUCCESS_RESPONSE',
    'PUSH_DECISION_ERROR_RESPONSE'])('For $m action', (actionName: string) => {

    test('Should call redux', () => {
      const action = {type: actionName} as DecisionActionType
      const {invoke, next} = createMiddleware(initialState)
      invoke(action)
      expect(next).toBeCalledWith(action)
    })

  })

  describe('For PUSH_DECISION action', () => {

    const validState: DecisionState = {
      ...initialState,
      decisionMaker,
      decisionAuthority: 'RECOMMANDATION',
      decisionValue: 'ACCEPTED'
    }

    const invalidState: DecisionState = {
      ...initialState,
      errorMessage: 'error'
    }

    const date = new Date()
    const nowMocked = now as jest.Mock<Date>

    beforeEach(() => {
      decisionResource.postDecision = jest.fn(() => Promise.resolve())
      nowMocked.mockReturnValue(date)
    })

    afterEach(() => {
      nowMocked.mockClear()
    })

    test('Should call redux', () => {
      const action = pushDecision()
      const {invoke, next} = createMiddleware(validState)
      invoke(action)
      expect(next).toBeCalledWith(action)
    })

    describe('The state is invalidated by reducer', () => {

      let dispatch: any

      beforeEach(() => {
        const {store, invoke} = createMiddleware(invalidState)
        dispatch = store.dispatch
        invoke(pushDecision())
      })

      test('Should not call post decision', () => {
        expect(decisionResource.postDecision).not.toBeCalled()
      })

      test('Should not dispatch PUSH_DECISION_SUCCESS_RESPONSE action', () => {
        expect(dispatch).not.toBeCalledWith(pushDecisionSuccessResponse())
      })

      test('Should not dispatch PUSH_DECISION_ERROR_RESPONSE action', () => {
        expect(dispatch).not.toBeCalledWith(pushDecisionErrorResponse('An error'))
      })
    })

    describe('The state is validated by reducer', () => {

      let dispatch: any
      let invoke: any

      beforeEach(() => {
        const {store, invoke: invokeCreated} = createMiddleware(validState)
        dispatch = store.dispatch
        invoke = invokeCreated
      })

      test('Should call post decision', () => {
        invoke(pushDecision())
        expect(decisionResource.postDecision).toBeCalledWith({
          decisionMakerName: validState.decisionMaker!!.name,
          value: validState.decisionValue,
          authority: validState.decisionAuthority,
          date
        })
      })

      describe('Post decision return success', () => {

        beforeEach(() => {
          decisionResource.postDecision = jest.fn(() => Promise.resolve())
          invoke(pushDecision())
        })

        test('Should dispatch PUSH_DECISION_SUCCESS_RESPONSE action', () => {
          expect(dispatch).toBeCalledWith(pushDecisionSuccessResponse())
        })

        test('Should not dispatch PUSH_DECISION_ERROR_RESPONSE action', () => {
          expect(dispatch).not.toBeCalledWith(pushDecisionErrorResponse('an error'))
        })
      })

      describe('Post decision return error', () => {

        const error = 'An error'

        beforeEach(() => {
          decisionResource.postDecision = jest.fn(() => Promise.reject(error))
          invoke(pushDecision())
        })

        test('Should not dispatch PUSH_DECISION_SUCCESS_RESPONSE action', () => {
          expect(dispatch).not.toBeCalledWith(pushDecisionSuccessResponse())
        })

        test('Should dispatch PUSH_DECISION_ERROR_RESPONSE action', () => {
          expect(dispatch).toBeCalledWith(pushDecisionErrorResponse(error))
        })
      })
    })
  })

})
