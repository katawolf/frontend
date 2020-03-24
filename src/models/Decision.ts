import {now} from '../services/date.service'

export type DecisionAuthority = 'RECOMMANDATION' | 'SIGNING' | 'CREDIT'

export type DecisionValue = 'ACCEPTED' | 'REFUSED'

export interface Decision {
  decisionMakerName: string
  authority: DecisionAuthority
  value: DecisionValue
  date: Date
}

export const defaultLastDecision = (): Decision => ({
  decisionMakerName: 'Jérémy',
  authority: 'RECOMMANDATION',
  value: 'ACCEPTED',
  date: now()
})
