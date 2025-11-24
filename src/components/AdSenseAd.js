import React from 'react';
import './AdSenseAd.css';

export default function AdSenseAd({
  slot,
  format = 'auto',
  responsive = 'true',
  style = {},
  className = '',
  ...props
}) {
  // 只在生产环境中显示广告
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className="ad-placeholder" style={{...style}} {...props}>
        <p style={{
          fontSize: '12px',
          color: '#999',
          textAlign: 'center',
          padding: '20px',
          border: '1px dashed #ddd',
          borderRadius: '4px'
        }}>
          Ad Placeholder (Slot: {slot})
        </p>
      </div>
    );
  }

  return (
    <div
      className={`adsense-ad-container ${className}`}
      style={{
        ...style,
      }}
      {...props}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1920044696501149"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}