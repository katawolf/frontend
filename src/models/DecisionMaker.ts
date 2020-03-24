export default interface DecisionMaker {
  name: string
  hasSigningAuthority: boolean
  hasCreditAuthority: boolean
}

export const defaultDecisionMakers = () => ([{
  name: 'Antoine',
  hasSigningAuthority: true,
  hasCreditAuthority: true
}, {
  name: 'Marcel',
  hasSigningAuthority: true,
  hasCreditAuthority: false
}])
