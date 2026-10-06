import { z } from 'zod'

// Schema de resposta do backend (deve ser mantido em sync com o contracts)
const agentResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(['available', 'busy', 'offline']).default('available'),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Agent = z.infer<typeof agentResponseSchema>

export interface AgentsList {
  agents: Agent[]
}

export class AgentsService {
  private baseUrl: string

  constructor() {
    this.baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }

  async list(): Promise<AgentsList> {
    const response = await fetch(`${this.baseUrl}/api/v1/agents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch agents')
    }

    const data = await response.json()
    const result = agentResponseSchema.safeParse(data.data)

    if (!result.success) {
      throw new Error('Invalid agent data format')
    }

    return {
      agents: result.data,
    }
  }

  async get(id: string): Promise<Agent> {
    const response = await fetch(`${this.baseUrl}/api/v1/agents/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch agent')
    }

    const data = await response.json()
    const result = agentResponseSchema.safeParse(data.data)

    if (!result.success) {
      throw new Error('Invalid agent data format')
    }

    return result.data
  }
}

// Instância singleton para uso em toda a aplicação
export const agentsService = new AgentsService()