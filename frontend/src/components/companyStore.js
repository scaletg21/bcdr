import { create } from 'zustand';

const useCompanyStore = create((set) => ({
  companyId: null,
  setCompanyId: (id) => set({ companyId: id }),
  clearCompanyId: () => set({ companyId: null }),
  
}));

export default useCompanyStore;