import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ChevronRight, Search, Filter } from 'lucide-react';
import { allProperties } from '../data';
import { Property } from '../types';
import { PropertyModal } from '../components/PropertyModal';

export const PropertiesPage = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = allProperties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-deep-navy pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <h2 className="text-brand-orange font-medium uppercase tracking-widest text-xs sm:text-sm">Our Catalog</h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cream">Luxury Properties</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-oatmeal/40" />
              <input 
                type="text" 
                placeholder="Search location or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-blue-gray/20 border border-brand-cream/10 rounded-full py-3 pl-12 pr-6 text-brand-cream focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue-gray/40 border border-brand-cream/10 rounded-full text-brand-cream hover:bg-brand-blue-gray transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedProperty(property)}
              className="group relative overflow-hidden rounded-3xl bg-brand-blue-gray cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-navy/90 via-brand-deep-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 text-brand-orange mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider">{property.location}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold mb-2 text-brand-cream">{property.title}</h4>
                <div className="flex items-center justify-between">
                  <p className="text-brand-orange font-semibold text-lg">{property.price}</p>
                  <span className="text-brand-cream/40 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-24">
            <p className="text-brand-oatmeal text-lg">No properties found matching your search.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
