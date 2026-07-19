import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    home: "Home",
    map: "Map",
    tickets: "My Seat",
    help: "Help",
    language: "Language",
    scores: "World Cup Scores",
    liveUpcoming: "Live and upcoming matches",
    rulebook: "View Tournament Rulebook",
    selectLanguage: "Select Language",
    reportIncident: "Report an Incident",
    reportIncidentDesc: "See something? Let staff know right away.",
    selectZone: "Select nearby zone",
    incidentType: "What's happening?",
    descriptionLabel: "Describe what you see",
    descriptionPlaceholder: "e.g. Long line blocking the walkway, spilled drink, someone needs help...",
    submitReport: "Submit Report",
    reportSubmitted: "Thanks — your report has been sent to staff.",
    chooseOption: "Choose an option",
  },
  es: {
    home: "Inicio",
    map: "Mapa",
    tickets: "Mi Asiento",
    help: "Ayuda",
    language: "Idioma",
    scores: "Marcadores de la Copa del Mundo",
    liveUpcoming: "Partidos en vivo y próximos",
    rulebook: "Ver Reglamento del Torneo",
    selectLanguage: "Seleccionar Idioma",
    reportIncident: "Reportar un Incidente",
    reportIncidentDesc: "¿Viste algo? Avisa al personal de inmediato.",
    selectZone: "Selecciona la zona cercana",
    incidentType: "¿Qué está pasando?",
    descriptionLabel: "Describe lo que ves",
    descriptionPlaceholder: "ej. Fila larga bloqueando el paso, bebida derramada, alguien necesita ayuda...",
    submitReport: "Enviar Reporte",
    reportSubmitted: "Gracias — tu reporte fue enviado al personal.",
    chooseOption: "Elige una opción",
  },
  fr: {
    home: "Accueil",
    map: "Carte",
    tickets: "Mon Siège",
    help: "Aide",
    language: "Langue",
    scores: "Scores de la Coupe du Monde",
    liveUpcoming: "Matchs en direct et à venir",
    rulebook: "Voir le Règlement du Tournoi",
    selectLanguage: "Choisir la Langue",
    reportIncident: "Signaler un Incident",
    reportIncidentDesc: "Vous avez remarqué quelque chose ? Prévenez le personnel immédiatement.",
    selectZone: "Sélectionnez la zone la plus proche",
    incidentType: "Que se passe-t-il ?",
    descriptionLabel: "Décrivez ce que vous voyez",
    descriptionPlaceholder: "ex. File d'attente bloquant le passage, boisson renversée, quelqu'un a besoin d'aide...",
    submitReport: "Envoyer le Signalement",
    reportSubmitted: "Merci — votre signalement a été envoyé au personnel.",
    chooseOption: "Choisissez une option",
  },
  pt: {
    home: "Início",
    map: "Mapa",
    tickets: "Meu Assento",
    help: "Ajuda",
    language: "Idioma",
    scores: "Placar da Copa do Mundo",
    liveUpcoming: "Partidas ao vivo e próximas",
    rulebook: "Ver Regulamento do Torneio",
    selectLanguage: "Selecionar Idioma",
    reportIncident: "Relatar um Incidente",
    reportIncidentDesc: "Viu algo? Avise a equipe imediatamente.",
    selectZone: "Selecione a zona próxima",
    incidentType: "O que está acontecendo?",
    descriptionLabel: "Descreva o que você vê",
    descriptionPlaceholder: "ex. Fila longa bloqueando a passagem, bebida derramada, alguém precisa de ajuda...",
    submitReport: "Enviar Relatório",
    reportSubmitted: "Obrigado — seu relatório foi enviado à equipe.",
    chooseOption: "Escolha uma opção",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = (key) => translations[language]?.[key] ?? translations.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}