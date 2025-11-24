import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function GoogleAdsense() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // 只在生产环境中加载广告
    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1920044696501149';
      script.crossOrigin = 'anonymous';
      script.async = true;

      // 添加错误处理
      script.onerror = () => {
        console.warn('Google AdSense script failed to load');
      };

      document.head.appendChild(script);
    }
  }, []);

  // 不渲染任何可见内容
  return null;
}