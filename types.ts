// FIX: Import React to use React types like ReactNode.
import type React from 'react';

export interface UploadedFile {
  base64: string;
  mimeType: string;
}

export type Platform = 'LinkedIn' | 'X' | 'Blog';
export type Status = 'Draft' | 'Scheduled' | 'Published';

export interface CalendarEvent {
  id: number;
  date: Date;
  title: string;
  platform: Platform;
  status: Status;
}

// FIX: Add a shared 'Tool' type to be used across components.
export type Tool = 'ad-generator' | 'social-posts' | 'dashboard' | 'gbp-optimizer' | 'content-calendar' | 'client-services';

// Types for Client Services Section
export interface ServiceSection {
    title: string;
    items: string[];
}

export interface ClientService {
    id: string;
    icon: React.ReactNode;
    colorScheme: 'purple' | 'blue' | 'green' | 'orange';
    title: string;
    shortDescription: string;
    fullDescription: string;
    sections: ServiceSection[];
    perfectFor?: string;
}

export interface PricingPackage {
    id: string;
    icon: React.ReactNode;
    colorScheme: 'purple' | 'blue' | 'green' | 'orange';
    title: string;
    packageTitle: string;
    subtitle: string;
    shortDescription: string;
    whatsIncluded: string[];
    investment: { setup?: string; monthly?: string; total: string; };
    bestFor: string;
}

export interface CustomSolutions {
    id: string;
    icon: React.ReactNode;
    colorScheme: 'purple' | 'blue' | 'green' | 'orange';
    title: string;
    shortDescription: string;
    description: string;
    items: string[];
}

export type ServiceModalData = ClientService | PricingPackage | CustomSolutions;

export interface SavedAsset {
  id: number;
  type: 'image' | 'video';
  dataUrl: string;
  mimeType: string;
  prompt: string;
  timestamp: number;
}
