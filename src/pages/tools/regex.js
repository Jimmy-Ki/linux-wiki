import React from 'react';
import Layout from '@theme/Layout';
import RegexTester from '@site/src/components/RegexTester';

export default function RegexTesterPage() {
  return (
    <Layout
      title="Regex Tester - Test Regular Expressions Online"
      description="Free online regex tester tool. Test, debug, and validate regular expressions with real-time matching, highlighting, and detailed match information."
    >
      <RegexTester />
    </Layout>
  );
}