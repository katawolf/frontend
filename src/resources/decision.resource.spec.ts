import axios from 'axios'
import decisionResource, {PREFIX_URL} from './decision.resource'
import {Decision, defaultLastDecision} from '../models/Decision'
import {defaultDecisionMakers} from '../models/DecisionMaker'

jest.mock('axios')

describe('DecisionResource', () => {

  describe('get last decision', () => {

    test('Should call last decision url', async () => {
      (axios.get as any) = jest.fn(() => Promise.resolve({}))
      await getLastDecision()
      expect(axios.get).toBeCalledWith(`${PREFIX_URL}/last-decision`)
    })

    describe('server return success', () => {

      const dataExpected = defaultLastDecision()

      beforeEach(() => {
        (axios.get as any) = jest.fn(() => Promise.resolve({data: dataExpected}))
      })

      test('Should return data', async () => {
        const {data} = await getLastDecision()
        expect(data).toEqual(dataExpected)
      })

      test('Should no throw error server', async () => {
        const {error} = await getLastDecision()
        expect(error).toBeUndefined()
      })
    })

    describe('server return error', () => {

      const errorExpected = 'An error'

      beforeEach(async () => {
        (axios.get as any) = jest.fn(() => Promise.reject(errorExpected))
        console.error = jest.fn()
      })

      test('Should log error server', async () => {
        await getLastDecision()
        expect(console.error).toBeCalledWith(errorExpected)
      })

      test('Should throw error server', async () => {
        const {error} = await getLastDecision()
        expect(error).toEqual(errorExpected)
      })

      test('Should not return data', async () => {
        const {data} = await getLastDecision()
        expect(data).toBeUndefined()
      })
    })
  })

  describe('get decision makers', () => {

    test('Should call decision makers url', async () => {
      (axios.get as any) = jest.fn(() => Promise.resolve({}))
      await getDecisionMakers()
      expect(axios.get).toBeCalledWith(`${PREFIX_URL}/decision-makers`)
    })

    describe('server return success', () => {

      const dataExpected = defaultDecisionMakers()

      beforeEach(() => {
        (axios.get as any) = jest.fn(() => Promise.resolve({data: dataExpected}))
      })

      test('Should return data', async () => {
        const {data} = await getDecisionMakers()
        expect(data).toEqual(dataExpected)
      })

      test('Should no throw error server', async () => {
        const {error} = await getDecisionMakers()
        expect(error).toBeUndefined()
      })
    })

    describe('server return error', () => {

      const errorExpected = 'An error'

      beforeEach(async () => {
        (axios.get as any) = jest.fn(() => Promise.reject(errorExpected))
        console.error = jest.fn()
      })

      test('Should log error server', async () => {
        await getDecisionMakers()
        expect(console.error).toBeCalledWith(errorExpected)
      })

      test('Should throw error server', async () => {
        const {error} = await getDecisionMakers()
        expect(error).toEqual(errorExpected)
      })

      test('Should not return data', async () => {
        const {data} = await getDecisionMakers()
        expect(data).toBeUndefined()
      })
    })
  })

  describe('post decision', () => {

    const decision = defaultLastDecision()

    test('Should call decision url', async () => {
      (axios.post as any) = jest.fn(() => Promise.resolve({}))
      await postDecision(decision)
      expect(axios.post).toBeCalledWith(`${PREFIX_URL}`, decision)
    })

    describe('server return success', () => {

      const dataExpected = defaultLastDecision()

      beforeEach(() => {
        (axios.post as any) = jest.fn(() => Promise.resolve({data: dataExpected}))
      })

      test('Should return data', async () => {
        const {data} = await postDecision(decision)
        expect(data).toEqual(dataExpected)
      })

      test('Should no throw error server', async () => {
        const {error} = await postDecision(decision)
        expect(error).toBeUndefined()
      })
    })

    describe('server return error', () => {

      const errorExpected = 'An error'

      beforeEach(async () => {
        (axios.post as any) = jest.fn(() => Promise.reject(errorExpected))
      })

      test('Should throw error server', async () => {
        const {error} = await postDecision(decision)
        expect(error).toEqual(errorExpected)
      })

      test('Should not return data', async () => {
        const {data} = await postDecision(decision)
        expect(data).toBeUndefined()
      })
    })
  })
})

const getLastDecision = async () => {
  let data, error
  try {
    data = await decisionResource.getLastDecision()
  } catch (e) {
    error = e
  }
  return {data, error}
}

const getDecisionMakers = async () => {
  let data, error
  try {
    data = await decisionResource.getDecisionMakers()
  } catch (e) {
    error = e
  }
  return {data, error}
}

const postDecision = async (decision: Decision) => {
  let data, error
  try {
    data = await decisionResource.postDecision(decision)
  } catch (e) {
    error = e
  }
  return {data, error}
}
