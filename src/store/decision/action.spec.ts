import {
  chooseDecisionMaker,
  chooseDecisionAuthority,
  chooseDecisionValue,
  pushDecision,
  pushDecisionSuccessResponse, pushDecisionErrorResponse
} from './action'
import { DecisionValue, DecisionAuthority } from '../../models/Decision'

describe("decision action", () => {

  describe("Choose decison maker", () => {
    test("Should create CHOOSE_DECISION_MAKER action", () => {
      const decisionMaker = {
        name: 'name',
        hasCreditAuthority: true,
        hasSigningAuthority: true
      }
      expect(
        chooseDecisionMaker(decisionMaker)
      ).toEqual({
        type: 'CHOOSE_DECISION_MAKER',
        payload: decisionMaker
      })
    })
    test("Should create CHOOSE_DECISION_MAKER action with undefined decision maker", () => {
      expect(
        chooseDecisionMaker()
      ).toEqual({
        type: 'CHOOSE_DECISION_MAKER'
      })
    })
  })

  describe("Choose decision authority", () => {
    test.each([
      "RECOMMANDATION",
      "SIGNING",
      "CREDIT"] as DecisionAuthority[])("Should create CHOOSE_DECISION_AUTHORITY action with %p decision authority", (decisionAuthority) => {
        expect(
          chooseDecisionAuthority(decisionAuthority)
        ).toEqual({
          type: 'CHOOSE_DECISION_AUTHORITY',
          payload: decisionAuthority
        })
      })
  })

  describe("Choose decision value", () => {
    test.each([
      "ACCEPTED",
      "REFUSED"] as DecisionValue[])("Should create CHOOSE_DECISION_VALUE action with %p decision value", (decisionValue) => {
        expect(
          chooseDecisionValue(decisionValue)
        ).toEqual({
          type: 'CHOOSE_DECISION_VALUE',
          payload: decisionValue
        })
      })
  })

  describe("Push decision", () => {
    test("Should create PUSH_DECISION action", () => {
      expect(
        pushDecision()
      ).toEqual({
        type: 'PUSH_DECISION'
      })
    })
  })

  describe("Push decision success response", () => {
    test("Should create PUSH_DECISION_SUCCESS_RESPONSE action", () => {
      expect(
        pushDecisionSuccessResponse()
      ).toEqual({
        type: 'PUSH_DECISION_SUCCESS_RESPONSE'
      })
    })
  })

  describe("Push decision error response", () => {
    test("Should create PUSH_DECISION_ERROR_RESPONSE action", () => {
      const error = "An error"
      expect(
        pushDecisionErrorResponse(error)
      ).toEqual({
        type: 'PUSH_DECISION_ERROR_RESPONSE',
        payload: error
      })
    })
  })
})
