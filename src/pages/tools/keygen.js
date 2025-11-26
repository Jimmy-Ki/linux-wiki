import React from 'react';
import Layout from '@theme/Layout';
import CryptoToolkit from '@site/src/components/CryptoToolkit';

export default function KeygenPage() {
  return (
    <Layout
      title="加密货币工具箱 - 靓号生成器、助记词、密钥生成器、区块链浏览器"
      description="专业的加密货币工具套件，包含靓号生成器、助记词生成器、私钥公钥生成器和区块链浏览器。所有计算本地完成，安全可靠。"
    >
      <CryptoToolkit />
    </Layout>
  );
}