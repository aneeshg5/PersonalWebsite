import { useState, useEffect, useCallback } from "react"

interface UseDynamicBadgeCountOptions {
  technologies: string[]
  containerWidth: number
  minVisible?: number
}

/**
 * Custom hook to calculate how many technology badges can fit in 2 lines
 * while reserving space for the "+X more" badge
 */
export function useDynamicBadgeCount({
  technologies,
  containerWidth,
  minVisible = 2,
}: UseDynamicBadgeCountOptions): number {
  const [visibleCount, setVisibleCount] = useState(minVisible)

  const calculateVisibleCount = useCallback(() => {
    if (technologies.length === 0) return 0
    if (containerWidth === 0) return minVisible

    // Constants for badge width estimation
    const GAP = 8 // gap-1.5 sm:gap-2 (using smaller value for mobile-first)
    const BADGE_PADDING = 24 // horizontal padding (px-3)
    const CHAR_WIDTH = 6.5 // average character width for text-xs
    const MORE_BADGE_WIDTH = 70 // estimated width of "+X more" badge

    // Calculate estimated width for each badge
    const badgeWidths = technologies.map(
      (tech) => tech.length * CHAR_WIDTH + BADGE_PADDING
    )

    let line1Width = 0
    let line2Width = 0
    let count = 0

    for (let i = 0; i < badgeWidths.length; i++) {
      const badgeWidth = badgeWidths[i]
      
      // Check if we need the "+X more" badge after this one
      const remainingTechs = technologies.length - (i + 1)
      const needsMoreBadge = remainingTechs > 0

      // Try to fit in line 1 first
      const line1WidthWithBadge = line1Width === 0 ? badgeWidth : line1Width + GAP + badgeWidth
      if (line1WidthWithBadge <= containerWidth) {
        line1Width = line1WidthWithBadge
        count++
      } else {
        // Can't fit in line 1, try line 2
        const line2WidthWithBadge = line2Width === 0 ? badgeWidth : line2Width + GAP + badgeWidth
        
        // Calculate available width on line 2 (reserve space for "+X more" if needed)
        const line2AvailableWidth = needsMoreBadge 
          ? containerWidth - MORE_BADGE_WIDTH - GAP
          : containerWidth
        
        if (line2WidthWithBadge <= line2AvailableWidth) {
          line2Width = line2WidthWithBadge
          count++
        } else {
          // Can't fit in line 2 either, stop here
          break
        }
      }

      // If we've reached the end and all fit, return total count
      if (i === badgeWidths.length - 1) {
        return count
      }
    }

    // Ensure we show at least the minimum number
    return Math.max(count, minVisible)
  }, [technologies, containerWidth, minVisible])

  useEffect(() => {
    const newCount = calculateVisibleCount()
    setVisibleCount(newCount)
  }, [calculateVisibleCount])

  return visibleCount
}

