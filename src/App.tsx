import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Info, 
  Briefcase, 
  Phone, 
  Building2, 
  TrendingUp, 
  Key, 
  HardHat, 
  MapPin, 
  Mail, 
  PhoneCall,
  ArrowRight,
  Instagram,
  Facebook,
  Linkedin,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingNav } from './components/ui/floating-nav';
import ImageCursorTrail from './components/ui/image-cursor-trail';
import { PropertyModal } from './components/PropertyModal';
import { allProperties, luxuryImages } from './data';
import { Property } from './types';
import { PropertiesPage } from './pages/Properties';

const navItems = [
  { name: "Home", link: "/", icon: <Home className="w-4 h-4" /> },
  { name: "Properties", link: "/properties", icon: <Building2 className="w-4 h-4" /> },
  { name: "About", link: "/#about", icon: <Info className="w-4 h-4" /> },
  { name: "Services", link: "/#services", icon: <Briefcase className="w-4 h-4" /> },
  { name: "Contact", link: "/#contact", icon: <Phone className="w-4 h-4" /> },
];

const services = [
  {
    title: "Buying & Selling",
    description: "Expert guidance in navigating the property market for both buyers and sellers.",
    icon: <Building2 className="w-8 h-8 text-brand-orange" />,
  },
  {
    title: "Property Investments",
    description: "Strategic investment opportunities designed to grow your wealth through real estate.",
    icon: <TrendingUp className="w-8 h-8 text-brand-orange" />,
  },
  {
    title: "Rentals & Management",
    description: "Comprehensive property management services for landlords and quality rentals for tenants.",
    icon: <Key className="w-8 h-8 text-brand-orange" />,
  },
  {
    title: "Construction",
    description: "High-quality property construction services from foundation to finish.",
    icon: <HardHat className="w-8 h-8 text-brand-orange" />,
  },
];

const ParallaxSection = ({ image, children }: { image: string, children: React.ReactNode }) => {
  return (
    <section className="relative h-[60vh] sm:h-[80vh] w-full overflow-hidden flex items-center justify-center group">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-deep-navy/80 via-brand-deep-navy/40 to-brand-deep-navy/80 backdrop-blur-[1px]" />
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
        {children}
      </div>
    </section>
  );
};

