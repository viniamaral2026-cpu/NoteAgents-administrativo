'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChatPanel } from '~/src/components/ChatPanel'
import { Footer } from '~/src/components/layout/Footer'
import { projectsService, auditService } from '~/src/lib/services'
import { MetricCard } from '~/src/components/layout/MetricCard'
import {
  Activity,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  CircleHelp,
  Database,
  FileText,
  FolderKanban,
  Github,
  LayoutDashboard,
  Menu,
  Network,
  Play,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Projetos', href: '/app/projetos', icon: FolderKanban },
  { label: 'Chat com IA', href: '/app/chat', icon: Sparkles },
  { label: 'Fontes', href: '/app/fontes', icon: FileText },
  { label: 'Agentes', href: '/app/agentes', icon: Bot },
  { label: 'Pipelines', href: '/app/pipelines', icon: Network },
  { label: 'Auditorias', href: '/app/auditorias', icon: ShieldCheck },
  { label: 'Banco de dados', href: '/app/banco-de-dados', icon: Database },
  { label: 'Integrações', href: '/app/integracoes', icon: Github },
  { label: 'Ambiente', href: '/app/ambiente', icon: Terminal },
  { label: 'Orquestrador', href: '/app/orquestrador', icon: Network },
  { label: 'Memória', href: '/app/memoria', icon: Database },
  { label: 'Ferramentas', href: '/app/ferramentas', icon: Settings },
  { label: 'Evidências', href: '/app/evidencias', icon: ShieldCheck },
  { label: 'Observabilidade', href: '/app/observabilidade', icon: Activity },
  { label: 'CLI', href: '/app/cli', icon: Terminal },
]

const platformModules = [
  ['Engineering Brain', 'Código, runtime, arquitetura, banco e infraestrutura'],
  ['Knowledge Brain', 'Fontes, documentos, requisitos e contexto persistente'],
  ['Evidence Engine', 'Auditorias, evidências, validação e readiness'],
  ['Agent Runtime', 'Agentes, ferramentas, permissões e execução verificável'],
]

function MetricCard({ icon: Icon, label, value, color }: { icon: typeof Activity; label: string; value: string; color: string }) {
  return <div className="metric-card"><div className={`metric-icon ${color}`}><Icon size={17} /></div><div><span>{label}</span><strong>{value}</strong></div></div>
}

function SectionCard({ title, children, action }: { title: string; children: React.ReactNode; action?: string }) {
  return <section className="panel"><div className="panel-heading"><h3>{title}</h3>{action && <button className="text-button">{action}<ArrowRight size={13} /></button>}</div>{children}</section>
}

