import { z } from 'zod'

// Schema de resposta do backend
const auditResponseSchema = z.object({
  readiness: z.object({
    score: z.number(),
    maxScore: z.number(),
    percentage: z.string(),
  }),
  bars: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
  lastAudit: z.object({
    date: z.string(),
    project: z.string(),
  }),
})

export type AuditResponse = z.infer<typeof auditResponseSchema>

export class AuditService {
  private baseUrl: string

  constructor() {
    this.baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }

  async getReadiness(): Promise<AuditResponse> {
    const response = await fetch(`${this.baseUrl}/api/v1/audit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch audit data')
    }

    const data = await response.json()
    const result = auditResponseSchema.safeParse(data)

    if (!result.success) {
      throw new Error('Invalid audit data format')
    }

    return result.data
  }
}

// Instância singleton
export const auditService = new AuditService()