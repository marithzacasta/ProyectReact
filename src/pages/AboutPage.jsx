import React from 'react';
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  Zap, 
  Shield,
  Star,
  Github,
  ExternalLink
} from 'lucide-react';


const AboutPage = () => {
  const personalInfo = {
    name: "Marithza Castaño",
    title: "Desarrollador Full Stack",
    description: "Apasionada por crear soluciones web innovadoras y experiencias digitales excepcionales. Me especializo en el desarrollo full stack con un enfoque particular en tecnologías modernas de React y Node.js.",
    email: "marithzacastano9.5@gmail.com",
    github: "https://github.com/marithzacasta/ProyectReact",
    linkedin: "https://www.linkedin.com/in/marithza-castaño-paniagua-713415276"
  };

  const technologies = [
    {
      name: "React + TypeScript",
      description: "Framework principal para el desarrollo del frontend con tipado estático",
      icon: "⚛️"
    },
    {
      name: "Tailwind CSS",
      description: "Framework de CSS utilitario para diseño responsive y moderno",
      icon: "🎨"
    },
    {
      name: "Lucide React",
      description: "Librería de iconos SVG optimizados para React",
      icon: "🎯"
    },
    {
      name: "SweetAlert",
      description: "Librería para modales y alertas elegantes y personalizables",
      icon: "🚨"
    },
    {
      name: "API TMDB",
      description: "The Movie Database API para obtener información de películas y series",
      icon: "🎬"
    },
    {
      name: "API Personalizada",
      description: "Backend propio desarrollado para manejo de usuarios y autenticación",
      icon: "🔧"
    },
    {
      name: "Vite",
      description: "Herramienta de build rápida y moderna para aplicaciones web",
      icon: "⚡"
    },
    {
      name: "Node.js",
      description: "Runtime de JavaScript para el desarrollo del backend",
      icon: "🟢"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-blue-600 font-semibold mb-4">
                {personalInfo.title}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {personalInfo.description}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Globe size={18} />
                  <span>Enviar Email</span>
                </a>
                
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stack Técnico</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Este proyecto está construido con tecnologías modernas y herramientas de vanguardia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.name}</h3>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Architecture */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Arquitectura del Proyecto
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Frontend</h3>
              <p className="text-gray-600">
                React con TypeScript, Tailwind CSS para estilos, y Lucide React para iconografía. 
                Diseño responsive y moderno.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Database className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Backend</h3>
              <p className="text-gray-600">
                API personalizada desarrollada con Node.js para manejo de usuarios, 
                autenticación y integración con servicios externos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">APIs</h3>
              <p className="text-gray-600">
                Integración con TMDB API para datos de entretenimiento y 
                sistema de alertas con SweetAlert para mejor UX.
              </p>
            </div>

            
          </div>
          
        </div>


        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 ">
          
          
          aa
        </div>
        

      </div>
    </div>
  );
};

export default AboutPage;