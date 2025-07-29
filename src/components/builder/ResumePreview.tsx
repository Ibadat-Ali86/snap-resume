import React from 'react';
import { ResumeData } from '@/lib/store';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, ExternalLink, Github } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { 
    personalInfo = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      summary: ''
    }, 
    experience = [], 
    education = [], 
    projects = [], 
    skills = [] 
  } = data || {};

  return (
    <div className="bg-white p-8 font-roboto text-sm leading-relaxed" style={{ minHeight: '297mm', width: '210mm', maxWidth: '100%' }}>
      {/* Header Section */}
      <header className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        {/* Contact Information */}
        <div className="flex flex-wrap gap-4 text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-1">
              <Linkedin className="h-4 w-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-gray-600 text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                
                {exp.description && (
                  <p className="text-gray-700 mb-2">{exp.description}</p>
                )}
                
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
                
                {edu.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {edu.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      {project.link && (
                        <ExternalLink className="h-4 w-4 text-blue-600" />
                      )}
                      {project.github && (
                        <Github className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.startDate} - {project.current ? 'Present' : project.endDate}
                  </div>
                </div>
                
                {project.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {project.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Skills
          </h2>
          
          {/* Technical Skills */}
          {skills.filter(s => s.category === 'technical').length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter(s => s.category === 'technical')
                  .map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {skills.filter(s => s.category === 'soft').length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter(s => s.category === 'soft')
                  .map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {skills.filter(s => s.category === 'language').length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter(s => s.category === 'language')
                  .map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill.name} ({skill.level})
                    </span>
                  ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Empty State */}
      {!personalInfo.firstName && !personalInfo.lastName && (
        <div className="flex items-center justify-center h-96 text-gray-400">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-lg">Your resume preview will appear here</p>
            <p className="text-sm">Start by filling out your personal information</p>
          </div>
        </div>
      )}
    </div>
  );
};