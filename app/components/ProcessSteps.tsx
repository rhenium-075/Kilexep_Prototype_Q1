'use client'

import React from 'react'

type ProcessStepsProps = {
  currentStep: number
  labels: string[]
}

export default function ProcessSteps({ currentStep, labels }: ProcessStepsProps) {
  const total = labels.length
  const safeCurrent = Math.min(Math.max(currentStep, 1), total)

  return (
    <div className="bg-transparent mb-8">
      <div className="px-4 sm:px-6 py-5">
        {/* Steps with connectors */}
        <div className="flex items-center overflow-x-auto">
          {labels.map((label, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < safeCurrent
            const isActive = stepNumber === safeCurrent

            const circleClass = isCompleted || isActive
              ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl ring-4 ring-orange-200/60'
              : 'bg-white/90 text-gray-500 border-2 border-gray-300 shadow-lg'

            return (
              <div key={stepNumber} className="flex items-center min-w-fit">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 ${circleClass}`}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`${stepNumber}단계: ${label}`}
                  >
                    <span className="text-sm font-bold">{stepNumber}</span>
                  </div>
                  <div className="mt-2 text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 text-center whitespace-nowrap">
                    {label}
                  </div>
                </div>
                {index < total - 1 && (
                  <div
                    className={`mx-3 sm:mx-4 h-1 rounded-full transition-colors duration-300 flex-1 min-w-[48px]`}
                    style={{
                      background: isCompleted
                        ? 'linear-gradient(to right, #f97316, #ea580c)'
                        : '#e5e7eb',
                    }}
                    aria-hidden
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