const HomePage = () => {
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);
  const featuredProperties = allProperties.slice(0, 3);

  return (
    <>
      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="min-h-screen w-full relative">
        <ImageCursorTrail 
          items={luxuryImages} 
          className="min-h-screen w-full flex flex-col items-center justify-start pt-48 sm:pt-64"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center mb-6"
              >
                <img 
                  src="https://res.cloudinary.com/dm7sxhaeb/image/upload/v1774345837/AGC_Amazing_Properties_background_removed_bw6osr.png" 
                  alt="AGC Amazing Properties Logo" 
                  className="h-24 sm:h-32 md:h-40 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-brand-cream leading-[1.1] md:leading-tight">
                We don't <span className="text-brand-orange italic">BUY</span> and sit on properties,<br className="hidden sm:block" />
                We <span className="text-brand-orange italic">SELL</span> Them.
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-brand-oatmeal text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4"
            >
              Experience the pinnacle of luxury real estate in South Africa. From Johannesburg's skyline to Mafikeng's finest estates.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col xs:flex-row items-center justify-center gap-4 px-4"
            >
              <Link to="/properties" className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-brand-cream text-brand-deep-navy font-semibold rounded-full hover:bg-brand-orange hover:text-brand-deep-navy transition-all duration-300 flex items-center justify-center gap-2 group">
                Explore Properties
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#services" className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-brand-cream/20 text-brand-cream font-semibold rounded-full hover:bg-brand-cream/10 transition-all duration-300 text-center">
                Our Services
              </a>
            </motion.div>
          </div>
        </ImageCursorTrail>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 bg-brand-blue-gray/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <h2 className="text-brand-orange font-medium uppercase tracking-widest text-xs sm:text-sm">What We Do</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-cream">Core Expertise</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="glass-card p-6 sm:p-8 group cursor-default"
              >
                <div className="mb-6 p-4 bg-brand-cream/5 rounded-2xl w-fit group-hover:bg-brand-orange/20 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 text-brand-cream">{service.title}</h4>
                <p className="text-brand-oatmeal text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-brand-orange font-medium uppercase tracking-widest text-xs sm:text-sm">Curated Selection</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-cream">
                Featured Listings
              </h3>
            </div>
            <Link 
              to="/properties"
              className="text-brand-orange flex items-center gap-2 hover:gap-4 transition-all group text-sm sm:text-base"
            >
              View All Properties <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-navy via-brand-deep-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                  <div className="flex items-center gap-2 text-brand-orange mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider">{property.location}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-2 text-brand-cream">{property.title}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-brand-orange font-semibold text-base sm:text-lg">{property.price}</p>
                    <span className="text-brand-cream/40 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Background Section */}
      <ParallaxSection image="https://res.cloudinary.com/dm7sxhaeb/image/upload/v1774352813/2148182997_ze0lxv.jpg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h2 className="text-brand-orange font-medium uppercase tracking-widest text-xs sm:text-sm">Our Vision</h2>
          <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold text-brand-cream leading-tight">
            Building Legacies, <br /> One Home at a Time.
          </h3>
          <p className="text-brand-cream/80 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            We believe that every property has a story, and every client has a dream. Our mission is to bridge that gap with excellence and integrity.
          </p>
          <div className="pt-8">
            <Link to="/properties" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-brand-deep-navy font-bold rounded-full hover:bg-brand-cream transition-colors group">
              Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </ParallaxSection>

      {/* About Section / CTA */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-orange/5 -skew-y-6 transform origin-top-left" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-brand-orange font-medium uppercase tracking-widest text-xs sm:text-sm">About AGC Amazing Properties</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-brand-cream">
              Redefining Real Estate <br /> Excellence.
            </h3>
            <p className="text-brand-oatmeal text-base sm:text-lg leading-relaxed">
              With our head office in Johannesburg and a dedicated branch in Mafikeng, AGC Amazing Properties CC is more than just a real estate agency. We are your partners in wealth creation through property.
            </p>
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-brand-cream">15+</p>
                <p className="text-brand-oatmeal/60 text-[10px] sm:text-xs uppercase tracking-wider">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-brand-cream">500+</p>
                <p className="text-brand-oatmeal/60 text-[10px] sm:text-xs uppercase tracking-wider">Properties Sold</p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" 
                alt="Modern Office" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 glass-card p-6 sm:p-8 max-w-[240px] sm:max-w-xs hidden xs:block">
              <p className="italic text-sm sm:text-lg text-brand-cream">"Our mission is to turn property dreams into tangible assets."</p>
              <p className="mt-4 font-bold text-brand-orange text-xs sm:text-base">— Management Team</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-deep-navy relative overflow-hidden">
        {/* Subtle Global Background Texture */}
        <div 
          className="fixed inset-0 z-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dm7sxhaeb/image/upload/v1774352813/2148182997_ze0lxv.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <FloatingNav navItems={navItems} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
        </Routes>

        {/* Footer */}
        <footer id="contact" className="bg-brand-deep-navy pt-16 sm:pt-24 pb-12 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16">
              <div className="space-y-6">
                <Link to="/" className="block">
                  <img 
                    src="https://res.cloudinary.com/dm7sxhaeb/image/upload/v1774345837/AGC_Amazing_Properties_background_removed_bw6osr.png" 
                    alt="AGC Amazing Properties Logo" 
                    className="h-16 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <p className="text-brand-oatmeal/60 text-sm leading-relaxed">
                  Premium real estate services across South Africa. Specializing in luxury sales, management, and construction.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="p-2.5 bg-brand-cream/5 rounded-full hover:bg-brand-orange/20 transition-colors text-brand-cream">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2.5 bg-brand-cream/5 rounded-full hover:bg-brand-orange/20 transition-colors text-brand-cream">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2.5 bg-brand-cream/5 rounded-full hover:bg-brand-orange/20 transition-colors text-brand-cream">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <h5 className="font-bold uppercase tracking-widest text-[10px] sm:text-xs text-brand-orange">Head Office</h5>
                <div className="space-y-4 text-brand-oatmeal/80 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                    <p>Johannesburg, Gauteng<br />South Africa</p>
                  </div>
                  <div className="flex gap-3">
                    <PhoneCall className="w-5 h-5 text-brand-orange shrink-0" />
                    <p>+27 (0) 11 123 4567</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h5 className="font-bold uppercase tracking-widest text-[10px] sm:text-xs text-brand-orange">Mafikeng Branch</h5>
                <div className="space-y-4 text-brand-oatmeal/80 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                    <p>Mafikeng, North West<br />South Africa</p>
                  </div>
                  <div className="flex gap-3">
                    <PhoneCall className="w-5 h-5 text-brand-orange shrink-0" />
                    <p>+27 (0) 18 123 4567</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h5 className="font-bold uppercase tracking-widest text-[10px] sm:text-xs text-brand-orange">Newsletter</h5>
                <p className="text-brand-oatmeal/60 text-sm">Subscribe to get the latest luxury listings.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="bg-brand-cream/5 border border-brand-cream/10 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-orange transition-colors text-brand-cream"
                  />
                  <button className="p-2.5 bg-brand-cream text-brand-deep-navy rounded-full hover:bg-brand-orange hover:text-brand-deep-navy transition-colors shrink-0">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-brand-oatmeal/40 text-[10px] sm:text-xs text-center sm:text-left">
              <p>© 2026 AGC Amazing Properties CC. All rights reserved.</p>
              <div className="flex gap-6 sm:gap-8">
                <a href="#" className="hover:text-brand-cream transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand-cream transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
