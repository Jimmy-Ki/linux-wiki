import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import NavbarSearch from './NavbarSearch';

export default function NavbarSearchEnhancer() {
  useEffect(() => {
    // 等待页面加载完成
    const addSearchToNavbar = () => {
      // 查找navbar右侧容器
      const navbarRight = document.querySelector('.navbar__items--right');
      if (navbarRight) {
        // 检查是否已经有搜索组件
        if (navbarRight.querySelector('.navbar-search-inline')) {
          return; // 已经存在，不需要重复添加
        }

        // 创建搜索组件容器
        const searchContainer = document.createElement('div');
        searchContainer.className = 'navbar-search-inline';

        // 将搜索组件添加到Credits按钮之前
        const creditsLink = Array.from(navbarRight.querySelectorAll('a.navbar__link')).find(
          link => link.textContent.includes('Credits')
        );

        if (creditsLink) {
          navbarRight.insertBefore(searchContainer, creditsLink);
        } else {
          // 如果找不到Credits链接，添加到最前面
          navbarRight.insertBefore(searchContainer, navbarRight.firstChild);
        }

        // 渲染搜索组件
        const root = ReactDOM.createRoot(searchContainer);
        root.render(<NavbarSearch />);
      }
    };

    // 多次尝试以确保DOM加载完成
    const timer = setTimeout(addSearchToNavbar, 100);
    const timer2 = setTimeout(addSearchToNavbar, 500);
    const timer3 = setTimeout(addSearchToNavbar, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return null; // 这个组件不渲染任何内容，它只是修改DOM
}