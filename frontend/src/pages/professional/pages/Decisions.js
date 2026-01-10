import React, { useState } from 'react';
import { useSystemView } from '../context/SystemViewContext';

function Decisions() {
  const { systemView } = useSystemView();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedDecision, setExpandedDecision] = useState(null);

  const filters = ['all', 'GraphQL', 'Caching', 'Auth', 'CI/CD', 'Architecture'];

  const decisions = [
    {
      id: 1,
      title: 'GraphQL over REST for HireLink API',
      date: '2024-10',
      tags: ['GraphQL', 'Architecture'],
      context: 'HireLink needed flexible data fetching for complex job listings with nested relationships (company, location, skills).',
      alternatives: [
        { name: 'Pure REST', pros: 'Simple, widely understood', cons: 'Over-fetching, multiple endpoints needed' },
        { name: 'GraphQL only', pros: 'Flexible queries, single endpoint', cons: 'Learning curve, more complex caching' },
        { name: 'Hybrid REST + GraphQL', pros: 'Best of both', cons: 'Maintenance overhead' }
      ],
      decision: 'Chose hybrid approach: GraphQL for complex queries, REST for simple CRUD operations. GraphQL handles job search and details, REST for user auth.',
      outcome: 'Reduced API calls by 60%, improved client-side performance. Complexity manageable with clear documentation.',
      consequences: {
        positive: ['Better developer experience', 'Faster client-side rendering', 'Reduced bandwidth usage'],
        negative: ['Steeper learning curve for new developers', 'More complex caching strategy needed']
      },
      risks: 'Query complexity attacks, N+1 problem. Mitigated with query depth limiting and DataLoader.',
      metrics: '60% reduction in API calls, 200ms average response time'
    },
    {
      id: 2,
      title: 'Redis for Session and Query Caching',
      date: '2024-09',
      tags: ['Caching', 'Architecture'],
      context: 'Frequent identical job search queries causing unnecessary database load. Session management needed for JWT refresh tokens.',
      alternatives: [
        { name: 'In-memory caching', pros: 'Simple, fast', cons: 'Data lost on restart, not scalable' },
        { name: 'Redis', pros: 'Persistent, scalable, rich features', cons: 'Additional infrastructure' },
        { name: 'Database-level caching', pros: 'No extra service', cons: 'Limited control, slower' }
      ],
      decision: 'Implemented Redis with 5-minute TTL for search results, persistent storage for sessions.',
      outcome: '85% cache hit rate, reduced database load by 70%, sub-50ms cache responses.',
      consequences: {
        positive: ['Significant performance improvement', 'Better user experience', 'Lower database costs'],
        negative: ['Additional deployment complexity', 'Cache invalidation challenges']
      },
      risks: 'Cache stampede on expiration, stale data. Mitigated with cache warming and smart invalidation.',
      metrics: '85% hit rate, 12ms avg cache response, 70% DB load reduction'
    },
    {
      id: 3,
      title: 'JWT with Short-lived Access Tokens',
      date: '2024-08',
      tags: ['Auth', 'Architecture'],
      context: 'Needed secure, stateless authentication for HireLink with proper session management.',
      alternatives: [
        { name: 'Session cookies', pros: 'Simple, server-controlled', cons: 'Stateful, scaling issues' },
        { name: 'Long-lived JWTs', pros: 'Stateless, simple', cons: 'Cannot revoke, security risk' },
        { name: 'Short JWT + Refresh token', pros: 'Secure, revocable', cons: 'More complex implementation' }
      ],
      decision: '15-minute access tokens + 7-day refresh tokens stored in httpOnly cookies. Refresh tokens in Redis for revocation capability.',
      outcome: 'Secure, scalable auth system. Can revoke sessions, minimal security risk from token compromise.',
      consequences: {
        positive: ['Strong security posture', 'Scalable stateless design', 'Revocation capability'],
        negative: ['More complex token refresh flow', 'Redis dependency for revocation']
      },
      risks: 'Refresh token theft. Mitigated with httpOnly cookies, CORS restrictions, rotation on use.',
      metrics: 'Zero security incidents, < 100ms auth check latency'
    },
    {
      id: 4,
      title: 'GitHub Actions for CI/CD Pipeline',
      date: '2024-11',
      tags: ['CI/CD', 'Architecture'],
      context: 'Needed automated testing and deployment for HireLink with minimal infrastructure management.',
      alternatives: [
        { name: 'Jenkins', pros: 'Powerful, self-hosted', cons: 'Maintenance overhead, complex setup' },
        { name: 'GitHub Actions', pros: 'Integrated, simple, free tier', cons: 'Vendor lock-in, limited for complex workflows' },
        { name: 'GitLab CI', pros: 'Feature-rich', cons: 'Would require GitLab migration' }
      ],
      decision: 'GitHub Actions with workflow files for test, build, and deploy stages. Separate workflows for staging and production.',
      outcome: 'Fully automated deployments, 10-minute pipeline run time, zero failed deployments in production.',
      consequences: {
        positive: ['Fast iteration cycle', 'Automated testing enforced', 'Easy rollbacks'],
        negative: ['GitHub dependency', 'Limited to 2000 minutes/month on free tier']
      },
      risks: 'Pipeline failures blocking deployments. Mitigated with proper error handling and notifications.',
      metrics: '10min avg pipeline, 100% test coverage for critical paths'
    },
    {
      id: 5,
      title: 'Monorepo vs Separate Repos for HireLink',
      date: '2024-07',
      tags: ['Architecture'],
      context: 'Frontend and backend tightly coupled, frequent cross-stack changes needed coordinated PRs.',
      alternatives: [
        { name: 'Separate repos', pros: 'Clear separation, independent deploys', cons: 'Coordination overhead, version sync issues' },
        { name: 'Monorepo', pros: 'Atomic commits across stack, simpler coordination', cons: 'Larger repo, more complex CI' },
      ],
      decision: 'Kept separate repositories for simplicity, used Git submodules for shared types/contracts.',
      outcome: 'Clear boundaries maintained, deployment independence. Submodules solved type sharing.',
      consequences: {
        positive: ['Independent deployment cadence', 'Clear ownership boundaries', 'Smaller repo sizes'],
        negative: ['PR coordination needed for breaking changes', 'Submodule learning curve']
      },
      risks: 'Breaking changes across repos. Mitigated with API versioning and contract testing.',
      metrics: 'N/A - organizational choice'
    },
  ];

  const filteredDecisions = activeFilter === 'all'
    ? decisions
    : decisions.filter(d => d.tags.includes(activeFilter));

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', color: systemView ? '#f1f5f9' : '#0f172a' }}>
        Engineering Decisions
      </h1>
      <p style={{ fontSize: '1.25rem', color: systemView ? '#94a3b8' : '#64748b', marginBottom: '3rem' }}>
        Technical decisions, trade-offs, and lessons learned from real projects.
      </p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '0.5rem 1rem',
              background: activeFilter === filter ? (systemView ? '#10b981' : '#6366f1') : (systemView ? 'rgba(30, 41, 59, 0.6)' : 'white'),
              color: activeFilter === filter ? (systemView ? '#0f172a' : 'white') : (systemView ? '#94a3b8' : '#64748b'),
              border: `2px solid ${activeFilter === filter ? (systemView ? '#10b981' : '#6366f1') : (systemView ? '#334155' : '#e2e8f0')}`,
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Decision List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredDecisions.map(decision => (
          <div
            key={decision.id}
            style={{
              background: systemView ? 'rgba(30, 41, 59, 0.6)' : 'white',
              border: `1px solid ${systemView ? '#334155' : '#e2e8f0'}`,
              borderRadius: '1rem',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setExpandedDecision(expandedDecision === decision.id ? null : decision.id)}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: systemView ? '#f1f5f9' : '#0f172a', margin: '0 0 0.5rem 0' }}>
                  {decision.title}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {decision.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: systemView ? 'rgba(16, 185, 129, 0.1)' : '#f1f5f9',
                        color: systemView ? '#10b981' : '#6366f1',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span style={{ fontSize: '0.75rem', color: systemView ? '#64748b' : '#94a3b8', alignSelf: 'center' }}>
                    {decision.date}
                  </span>
                </div>
              </div>
              <span style={{ fontSize: '1.25rem', color: systemView ? '#94a3b8' : '#64748b', marginLeft: '1rem' }}>
                {expandedDecision === decision.id ? '▼' : '▶'}
              </span>
            </div>

            {/* Collapsed Content */}
            {expandedDecision !== decision.id && (
              <p style={{ color: systemView ? '#94a3b8' : '#64748b', lineHeight: 1.6, margin: 0 }}>
                {decision.context}
              </p>
            )}

            {/* Expanded Content */}
            {expandedDecision === decision.id && (
              <div style={{ marginTop: '1.5rem' }}>
                {/* Context */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: systemView ? '#10b981' : '#6366f1', marginBottom: '0.5rem' }}>
                    Context
                  </h4>
                  <p style={{ color: systemView ? '#94a3b8' : '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {decision.context}
                  </p>
                </div>

                {/* Alternatives */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: systemView ? '#10b981' : '#6366f1', marginBottom: '0.75rem' }}>
                    Alternatives Considered
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {decision.alternatives.map((alt, idx) => (
                      <div key={idx} style={{ padding: '1rem', background: systemView ? 'rgba(15, 23, 42, 0.6)' : '#f8fafc', borderRadius: '0.5rem' }}>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: systemView ? '#f1f5f9' : '#0f172a', marginBottom: '0.5rem' }}>
                          {alt.name}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: systemView ? '#94a3b8' : '#64748b' }}>
                          <strong style={{ color: '#10b981' }}>Pros:</strong> {alt.pros}
                          <br />
                          <strong style={{ color: '#f59e0b' }}>Cons:</strong> {alt.cons}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: systemView ? '#10b981' : '#6366f1', marginBottom: '0.5rem' }}>
                    Decision
                  </h4>
                  <p style={{ color: systemView ? '#94a3b8' : '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {decision.decision}
                  </p>
                </div>

                {/* Outcome */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: systemView ? '#10b981' : '#6366f1', marginBottom: '0.5rem' }}>
                    Outcome
                  </h4>
                  <p style={{ color: systemView ? '#94a3b8' : '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {decision.outcome}
                  </p>
                </div>

                {/* System View: Risks & Consequences */}
                {systemView && (
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '0.5rem',
                    marginTop: '1rem'
                  }}>
                    <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginBottom: '0.75rem' }}>
                      SYSTEM::RISKS_AND_MITIGATIONS
                    </div>
                    <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.8125rem', color: '#10b981', marginBottom: '1rem' }}>
                      {decision.risks}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginBottom: '0.5rem' }}>
                      METRICS:
                    </div>
                    <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.8125rem', color: '#10b981' }}>
                      {decision.metrics}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredDecisions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: systemView ? '#94a3b8' : '#64748b' }}>
          No decisions found for filter: {activeFilter}
        </div>
      )}
    </div>
  );
}

export default Decisions;
