import React from 'react';
import ToolPage from '../../components/ToolPage';

export default function NetworkToolsPage() {
  return (
    <ToolPage
      title="Network Tools"
      description="Ping, port scanner, DNS lookup and network diagnostics"
      comingSoon={true}
    />
  );
}