export default function HomePage() {
  const pathname = usePathname()
  const active = navItems.find((item) => pathname === item.href)?.label ?? 'Dashboard'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showHero, setShowHero] = useState(pathname !== '/dashboard')
  const [projects, setProjects] = useState([])
  const [auditReadiness, setAuditReadiness] = useState({ score: 0, percentage: '0%' })
  const [auditBars, setAuditBars] = useState([])
  const [lastAudit, setLastAudit] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const projList = await projectsService.list()
        setProjects(projList.projects)
        const auditData = await auditService.getReadiness()
        setAuditReadiness(auditData.readiness)
        setAuditBars(auditData.bars)
        setLastAudit(auditData.lastAudit)
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Calcular métricas a partir dos projetos reais
  const projectCount = projects.length
  const activeProjects = projects.filter(p => p.status === 'active').length

  // Determinar conteúdo do header hero baseado na rota ativa
  const heroContent = showHero ? (
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-brand">
          <div className="hero-logo">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icone-RxzatGh5zLyRqc6WE6I32LuIblr1nd.png"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <span>Note<strong>Agents</strong></span>
        </div>
        <p className="eyebrow">ENGENHARIA DE SOFTWARE ASSISTIDA POR IA</p>
        <h1>Do planejamento à produção,<br /><em>com inteligência, evidência e automação.</em></h1>
        <p className="hero-subtitle">Uma plataforma completa para desenvolvedores, projetos e equipes.</p>
        <div className="hero-actions">
          <Link className="primary-button" href="/login">Começar agora <ArrowRight size={16} /></Link>
          <button className="secondary-button" onClick={() => setShowHero(false)}>
            Ver demonstração <Play size={14} />
          </button>
        </div>
      </div>
      <div className="hero-preview">
        <div className="preview-window">
          <div className="preview-top">
            <Brand compact />
            <span>Dashboard</span>
            <div className="window-dots"><i /><i /><i /></div>
          </div>
          <div className="preview-body">
            <div className="mini-sidebar">
              {navItems.slice(0, 7).map(({ icon: Icon }, i) => <Icon key={i} size={11} />)}
            </div>
            <div className="mini-content">
              <div className="mini-title">Dashboard <span>Últimos 30 dias</span></div>
              <div className="mini-metrics">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="mini-grid">
                <div className="mini-chart">
                  <div className="fake-line" />
                </div>
                <div className="mini-list">
                  <b>Últimas execuções</b>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null}

  return (
    <main className="site-shell">
      {showHero && heroContent}

      <div className="app-frame">
        <header className="app-header">
          <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
            <Menu />
          </button>
          <Brand />
          <div className="project-picker">
            <span>Projeto atual</span>
            <strong>Todos os projetos</strong>
            <ChevronDown size={14} />
          </div>
          <div className="header-actions">
            <Link className="login-link" href="/login">Entrar</Link>
            <button className="search-button">
              <Search size={15} />Buscar <kbd>⌘ K</kbd>
            </button>
            <button className="icon-button" aria-label="Ajuda">
              <CircleHelp size={17} />
            </button>
            <div className="avatar">VA</div>
          </div>
        </header>

        <div className="app-layout">
          <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="mobile-sidebar-head">
              <Brand compact />
              <button onClick={() => setSidebarOpen(false)} aria-label="Fechar menu">
                <X />
              </button>
            </div>
            <div className="sidebar-label">Workspace</div>
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className={`nav-item ${active === label ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            ))}
            <div className="sidebar-bottom">
              <button className="nav-item">
                <Settings size={16} />
                <span>Configurações</span>
              </button>
              <div className="sidebar-user">
                <div className="avatar">VA</div>
                <div>
                  <strong>Vini Amaral</strong>
                  <span>Administrador</span>
                </div>
              </div>
            </div>
          </aside>

          {sidebarOpen && <button className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu" />}

          <div className="workspace">
            <div className="page-heading">
              <div>
                <p className="breadcrumb">Workspace / Visão geral</p>
                <h2>{active}</h2>
                <p className="muted">Acompanhe seus projetos, agentes e qualidade de engenharia.</p>
              </div>
              <button className="primary-button small">
                <Sparkles size={15} /> Nova análise
              </button>
            </div>

            <div className="metrics-grid">
              {projects.map((project) => (
                <MetricCard
                  key={project.id}
                  icon={FolderKanban}
                  label={project.name}
                  value={project.description?.substring(0, 20) || '—'}
                  color="blue"
                />
              ))}
            </div>

            <div className="dashboard-grid">
              <SectionCard title="Execuções dos agentes" action="Últimos 30 dias">
                <div className="chart-wrap">
                  <div className="chart-y">
                    <span>50</span>
                    <span>25</span>
                    <span>0</span>
                  </div>
                  <div className="chart">
                    <div className="chart-area" />
                    <div className="chart-axis">
                      <span>Mai</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Ago</span>
                      <span>Set</span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Agentes disponíveis" action="Ver todos">
                <div className="agent-list">
                  {/* Agents will be rendered here once fetched */}
                </div>
              </SectionCard>

              <SectionCard title="Projetos recentes" action="Ver projetos">
                <div className="empty-state">
                  {projectCount === 0 ? (
                    <FolderKanban size={24} />
                    <b>Nenhum projeto cadastrado</b>
                    <span>Os projetos do usuário aparecerão aqui após a integração com o backend.</span>
                  ) : (
                    <p>Existem {projectCount} projetos cadastrados</p>
                  )}
                </div>
              </SectionCard>

<SectionCard title="Últimas auditorias" action="Ver histórico">
                <div className="audit-score">
                  {lastAudit ? (
                    <div>
                      <div className="score-ring">
                        <strong>{auditReadiness.score}</strong>
                        <span>/100</span>
                      </div>
                      <div>
                        <b>Pronto para produção</b>
                        <span>Auditoria atualizada {lastAudit}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="audit-empty">
                      <div className="empty-icon">
                        <ShieldCheck size={48} />
                      </div>
                      <b>Sem auditorias</b>
                      <span>Nenhuma auditoria registrada</span>
                    </div>
                  )}
                </div>
                <div className="audit-bars">
                  {auditBars.map((bar, i) => (
                    <div key={bar.label}>
                      <span>{bar.label}</span>
                      <div>
                        <i style={{ width: bar.value }} />
                      </div>
                      <b>{bar.value}</b>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Arquitetura do produto" action="Ver documentação">
                <div className="runtime-architecture">
                  <div className="architecture-root">
                    <div className="architecture-node root-node">
                      <Sparkles size={16} />
                      <b>NoteAgents</b>
                      <span>Plataforma de engenharia assistida por IA</span>
                    </div>
                  </div>
                  <div className="architecture-branches">
                    <div className="architecture-node cloud-node">
                      <Network size={15} />
                      <b>Cloud Runtime</b>
                      <div className="node-items">
                        <span><Bot size={12} /> Agents</span>
                        <span><Sparkles size={12} /> Skills</span>
                        <span><Github size={12} /> MCP</span>
                      </div>
                    </div>
                    <div className="architecture-node local-node">
                      <Terminal size={15} />
                      <b>Local Runtime</b>
                      <div className="node-items">
                        <span><Terminal size={12} /> CLI</span>
                      </div>
                    </div>
                  </div>
                  <div className="architecture-connector">
                    <span>Orchestrator</span>
                    <ArrowRight size={14} />
                    <span>Execution</span>
                  </div>
                  <div className="architecture-services">
                    <span><Database size={13} /> Memory</span>
                    <span><Settings size={13} /> Tools</span>
                    <span><ShieldCheck size={13} /> Evidence</span>
                  </div>
                  <div className="observability-bar">
                    <Activity size={14} />
                    <b>Observability</b>
                    <span>Logs, traces, métricas e estado de execução</span>
                  </div>
                </div>
              </SectionCard>
            </div>

            <SectionCard title="Pipeline de agentes" action="Ver pipeline">
              <div className="pipeline">
                {['Descobrir', 'Analisar', 'Planejar', 'Implementar', 'Verificar'].map((step, i) => (
                  <div
                    className="pipeline-step"
                    key={step}
                  >
                    <div className={`pipeline-dot d${i}`}>
                      {i < 3 ? <Check size={11} /> : i + 1}
                    </div>
                    <div>
                      <b>{step}</b>
                      <span>{i < 3 ? 'Concluído' : 'Aguardando execução'}</span>
                    </div>
                  </div>
                  {i < 4 && <div className="pipeline-line" />}
                )}
              </div>
            </SectionCard>

            <SectionCard title="Atividade recente" action="Ver tudo">
              <div className="activity-list">
                <div>
                  <span className="activity-dot green" />
                  <p>
                    <b>Auditoria concluída</b>
                    <small>Projeto ViaPay · há 12 min</small>
                  </p>
                </div>
                <div>
                  <span className="activity-dot blue" />
                  <p>
                    <b>Nova execução do agente</b>
                    <small>Frontend Agent · há 28 min</small>
                  </p>
                </div>
                <div>
                  <span className="activity-dot violet" />
                  <p>
                    <b>Fonte sincronizada</b>
                    <small>documentacao.md · há 1 h</small>
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </main>
  )
}