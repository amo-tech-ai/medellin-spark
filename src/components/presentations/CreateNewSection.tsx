// ==================================================
// CreateNewSection Component - My Presentations
// ==================================================
// 4 creation options: AI Generate, Template, Blank, Budgeting
// Created: January 13, 2025
// Design: Soft Intelligence system

import { Sparkles, FileText, PlusCircle, Calculator } from 'lucide-react';
import type { CreateNewSectionProps } from '@/types/presentations.types';

// ==================================================
// CREATION CARD DATA
// ==================================================

interface CreationCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  hoverColor: string;
  textColor: string;
  onClick: () => void;
}

// ==================================================
// COMPONENT
// ==================================================

export const CreateNewSection = ({
  onAIGenerate,
  onUseTemplate,
  onCreateBlank,
  onBudgeting,
  className = '',
}: CreateNewSectionProps) => {
  const cards: CreationCard[] = [
    {
      id: 'ai-generate',
      title: 'AI Generate',
      description: 'Create with AI in seconds',
      icon: Sparkles,
      color: 'bg-warm-amber',
      hoverColor: 'hover:bg-warm-amber/90',
      textColor: 'text-white',
      onClick: onAIGenerate,
    },
    {
      id: 'use-template',
      title: 'Use Template',
      description: 'Start from a proven deck',
      icon: FileText,
      color: 'bg-muted-teal',
      hoverColor: 'hover:bg-muted-teal/90',
      textColor: 'text-white',
      onClick: onUseTemplate,
    },
    {
      id: 'create-blank',
      title: 'Create Blank',
      description: 'Start from scratch',
      icon: PlusCircle,
      color: 'bg-powder-blue',
      hoverColor: 'hover:bg-powder-blue/90',
      textColor: 'text-white',
      onClick: onCreateBlank,
    },
    {
      id: 'budgeting',
      title: 'Budgeting',
      description: 'Financial planning tool',
      icon: Calculator,
      color: 'bg-deep-indigo',
      hoverColor: 'hover:bg-deep-indigo/90',
      textColor: 'text-white',
      onClick: onBudgeting,
    },
  ];

  return (
    <section className={`py-8 px-6 md:px-8 lg:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-deep-indigo mb-2">
            Create New Presentation
          </h2>
          <p className="text-base text-soft-slate">
            Choose how you want to start
          </p>
        </div>

        {/* Creation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.id}
                onClick={card.onClick}
                className={`
                  ${card.color}
                  ${card.hoverColor}
                  ${card.textColor}
                  rounded-xl p-6 text-left
                  transition-all duration-200
                  transform hover:scale-105 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-warm-amber focus:ring-offset-4
                  group
                `}
                aria-label={`${card.title}: ${card.description}`}
              >
                {/* Icon */}
                <div className="mb-4">
                  <Icon
                    className="w-8 h-8 transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>

                {/* Description */}
                <p className="text-sm opacity-90">{card.description}</p>
              </button>
            );
          })}
        </div>

        {/* Helper Text */}
        <div className="mt-4 text-center">
          <p className="text-sm text-soft-slate">
            <span className="font-semibold text-warm-amber">AI Generate</span>{' '}
            is the fastest way to create a professional presentation
          </p>
        </div>
      </div>
    </section>
  );
};
