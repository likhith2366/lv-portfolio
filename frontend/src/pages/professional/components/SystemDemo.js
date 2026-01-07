import React, { useState, useEffect } from 'react';
import { useSystemView } from '../context/SystemViewContext';
import './SystemDemo.css';

function SystemDemo({ project }) {
  const { systemView } = useSystemView();
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [cacheHit, setCacheHit] = useState(null);
  const [logs, setLogs] = useState([]);

  const steps = [
    { id: 0, label: 'Client Request', icon: '👤', color: '#6366f1' },
    { id: 1, label: 'GraphQL Gateway', icon: '🌐', color: '#8b5cf6' },
    { id: 2, label: 'Cache Check', icon: '⚡', color: '#10b981', decision: true },
    { id: 3, label: 'Database Query', icon: '🗄️', color: '#f59e0b', conditional: true },
    { id: 4, label: 'Response', icon: '✓', color: '#059669' },
  ];

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, timestamp: new Date().toISOString() }]);
  };

  const runDemo = async () => {
    setIsRunning(true);
    setCurrentStep(-1);
    setLogs([]);
    setCacheHit(null);

    addLog('🚀 Starting system flow simulation...', 'system');

    // Simulate each step
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentStep(i);

      if (steps[i].id === 0) {
        addLog('📨 Incoming GraphQL request: { query: getJobs(limit: 10) }', 'request');
      }

      if (steps[i].id === 1) {
        addLog('🔍 Parsing GraphQL query and validating schema', 'processing');
        await new Promise(resolve => setTimeout(resolve, 400));
        addLog('✅ Query validated successfully', 'success');
      }

      if (steps[i].id === 2) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const hit = Math.random() > 0.5;
        setCacheHit(hit);

        if (hit) {
          addLog('⚡ CACHE HIT: Data found in Redis', 'success');
          addLog('📊 Cache key: jobs_list_limit_10', 'info');
          addLog('⏱️ Latency: 12ms', 'metric');
        } else {
          addLog('❌ CACHE MISS: Data not in cache', 'warning');
          addLog('🔄 Proceeding to database query...', 'info');
        }
      }

      if (steps[i].id === 3 && cacheHit === false) {
        addLog('🗄️ Executing MongoDB query', 'processing');
        await new Promise(resolve => setTimeout(resolve, 600));
        addLog('📄 Retrieved 10 documents', 'success');
        addLog('⏱️ Query time: 145ms', 'metric');
        addLog('💾 Storing result in Redis (TTL: 300s)', 'info');
      }

      if (steps[i].id === 4) {
        await new Promise(resolve => setTimeout(resolve, 400));
        addLog('✅ Response sent to client', 'success');
        const totalTime = cacheHit ? '12ms' : '157ms';
        addLog(`⚡ Total latency: ${totalTime}`, 'metric');
        addLog('🎉 Request completed successfully', 'system');
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setIsRunning(false);
    setCurrentStep(-1);
  };

  const resetDemo = () => {
    setCurrentStep(-1);
    setCacheHit(null);
    setLogs([]);
    setIsRunning(false);
  };

  return (
    <div className="system-demo">
      {/* Controls */}
      <div className="demo-controls">
        <button
          className={`demo-btn ${isRunning ? 'running' : 'primary'}`}
          onClick={runDemo}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <span className="spinner">⟳</span>
              Running...
            </>
          ) : (
            <>
              <span>▶</span>
              Run Sample Flow
            </>
          )}
        </button>

        <button
          className="demo-btn secondary"
          onClick={resetDemo}
          disabled={isRunning}
        >
          Reset
        </button>

        {systemView && (
          <div className="demo-system-info">
            <span>SIMULATION_MODE::active</span>
            <span>LATENCY::realistic</span>
          </div>
        )}
      </div>

      {/* Pipeline Visualization */}
      <div className="pipeline-visualization">
        <div className="pipeline-steps">
          {steps.map((step, index) => {
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;
            const isSkipped = step.conditional && cacheHit === true && step.id === 3;

            return (
              <React.Fragment key={step.id}>
                <div
                  className={`pipeline-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isSkipped ? 'skipped' : ''}`}
                  style={{ '--step-color': step.color }}
                >
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-label">{step.label}</div>

                  {step.decision && cacheHit !== null && (
                    <div className={`step-decision ${cacheHit ? 'hit' : 'miss'}`}>
                      {cacheHit ? 'HIT' : 'MISS'}
                    </div>
                  )}

                  {isSkipped && (
                    <div className="step-skipped">SKIPPED</div>
                  )}

                  {isActive && (
                    <div className="step-pulse" style={{ borderColor: step.color }} />
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div className={`pipeline-connector ${isCompleted ? 'completed' : ''}`}>
                    {step.decision && cacheHit !== null && (
                      <div className="connector-label">
                        {cacheHit ? 'cached' : 'fetch'}
                      </div>
                    )}
                    {!isSkipped && isActive && (
                      <div className="connector-flow" style={{ background: step.color }} />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Cache Decision Branching */}
      {cacheHit !== null && (
        <div className="cache-decision-diagram">
          <div className="decision-title">Cache Decision Branch</div>
          <div className="decision-branches">
            <div className={`decision-branch ${cacheHit ? 'active' : 'inactive'}`}>
              <div className="branch-label">✓ Cache Hit</div>
              <div className="branch-detail">Redis → Response</div>
              <div className="branch-metric">~12ms latency</div>
            </div>
            <div className={`decision-branch ${!cacheHit ? 'active' : 'inactive'}`}>
              <div className="branch-label">✗ Cache Miss</div>
              <div className="branch-detail">MongoDB → Cache → Response</div>
              <div className="branch-metric">~157ms latency</div>
            </div>
          </div>
        </div>
      )}

      {/* Logs */}
      {logs.length > 0 && (
        <div className="demo-logs">
          <div className="logs-header">
            <span className="logs-title">Execution Logs</span>
            <span className="logs-count">{logs.length} entries</span>
          </div>
          <div className="logs-content">
            {logs.map((log, index) => (
              <div key={index} className={`log-entry log-${log.type}`}>
                <span className="log-timestamp">
                  {new Date(log.timestamp).toLocaleTimeString('en-US', { hour12: false })}
                </span>
                <span className="log-message">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Details (System View) */}
      {systemView && (
        <div className="demo-tech-details">
          <h4>Technical Implementation</h4>
          <div className="tech-detail-grid">
            <div className="tech-detail-item">
              <div className="tech-detail-label">GraphQL Layer</div>
              <div className="tech-detail-value">Apollo Server + Express</div>
            </div>
            <div className="tech-detail-item">
              <div className="tech-detail-label">Cache Strategy</div>
              <div className="tech-detail-value">Redis with 5min TTL</div>
            </div>
            <div className="tech-detail-item">
              <div className="tech-detail-label">Database</div>
              <div className="tech-detail-value">MongoDB with connection pooling</div>
            </div>
            <div className="tech-detail-item">
              <div className="tech-detail-label">Auth</div>
              <div className="tech-detail-value">JWT with 15min access token</div>
            </div>
            <div className="tech-detail-item">
              <div className="tech-detail-label">Rate Limiting</div>
              <div className="tech-detail-value">100 req/min per user</div>
            </div>
            <div className="tech-detail-item">
              <div className="tech-detail-label">Monitoring</div>
              <div className="tech-detail-value">Grafana + Structured logs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SystemDemo;
