import React from 'react';

export interface Project {
  title: string;
  category: string;
  description: string[];
  features: string[];
  tech: string[];
  color: string;
  icon: React.ReactNode;
  github?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Publication {
  title: string;
  journal: string;
  issn?: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  icon?: React.ReactNode;
}

export interface Experience {
  role: string;
  org: string;
  period?: string;
  details: string[];
}

export interface Achievement {
  title: string;
  role: string;
  description: string[];
}
