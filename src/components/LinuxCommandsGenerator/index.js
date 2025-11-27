import React, { useState } from 'react';
import {
  IconTerminal2,
  IconCopy,
  IconDownload,
  IconRefresh,
  IconFolder,
  IconNetwork,
  IconShield,
  IconDatabase,
  IconCloud,
  IconBug,
  IconSettings
} from '@tabler/icons-react';
import styles from './styles.module.css';

export default function LinuxCommandsGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('system');
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [commandParams, setCommandParams] = useState({});
  const [generatedCommand, setGeneratedCommand] = useState('');

  const categories = [
    {
      id: 'system',
      name: 'System Management',
      icon: IconSettings,
      description: 'System monitoring, process management, and system info'
    },
    {
      id: 'network',
      name: 'Network',
      icon: IconNetwork,
      description: 'Network configuration, diagnostics, and tools'
    },
    {
      id: 'file',
      name: 'File Operations',
      icon: IconFolder,
      description: 'File management, permissions, and disk operations'
    },
    {
      id: 'security',
      name: 'Security',
      icon: IconShield,
      description: 'User management, permissions, and security tools'
    },
    {
      id: 'database',
      name: 'Database',
      icon: IconDatabase,
      description: 'Database management and SQL operations'
    },
    {
      id: 'cloud',
      name: 'Cloud & DevOps',
      icon: IconCloud,
      description: 'Cloud services, containers, and DevOps tools'
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Debugging',
      icon: IconBug,
      description: 'System monitoring, logs, and debugging tools'
    }
  ];

  const commands = {
    system: [
      {
        id: 'system-info',
        name: 'System Information',
        template: 'uname -a && lsb_release -a',
        description: 'Display complete system information',
        params: []
      },
      {
        id: 'disk-usage',
        name: 'Disk Usage Analysis',
        template: 'df -h {path}',
        description: 'Show disk usage for specific path',
        params: [
          {
            name: 'path',
            label: 'Path',
            type: 'text',
            default: '/',
            placeholder: 'Enter path (default: /)'
          }
        ]
      },
      {
        id: 'memory-usage',
        name: 'Memory Usage',
        template: 'free -h && ps aux --sort=-%mem | head -10',
        description: 'Show memory usage and top memory-consuming processes',
        params: []
      },
      {
        id: 'process-monitor',
        name: 'Process Monitor',
        template: 'top -b -n 1 | head -20',
        description: 'Display running processes sorted by CPU usage',
        params: []
      },
      {
        id: 'system-load',
        name: 'System Load Average',
        template: 'uptime && w',
        description: 'Show system uptime and load average',
        params: []
      },
      {
        id: 'kill-process',
        name: 'Kill Process',
        template: 'kill -{signal} {pid}',
        description: 'Terminate a process with specific signal',
        params: [
          {
            name: 'signal',
            label: 'Signal',
            type: 'select',
            default: '15',
            options: [
              { value: '15', label: 'SIGTERM (15) - Graceful termination' },
              { value: '9', label: 'SIGKILL (9) - Force kill' },
              { value: '1', label: 'SIGHUP (1) - Hang up' },
              { value: '2', label: 'SIGINT (2) - Interrupt' }
            ]
          },
          {
            name: 'pid',
            label: 'Process ID',
            type: 'number',
            placeholder: 'Enter PID'
          }
        ]
      }
    ],
    network: [
      {
        id: 'network-config',
        name: 'Network Configuration',
        template: 'ip addr show && ip route show',
        description: 'Display network interfaces and routing table',
        params: []
      },
      {
        id: 'port-scan',
        name: 'Port Scanner',
        template: 'nmap -{scan_type} {host}',
        description: 'Scan ports on a host',
        params: [
          {
            name: 'scan_type',
            label: 'Scan Type',
            type: 'select',
            default: 'sS',
            options: [
              { value: 'sS', label: 'TCP SYN scan' },
              { value: 'sT', label: 'TCP connect scan' },
              { value: 'sU', label: 'UDP scan' },
              { value: 'sP', label: 'Ping scan' }
            ]
          },
          {
            name: 'host',
            label: 'Target Host',
            type: 'text',
            placeholder: 'Enter hostname or IP'
          }
        ]
      },
      {
        id: 'network-speed',
        name: 'Network Speed Test',
        template: 'iperf3 -c {server} -t {duration} -i {interval}',
        description: 'Test network speed to a server',
        params: [
          {
            name: 'server',
            label: 'Server',
            type: 'text',
            placeholder: 'Enter server IP or hostname'
          },
          {
            name: 'duration',
            label: 'Duration (seconds)',
            type: 'number',
            default: '30'
          },
          {
            name: 'interval',
            label: 'Interval (seconds)',
            type: 'number',
            default: '5'
          }
        ]
      },
      {
        id: 'firewall-status',
        name: 'Firewall Status',
        template: 'ufw status verbose',
        description: 'Check firewall status and rules',
        params: []
      }
    ],
    file: [
      {
        id: 'find-large-files',
        name: 'Find Large Files',
        template: 'find {path} -type f -size +{size}M -exec ls -lh {} \\;',
        description: 'Find files larger than specified size',
        params: [
          {
            name: 'path',
            label: 'Search Path',
            type: 'text',
            default: '/',
            placeholder: 'Enter path to search'
          },
          {
            name: 'size',
            label: 'Minimum Size (MB)',
            type: 'number',
            default: '100'
          }
        ]
      },
      {
        id: 'backup-directory',
        name: 'Backup Directory',
        template: 'rsync -av --progress {source}/ {destination}/',
        description: 'Sync/backup directory using rsync',
        params: [
          {
            name: 'source',
            label: 'Source Directory',
            type: 'text',
            placeholder: '/path/to/source'
          },
          {
            name: 'destination',
            label: 'Destination Directory',
            type: 'text',
            placeholder: '/path/to/destination'
          }
        ]
      },
      {
        id: 'compress-directory',
        name: 'Compress Directory',
        template: 'tar -czf {archive_name}.tar.gz {directory}',
        description: 'Compress directory into tar.gz archive',
        params: [
          {
            name: 'archive_name',
            label: 'Archive Name',
            type: 'text',
            placeholder: 'backup'
          },
          {
            name: 'directory',
            label: 'Directory',
            type: 'text',
            placeholder: '/path/to/directory'
          }
        ]
      },
      {
        id: 'change-permissions',
        name: 'Change Permissions',
        template: 'chmod -R {permissions} {path}',
        description: 'Recursively change file/directory permissions',
        params: [
          {
            name: 'permissions',
            label: 'Permissions',
            type: 'select',
            default: '755',
            options: [
              { value: '755', label: '755 (rwxr-xr-x) - Owner: rwx, Group/Other: r-x' },
              { value: '644', label: '644 (rw-r--r--) - Owner: rw, Group/Other: r' },
              { value: '777', label: '777 (rwxrwxrwx) - All permissions' },
              { value: '700', label: '700 (rwx------) - Owner only' }
            ]
          },
          {
            name: 'path',
            label: 'Path',
            type: 'text',
            placeholder: '/path/to/file_or_directory'
          }
        ]
      }
    ],
    security: [
      {
        id: 'user-management',
        name: 'User Management',
        template: 'sudo useradd -m -s {shell} {username} && sudo passwd {username}',
        description: 'Create new user with home directory',
        params: [
          {
            name: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Enter username'
          },
          {
            name: 'shell',
            label: 'Shell',
            type: 'select',
            default: '/bin/bash',
            options: [
              { value: '/bin/bash', label: 'Bash' },
              { value: '/bin/zsh', label: 'Zsh' },
              { value: '/bin/sh', label: 'sh' },
              { value: '/usr/bin/fish', label: 'Fish' }
            ]
          }
        ]
      },
      {
        id: 'ssh-keygen',
        name: 'Generate SSH Key',
        template: 'ssh-keygen -t {type} -b {bits} -C "{comment}" -f {filename}',
        description: 'Generate SSH key pair',
        params: [
          {
            name: 'type',
            label: 'Key Type',
            type: 'select',
            default: 'rsa',
            options: [
              { value: 'rsa', label: 'RSA' },
              { value: 'ed25519', label: 'Ed25519' },
              { value: 'ecdsa', label: 'ECDSA' }
            ]
          },
          {
            name: 'bits',
            label: 'Key Size',
            type: 'select',
            default: '4096',
            options: [
              { value: '2048', label: '2048 bits' },
              { value: '4096', label: '4096 bits' }
            ]
          },
          {
            name: 'comment',
            label: 'Comment',
            type: 'text',
            default: 'Generated key',
            placeholder: 'Key comment'
          },
          {
            name: 'filename',
            label: 'Key File',
            type: 'text',
            default: '~/.ssh/id_rsa',
            placeholder: '~/.ssh/key_name'
          }
        ]
      },
      {
        id: 'audit-logins',
        name: 'Audit Login Attempts',
        template: 'sudo journalctl _SYSTEMD_UNIT=sshd.service | tail -50',
        description: 'Check recent SSH login attempts',
        params: []
      }
    ],
    database: [
      {
        id: 'mysql-backup',
        name: 'MySQL Database Backup',
        template: 'mysqldump -u {user} -p{password} {database} > {backup_file}.sql',
        description: 'Backup MySQL database',
        params: [
          {
            name: 'user',
            label: 'MySQL User',
            type: 'text',
            placeholder: 'mysql_user'
          },
          {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password'
          },
          {
            name: 'database',
            label: 'Database Name',
            type: 'text',
            placeholder: 'database_name'
          },
          {
            name: 'backup_file',
            label: 'Backup File',
            type: 'text',
            default: 'backup',
            placeholder: 'backup_file_name'
          }
        ]
      },
      {
        id: 'postgres-backup',
        name: 'PostgreSQL Backup',
        template: 'pg_dump -U {user} -d {database} -f {backup_file}.sql',
        description: 'Backup PostgreSQL database',
        params: [
          {
            name: 'user',
            label: 'PostgreSQL User',
            type: 'text',
            placeholder: 'postgres_user'
          },
          {
            name: 'database',
            label: 'Database Name',
            type: 'text',
            placeholder: 'database_name'
          },
          {
            name: 'backup_file',
            label: 'Backup File',
            type: 'text',
            default: 'backup',
            placeholder: 'backup_file_name'
          }
        ]
      }
    ],
    cloud: [
      {
        id: 'docker-stats',
        name: 'Docker Container Stats',
        template: 'docker stats --no-stream',
        description: 'Show real-time resource usage of Docker containers',
        params: []
      },
      {
        id: 'docker-cleanup',
        name: 'Docker Cleanup',
        template: 'docker system prune -af && docker volume prune -f',
        description: 'Clean up unused Docker resources',
        params: []
      },
      {
        id: 'kubernetes-pods',
        name: 'Kubernetes Pod Status',
        template: 'kubectl get pods -A -o wide',
        description: 'List all pods across all namespaces',
        params: []
      }
    ],
    monitoring: [
      {
        id: 'log-monitor',
        name: 'Log Monitor',
        template: 'tail -f {log_file} | grep {pattern}',
        description: 'Monitor log file for specific pattern',
        params: [
          {
            name: 'log_file',
            label: 'Log File',
            type: 'text',
            default: '/var/log/syslog',
            placeholder: 'Enter log file path'
          },
          {
            name: 'pattern',
            label: 'Search Pattern',
            type: 'text',
            placeholder: 'Enter pattern to search'
          }
        ]
      },
      {
        id: 'system-logs',
        name: 'System Logs',
        template: 'journalctl -xe --since "{timeframe}"',
        description: 'View system logs for specific timeframe',
        params: [
          {
            name: 'timeframe',
            label: 'Timeframe',
            type: 'select',
            default: '1 hour ago',
            options: [
              { value: '1 hour ago', label: 'Last hour' },
              { value: '24 hours ago', label: 'Last 24 hours' },
              { value: '7 days ago', label: 'Last 7 days' },
              { value: '30 days ago', label: 'Last 30 days' }
            ]
          }
        ]
      }
    ]
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedCommand(null);
    setCommandParams({});
    setGeneratedCommand('');
  };

  const handleCommandSelect = (command) => {
    setSelectedCommand(command);
    const initialParams = {};
    command.params.forEach(param => {
      initialParams[param.name] = param.default || '';
    });
    setCommandParams(initialParams);
    generateCommand(command, initialParams);
  };

  const handleParamChange = (paramName, value) => {
    const newParams = { ...commandParams, [paramName]: value };
    setCommandParams(newParams);
    if (selectedCommand) {
      generateCommand(selectedCommand, newParams);
    }
  };

  const generateCommand = (command, params) => {
    let generated = command.template;
    Object.entries(params).forEach(([key, value]) => {
      generated = generated.replace(new RegExp(`{${key}}`, 'g'), value || `{${key}}`);
    });
    setGeneratedCommand(generated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCommand);
  };

  const downloadCommand = () => {
    const blob = new Blob([generatedCommand], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'command.sh';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetGenerator = () => {
    setSelectedCategory('system');
    setSelectedCommand(null);
    setCommandParams({});
    setGeneratedCommand('');
  };

  const currentCategoryCommands = commands[selectedCategory] || [];

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.header}>
          <h1><IconTerminal2 size={28} /> Linux Command Generator</h1>
          <p>Generate and customize Linux commands for various administrative tasks</p>
        </div>

        <div className={styles.content}>
          <div className={styles.categories}>
            <h3>Categories</h3>
            <div className={styles.categoryGrid}>
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`${styles.categoryCard} ${selectedCategory === category.id ? styles.active : ''}`}
                  >
                    <Icon size={24} />
                    <h4>{category.name}</h4>
                    <p>{category.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.commandsSection}>
            <div className={styles.commandsList}>
              <h3>Commands</h3>
              <div className={styles.commandCards}>
                {currentCategoryCommands.map(command => (
                  <button
                    key={command.id}
                    onClick={() => handleCommandSelect(command)}
                    className={`${styles.commandCard} ${selectedCommand?.id === command.id ? styles.active : ''}`}
                  >
                    <h4>{command.name}</h4>
                    <p>{command.description}</p>
                    <code className={styles.commandPreview}>{command.template}</code>
                  </button>
                ))}
              </div>
            </div>

            {selectedCommand && (
              <div className={styles.generatorPanel}>
                <h3>Command Generator</h3>

                {selectedCommand.params.length > 0 && (
                  <div className={styles.parameters}>
                    <h4>Parameters</h4>
                    {selectedCommand.params.map(param => (
                      <div key={param.name} className={styles.parameter}>
                        <label htmlFor={param.name}>{param.label}</label>
                        {param.type === 'select' ? (
                          <select
                            id={param.name}
                            value={commandParams[param.name] || ''}
                            onChange={(e) => handleParamChange(param.name, e.target.value)}
                            className={styles.selectInput}
                          >
                            <option value="">Select...</option>
                            {param.options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : param.type === 'number' ? (
                          <input
                            id={param.name}
                            type="number"
                            value={commandParams[param.name] || ''}
                            onChange={(e) => handleParamChange(param.name, e.target.value)}
                            placeholder={param.placeholder}
                            className={styles.numberInput}
                          />
                        ) : param.type === 'password' ? (
                          <input
                            id={param.name}
                            type="password"
                            value={commandParams[param.name] || ''}
                            onChange={(e) => handleParamChange(param.name, e.target.value)}
                            placeholder={param.placeholder}
                            className={styles.passwordInput}
                          />
                        ) : (
                          <input
                            id={param.name}
                            type="text"
                            value={commandParams[param.name] || ''}
                            onChange={(e) => handleParamChange(param.name, e.target.value)}
                            placeholder={param.placeholder}
                            className={styles.textInput}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.generatedCommand}>
                  <h4>Generated Command</h4>
                  <div className={styles.commandOutput}>
                    <pre><code>{generatedCommand}</code></pre>
                    <div className={styles.commandActions}>
                      <button onClick={copyToClipboard} className={styles.actionButton}>
                        <IconCopy size={16} /> Copy
                      </button>
                      <button onClick={downloadCommand} className={styles.actionButton}>
                        <IconDownload size={16} /> Download
                      </button>
                      <button onClick={resetGenerator} className={styles.actionButton}>
                        <IconRefresh size={16} /> Reset
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.commandInfo}>
                  <h4>Command Information</h4>
                  <p>{selectedCommand.description}</p>
                  <div className={styles.warningNote}>
                    <strong>Note:</strong> Always review commands before execution, especially those with elevated privileges (sudo). Test in a safe environment first.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h4>🔧 Categories</h4>
              <p>Organized command categories for easy navigation</p>
            </div>
            <div className={styles.feature}>
              <h4>⚙️ Customizable</h4>
              <p>Parameters that can be customized for your specific needs</p>
            </div>
            <div className={styles.feature}>
              <h4>📋 Export Options</h4>
              <p>Copy to clipboard or download as shell script</p>
            </div>
            <div className={styles.feature}>
              <h4>🛡️ Safe Usage</h4>
              <p>Best practices and warnings for command execution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}