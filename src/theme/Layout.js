import React from 'react';
import Layout from '@theme-original/Layout';
import GoogleAdsense from './GoogleAdsense';

export default function LayoutWrapper(props) {
  return (
    <>
      <GoogleAdsense />
      <Layout {...props} />
    </>
  );
}