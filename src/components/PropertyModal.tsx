import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Property } from '../types';
import { cn } from '../lib/utils';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

export const PropertyModal = ({ property, onClose }: PropertyModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = property.images && property.images.length > 0 ? property.images : [property.image];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[6000] flex items-center justify-center p-4 sm:p-6 bg-brand-deep-navy/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-brand-blue-gray w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-brand-deep-navy/50 hover:bg-brand-orange text-brand-cream rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="h-[300px] lg:h-[500px] relative">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={images[currentImageIndex]} 
                  alt={`${property.title} - Image ${currentImageIndex + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-navy/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8">
                <span className="px-4 py-1.5 bg-brand-orange text-brand-deep-navy text-xs font-bold uppercase tracking-widest rounded-full">
                  {property.type}
                </span>
              </div>
            </div>
            
            {images.length > 1 && (
              <div className="p-4 bg-brand-deep-navy/30 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        "w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                        currentImageIndex === idx ? "border-brand-orange scale-105" : "border-transparent opacity-50 hover:opacity-100"
                      )}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-8 sm:p-12 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-brand-orange mb-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">{property.location}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-cream mb-4">{property.title}</h2>
              <p className="text-2xl font-bold text-brand-orange">{property.price}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-brand-cream/10">
              <div className="text-center">
                <Bed className="w-5 h-5 text-brand-orange mx-auto mb-2" />
                <p className="text-brand-cream font-bold">{property.beds}</p>
                <p className="text-brand-oatmeal text-[10px] uppercase tracking-wider">Beds</p>
              </div>
              <div className="text-center">
                <Bath className="w-5 h-5 text-brand-orange mx-auto mb-2" />
                <p className="text-brand-cream font-bold">{property.baths}</p>
                <p className="text-brand-oatmeal text-[10px] uppercase tracking-wider">Baths</p>
              </div>
              <div className="text-center">
                <Maximize className="w-5 h-5 text-brand-orange mx-auto mb-2" />
                <p className="text-brand-cream font-bold">{property.sqft}m²</p>
                <p className="text-brand-oatmeal text-[10px] uppercase tracking-wider">Area</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-cream">Description</h3>
              <p className="text-brand-oatmeal leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-cream">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature, i) => (
                  <span key={i} className="px-3 py-1 bg-brand-cream/5 border border-brand-cream/10 text-brand-oatmeal text-xs rounded-lg">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full py-4 bg-brand-orange text-brand-deep-navy font-bold rounded-2xl hover:bg-brand-cream transition-colors">
              Inquire About This Property
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
