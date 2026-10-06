import { z } from 'zod'

// Schema de resposta do backend
const readinessScoreSchema = z.object({
  score: z.number(),
  maxScore: z.number(),
  percentage: z.string(),
  category: z.enum(['critical', 'warning', 'good', 'excellent']),
  lastChecked: z.date(),
})

export type ReadinessScore = z.infer<typeof readinessScoreSchema>

export class ReadinessService {
  private baseUrl: string

  constructor() {
    this.baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }

  async getScore(): Promise<ReadinessScore> {
    const response = await fetch(`${this.baseUrl}/api/v1/readiness`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch readiness score')
    }

    const data = await response.json()
    const result = readinessScoreSchema.safeParse(data)

    if (!result.success) {
      throw new Error('Invalid readiness score format')
    }

    return result.data
  }
}

// Instância singleton
export const readinessService = new ReadinessService()