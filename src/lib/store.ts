import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  template: 'google' | 'microsoft' | 'amazon';
}

interface ResumeStore {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  setTemplate: (template: ResumeData['template']) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  template: 'google'
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialResumeData,
      
      updatePersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...info }
          }
        })),
      
      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [
              ...state.resumeData.experience,
              { ...experience, id: crypto.randomUUID() }
            ]
          }
        })),
      
      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            )
          }
        })),
      
      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id)
          }
        })),
      
      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [
              ...state.resumeData.education,
              { ...education, id: crypto.randomUUID() }
            ]
          }
        })),
      
      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            )
          }
        })),
      
      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id)
          }
        })),
      
      addSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [
              ...state.resumeData.skills,
              { ...skill, id: crypto.randomUUID() }
            ]
          }
        })),
      
      updateSkill: (id, skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((s) =>
              s.id === id ? { ...s, ...skill } : s
            )
          }
        })),
      
      removeSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((s) => s.id !== id)
          }
        })),
      
      setTemplate: (template) =>
        set((state) => ({
          resumeData: { ...state.resumeData, template }
        }))
    }),
    {
      name: 'resume-builder-storage',
    }
  )
);