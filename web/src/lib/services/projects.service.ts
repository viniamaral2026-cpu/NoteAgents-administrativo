import { z } from 'zod'

// Schema de resposta do backend (deve ser mantido em sync com o contracts)
const projectResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(['active', 'archived']).default('active'),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Project = z.infer<typeof projectResponseSchema>

export interface ProjectsList {
  projects: Project[]
  total: number
}

export class ProjectsService {
  private baseUrl: string

  constructor() {
    // Usa a mesma baseURL do authClient ou do ambiente
    this.baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }

  async list(): Promise<ProjectsList> {
    const response = await fetch(`${this.baseUrl}/api/v1/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Adicionar auth token quando disponível
        // 'Authorization': `Bearer ${this.getToken()}`
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }

    const data = await response.json()
    const result = projectResponseSchema.safeParse(data.data)

    if (!result.success) {
      throw new Error('Invalid project data format')
    }

    return {
      projects: result.data,
      total: data.data.length,
    }
  }

  async create(name: string, description?: string, workspaceId?: string): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/api/v1/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, workspaceId }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Failed to create project')
    }

    const data = await response.json()
    const result = projectResponseSchema.safeParse(data.data)

    if (!result.success) {
      throw new Error('Invalid project data format')
    }

    return result.data
  }

  async get(id: string): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/api/v1/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch project')
    }

    const data = await response.json()
    const result = projectResponseSchema.safeParse(data.data)

    if (!result.success) {
      throw new Error('Invalid project data format')
    }

    return result.data
  }

  async update(id: string, name: string, description?: string): Promise<Project> {
    const response = await fetch(`${this.baseUrl}/api/v1/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    })

    if (!response.ok) {
      throw new Error('Failed to update project')
    }

    const data = await response.json()
    const result = projectResponseSchema.safeParse(data.data)

    if (!result.success) {
      throw new Error('Invalid project data format')
    }

    return result.data
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/v1/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete project')
    }
  }
}

// Instância singleton para uso em toda a aplicação
export const projectsService = new ProjectsService()