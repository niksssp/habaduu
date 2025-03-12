"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function BirthdayCard() {
  const [isCandle, setIsCandle] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  
  // Trigger confetti when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      launchConfetti()
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Launch confetti effect
  const launchConfetti = () => {
    const duration = 3 * 1000
    const end = Date.now() + duration
    
    const colors = ['#ff77e1', '#77c9ff', '#ffde59', '#ff5757', '#77ff8e', '#c377ff']
    
    ;(function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })
      
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }())
  }
  
  // Toggle candle animation
  const handleCandleClick = () => {
    setIsCandle(false)
    setTimeout(() => {
      setShowMessage(true)
      launchConfetti()
    }, 300)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4">
      {/* Floating confetti pieces */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-6 h-12 rounded-full opacity-70 ${
              ['bg-pink-300', 'bg-blue-300', 'bg-yellow-300', 'bg-green-300', 'bg-purple-300'][i % 5]
            }`}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20,
              rotate: Math.random() * 360,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: window.innerHeight + 20,
              rotate: Math.random() * 360 + 180
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 30 + 10}px`,
              borderRadius: '40%'
            }}
          />
        ))}
      </div>
      
      {/* Birthday text */}
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-center mb-8 text-pink-600 drop-shadow-md"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          transition: { 
            type: "spring",
            damping: 12,
            stiffness: 100
          }
        }}
      >
        <motion.span
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [-2, 2, -2, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="inline-block"
        >
          Happy Birthday Baby!!
        </motion.span>
      </motion.h1>
      
      {/* Cake container */}
      <motion.div 
        className="relative"
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          transition: { 
            type: "spring",
            damping: 12,
            delay: 0.3
          }
        }}
      >
        {/* Cake plate */}
        <motion.div
          className="absolute -bottom-8 w-64 h-16 bg-white rounded-full shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.9,
            transition: { delay: 0.5 }
          }}
        />
        
        {/* Cake body */}
        <motion.div 
          className="w-56 h-40 bg-gradient-to-b from-pink-400 to-pink-500 rounded-2xl relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          {/* Cake layers */}
          <div className="absolute top-1/3 w-full h-1 bg-pink-300"></div>
          <div className="absolute top-2/3 w-full h-1 bg-pink-300"></div>
          
          {/* Frosting */}
          <motion.div 
            className="absolute -top-2 left-0 w-full h-16 bg-yellow-200 rounded-t-3xl"
            style={{ borderBottomLeftRadius: '40%', borderBottomRightRadius: '30%' }}
            initial={{ y: -20 }}
            animate={{ 
              y: 0,
              transition: { 
                delay: 0.7,
                type: "spring",
                damping: 10
              }
            }}
          >
            {/* Frosting drips */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 bg-yellow-200"
                style={{
                  left: `${i * 14 + 2}%`,
                  width: '12%',
                  height: `${Math.random() * 20 + 15}px`,
                  borderBottomLeftRadius: '40%',
                  borderBottomRightRadius: '40%'
                }}
                initial={{ y: -10, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { 
                    delay: 0.8 + (i * 0.05),
                    type: "spring",
                    damping: 8
                  }
                }}
              />
            ))}
          </motion.div>
          
          {/* Candle */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div 
              className="relative cursor-pointer"
              onClick={handleCandleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Candle body */}
              <motion.div 
                className="w-6 h-16 bg-gradient-to-b from-blue-100 to-blue-200 rounded-md"
                animate={{ 
                  scaleY: [1, 0.98, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              
              {/* Candle flame */}
              <AnimatePresence>
                {isCandle && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [-5, 5, -5]
                    }}
                    exit={{ 
                      scale: 0,
                      opacity: 0,
                      y: -10
                    }}
                    transition={{ 
                      duration: 0.5,
                      repeat: i
