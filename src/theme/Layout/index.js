import React from 'react';
import Layout from '@theme-original/Layout';
import NavbarSearchEnhancer from '../../components/NavbarSearchEnhancer';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <NavbarSearchEnhancer />
    </>
  );
}