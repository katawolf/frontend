import axios from 'axios'
import {Decision} from '../models/Decision'

export const PREFIX_URL = '/decision'

export class DecisionResource {

  readonly domain: string

  constructor(base: string = "") {
    this.domain = `${base}${PREFIX_URL}`
  }

  public async getLastDecision(): Promise<Decision> {
    try {
      const response = await axios.get(`${this.domain}/last-decision`)
      return response.data
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  public async getDecisionMakers() {
    try {
      const response = await axios.get(`${this.domain}/decision-makers`)
      return response.data
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  public async postDecision(decision: Decision) {
    const response = await axios.post(`${this.domain}`, decision)
    return response.data
  }

}

const decisionResource = new DecisionResource()
export default decisionResource
