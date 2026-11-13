import React, { useState } from 'react';
import { Search, Filter, BookOpen, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATES_DATA } from '../data/templatesData';
import { TemplateCard } from '../components/templates/TemplateCard';
import { useWriting } from '../context/WritingContext';
import { Template, ContentCategory } from '../types';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { cn } from '../utils/cn';

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadTemplate } = useWriting();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleUseTemplate = (template: Template) => {
    loadTemplate(template);
    navigate('/workspace');
  };

  const categories = Object.values(CATEGORIES_DATA);

  // Filter templates
  const filteredTemplates = TEMPLATES_DATA.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.hinglishExample.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17191F] dark:text-[#F4F4F5]">
            Curated Writing Templates
          </h2>
          <p className="text-xs text-[#777D89] dark:text-[#9699A5] mt-1">
            Proven starting structures for certifications, projects, internships, and networking.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#777D89] dark:text-[#9699A5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search templates or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] bg-white dark:bg-[#181A20] text-[#17191F] dark:text-[#F4F4F5] placeholder-[#777D89] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 border transition-colors',
            selectedCategory === 'all'
              ? 'bg-[#6558D3] border-[#6558D3] text-white dark:bg-[#8B80FF] dark:border-[#8B80FF] dark:text-[#101114]'
              : 'bg-white dark:bg-[#181A20] border-[#E8EAF0] dark:border-[#292B33] text-[#777D89] dark:text-[#9699A5] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
          )}
        >
          All Templates ({TEMPLATES_DATA.length})
        </button>

        {categories.map((cat) => {
          const count = TEMPLATES_DATA.filter((t) => t.category === cat.id).length;
          if (count === 0) return null;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 border transition-colors',
                selectedCategory === cat.id
                  ? 'bg-[#6558D3] border-[#6558D3] text-white dark:bg-[#8B80FF] dark:border-[#8B80FF] dark:text-[#101114]'
                  : 'bg-white dark:bg-[#181A20] border-[#E8EAF0] dark:border-[#292B33] text-[#777D89] dark:text-[#9699A5] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
              )}
            >
              <span>{cat.shortName}</span>
              <span className="ml-1 opacity-75 text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#777D89] dark:text-[#9699A5] bg-white dark:bg-[#181A20] rounded-2xl border border-[#E8EAF0] dark:border-[#292B33]">
          No templates match your search query. Try searching for "AWS", "internship", or "project".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={handleUseTemplate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
