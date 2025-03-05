import { create } from 'zustand'

export type AgreementId = 'personalConsent' | 'serviceConsent'

type Actions = {
  toggleAgreement: (id: AgreementId) => void
  toggleAllAgreements: () => void
  resetTerms: VoidFunction
}

type TermsStore = {
  checkedAgreements: Set<AgreementId>
  actions: Actions
}

export const AGREEMENTS: { id: AgreementId; text: string }[] = [
  { id: 'personalConsent', text: '(필수) 개인정보 이용 약관 동의' },
  { id: 'serviceConsent', text: '(필수) 서비스 이용 약관 동의' },
]

export const useTermsStore = create<TermsStore>((set) => ({
  checkedAgreements: new Set(),
  actions: {
    toggleAgreement: (id) => {
      set((state) => {
        const next = new Set(state.checkedAgreements)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return { checkedAgreements: next }
      })
    },
    toggleAllAgreements: () => {
      set((state) => ({
        checkedAgreements:
          state.checkedAgreements.size === AGREEMENTS.length
            ? new Set()
            : new Set(AGREEMENTS.map((a) => a.id)),
      }))
    },
    resetTerms: () => set({ checkedAgreements: new Set() }),
  },
}))

export const useCheckedAgreements = () => useTermsStore((state) => state.checkedAgreements)
export const useIsAllChecked = () =>
  useTermsStore((state) => state.checkedAgreements.size === AGREEMENTS.length)
export const useTermsActions = () => useTermsStore((state) => state.actions)
