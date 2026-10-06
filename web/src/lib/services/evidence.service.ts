import { z } from 'zod'

// Schema de resposta do backend
const evidenceRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  type: z.enum(['document', 'code', 'test', 'design', 'other']),
  source: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  projectId: z.string().optional(),
})

export type EvidenceRecord = z.infer<typeof evidenceRecordSchema>

export class EvidenceService {
  private baseUrl: string

  constructor() {
    this.baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }

  async list(projectId?: string): Promise<EvidenceRecord[]> {
    const url = projectId
      ? `${this.baseUrl}/api/v1/evidence?projectId=${projectId}`
      : `${this.baseUrl}/api/v1/evidence`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch evidence records')
    }

    const data = await response.json()
    const result = evidenceRecordSchema.array().safeParse(data)

    if (!result.success) {
      throw new Error('Invalid evidence records format')
    }

    return result.data
  }

  async get(id: string): Promise<EvidenceRecord> {
    const response = await fetch(`${this.baseUrl}/api/v1/evidence/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch evidence record')
    }

    const data = await response.json()
    const result = evidenceRecordSchema.safeParse(data)

    if (!result.success) {
      throw new Error('Invalid evidence record format')
    }

    return result.data
  }
}

// Instância singleton
export const evidenceService = new EvidenceService()