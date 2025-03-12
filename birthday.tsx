"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function BirthdayCard() {
  const [isCandle, setIsCandle] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      launchConfetti()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const launchConfetti = () => {
    const duration = 3 * 1000
    const end = Date.now() + duration
    const colors = ["#ff77e1", "#77c9ff", "#ffde59", "#ff5757", "#77ff8e", "#c377ff"]
    ;(function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }

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
              ["bg-pink-300", "bg-blue-300", "bg-yellow-300", "bg-green-300", "bg-purple-300"][i % 5]
            }`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              rotate: Math.random() * 360,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: Math.random() * 360 + 180,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 30 + 10}px`,
              borderRadius: "40%",
            }}
          />
        ))}
      </div>

      {/* Main content container - centered */}
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-black"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Happy Birthday Baby!!
        </h1>

        {/* Cake and plate container */}
        <div className="relative w-full h-80 flex items-center justify-center mb-8">
          {/* Plate */}
          <motion.div
            className="absolute bottom-0 w-72 h-6 bg-white rounded-[50%] shadow-lg z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute inset-0 rounded-[50%] border-4 border-gray-100"></div>
            <div className="absolute inset-1 rounded-[50%] border-2 border-gray-50"></div>
          </motion.div>

          {/* Cake - positioned directly on the plate */}
          <motion.div
            className="absolute bottom-4 w-56"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.3 }}
          >
            {/* Bottom layer (now smaller) */}
            <div className="relative h-20 bg-pink-200 rounded-2xl overflow-hidden">
              {/* Polka dots */}
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-pink-300"
                  style={{
                    left: `${(i % 3) * 35 + 15}%`,
                    top: `${Math.floor(i / 3) * 35 + 15}%`,
                  }}
                />
              ))}
              {/* Bottom layer frosting */}
              <div className="absolute -top-2 left-0 w-full h-4 bg-white rounded-t-xl"></div>
            </div>

            {/* Top layer (now larger) */}
            <div className="relative h-24 w-[125%] -ml-[12.5%] -mt-4 bg-pink-200 rounded-2xl overflow-hidden z-20">
              {/* Polka dots */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`top-${i}`}
                  className="absolute w-4 h-4 rounded-full bg-pink-300"
                  style={{
                    left: `${(i % 4) * 30 + 10}%`,
                    top: `${Math.floor(i / 4) * 30 + 10}%`,
                  }}
                />
              ))}
              {/* Top layer frosting */}
              <div className="absolute -top-2 left-0 w-full h-4 bg-white rounded-t-xl"></div>
            </div>

            {/* Top frosting */}
            <div className="relative w-[125%] -ml-[12.5%] z-30">
              <div className="absolute -top-4 left-0 w-full h-6 bg-white rounded-t-xl"></div>
            </div>

            {/* Candles */}
            <div className="absolute -top-12 left-0 w-full flex justify-center gap-6 z-40">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative">
                  {/* Candle body */}
                  <div className="w-4 h-16 bg-white rounded-md overflow-hidden">
                    {/* Stripes */}
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="w-full h-4 bg-blue-300" style={{ marginTop: j * 8 }} />
                    ))}
                  </div>
                  {/* Wick */}
                  <div className="absolute -top-1 left-1/2 w-1 h-2 bg-gray-800 -translate-x-1/2"></div>
                  {/* Flame */}
                  {isCandle && (
                    <motion.div
                      className="absolute -top-7 left-1/2 -translate-x-1/2 cursor-pointer"
                      onClick={handleCandleClick}
                      animate={{
                        rotate: [-5, 5, -5],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <div className="w-4 h-6">
                        <div className="absolute bottom-0 w-4 h-4 bg-yellow-300 rounded-full"></div>
                        <div className="absolute bottom-1 w-3 h-5 bg-orange-400 rounded-full left-0.5"></div>
                        <div className="absolute bottom-2 w-2 h-4 bg-red-500 rounded-full left-1"></div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Message - centered */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="text-center w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-xl text-black font-medium" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Your wish came true! 🎉
              </p>
              <motion.button
                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full font-medium shadow-md hover:bg-pink-600 transition-colors"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={launchConfetti}
              >
                More Confetti!
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
