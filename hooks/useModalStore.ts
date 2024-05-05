import { create } from "zustand";

export type modalType = "showResults" | "quitQuiz";

interface AdditionalData {
  score?: number;
  limit?: number;
}

interface modalStore {
  type: modalType | null;
  isOpen: boolean;
  additionalData: AdditionalData;
  progress: number;
  progressRate: number;
  gratitudeVisible: boolean;
  smileyVisible: boolean;
  contributorsVisible: boolean;
  setProgress: (value: number, rate: number) => void;
  setVisibility: (gratitude: boolean, contributors: boolean, smiley: boolean) => void;
  onOpen: (type: modalType, data?: AdditionalData) => void;
  onClose: () => void;
}

const useModalStore = create<modalStore>((set) => ({
  type: null,
  isOpen: false,
  additionalData: {},
  progress: 0,
  progressRate: 0,
  gratitudeVisible: false,
  smileyVisible: false,
  contributorsVisible: false,
  setProgress: (value: number, rate: number) => {
    set({ progress: value, progressRate: rate });
  },
  setVisibility: (gratitude: boolean, contributors: boolean, smiley: boolean) => {
    set({gratitudeVisible: gratitude, contributorsVisible: contributors, smileyVisible: smiley});
  },
  onOpen: (type, data) => {
    set({ 
      isOpen: true, 
      type, 
      progress: 0,
      progressRate: 0,
      gratitudeVisible: false,
      smileyVisible: false,
      contributorsVisible: false,
      additionalData: { ...data } });
      
      const progressValue = data?.score || 0;
      const progressPercent = (100 * progressValue / (data?.limit || 1));

      setTimeout(() => {
        set({
          progress: progressValue, 
          progressRate: progressPercent
        });
      }, 500);
    
      setTimeout(() => {
        set({
          gratitudeVisible: true,
        });
      }, 1800);
    
      setTimeout(() => {
        set({
          contributorsVisible: true,
        });
      }, 2800);
    
      setTimeout(() => {
        set({
          smileyVisible: true,
        });
      }, 4000);  
  },
  onClose: () => set({ type: null, isOpen: false, additionalData: {} }),
}));

export default useModalStore;
