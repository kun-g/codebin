'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import CategorySection from '../components/CategorySection';
import { resources } from '../data/resources';
import '../styles/globals.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  // 搜索过滤函数
  const filteredResources = resources.map(category => {
    const filteredItems = category.items.filter(item => {
      const searchString = `${item.name} ${item.description}`.toLowerCase();
      return searchString.includes(searchQuery.toLowerCase());
    });
    
    return {
      ...category,
      items: filteredItems
    };
  }).filter(category => category.items.length > 0);

  return (
    <div className="container">
      <Head>
        <title>开发者资源导航 | 一站式开发工具与资源集合</title>
        <meta name="description" content="为开发者提供的一站式导航平台，包含需求挖掘、域名工具、代码托管、数据分析、开发模板等实用资源。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar query={searchQuery} setQuery={setSearchQuery} />

      <main className="main">
        <div className="hero">
          <h1>开发者一站式资源导航</h1>
          <p>从需求发现到项目上线，这里集合了开发者所需的各类实用工具和资源</p>
        </div>

        {filteredResources.length > 0 ? (
          filteredResources.map((category, index) => (
            <CategorySection 
              key={index} 
              category={category.category} 
              items={category.items} 
            />
          ))
        ) : (
          <div className="no-results">
            <h2>未找到匹配"{searchQuery}"的资源</h2>
            <p>尝试使用其他关键词搜索，或浏览上方分类导航</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} 开发者资源导航 - 为开发者提供便捷工具集合</p>
      </footer>
    </div>
  );
} 