"use client";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/src/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      if (previous === undefined) return;
      
      let direction = current - previous;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent border-white/[0.1] rounded-full bg-brand-deep-navy/80 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        <Link to="/" className="mr-4 hidden sm:block">
          <img 
            src="https://res.cloudinary.com/dm7sxhaeb/image/upload/v1774345837/AGC_Amazing_Properties_background_removed_bw6osr.png" 
            alt="AGC Amazing Properties Logo" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>
        {navItems.map((navItem: any, idx: number) => {
          const isExternal = navItem.link.startsWith("/");
          const isActive = location.pathname === navItem.link;
          
          return (
            <Link
              key={`link=${idx}`}
              to={navItem.link}
              className={cn(
                "relative text-brand-cream items-center flex space-x-1 hover:text-brand-orange transition-colors px-2 py-1",
                isActive && "text-brand-orange"
              )}
            >
              <span className="block md:hidden">{navItem.icon}</span>
              <span className="hidden md:block text-sm font-medium">{navItem.name}</span>
            </Link>
          );
        })}
        <button className="border text-xs sm:text-sm font-medium relative border-brand-cream/20 text-brand-cream px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-brand-cream/10 transition-colors shrink-0">
          <span className="hidden xs:inline">Contact Us</span>
          <span className="xs:hidden">Contact</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-brand-orange to-transparent h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
