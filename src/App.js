import { marked } from 'marked';
import './App.css';
import { useState } from 'react';
import "highlight.js/styles/atom-one-dark.css";
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon, DownloadIcon, VariableIcon, ViewListIcon, ChevronUpIcon, ChevronDownIcon, ArrowsExpandIcon } from '@heroicons/react/outline';

import { toPng } from 'html-to-image';

const downloadImage = async () => {
  const markdownOutput = document.getElementById('markdownOutputContainer');

  try {
    const dataUrl = await toPng(markdownOutput);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'preview.png';
    link.click();
  } catch (err) {
    console.error('Failed to download the image:', err);
  }
};


function App() {
  let [content, setContent] = useState('');
  const [alignment, setAlignment] = useState('text-left');
  const [previewWidth, setPreviewWidth] = useState('w-full');

  const setCompactWidth = () => {
    setPreviewWidth('w-auto inline-block');
  };
  
  const setFullWidth = () => {
    setPreviewWidth('w-full');
  };
  
  

  const hljs = require('highlight.js');

  const renderer = new marked.Renderer();

  renderer.code = (code, language) => {
    const escapedCode = escapeCode(code);
    const languageClass = language ? ` class="hljs language-${language}"` : '';
  
    return `<pre><code${languageClass}>${escapedCode}</code></pre>`;
  };
  
  renderer.codespan = (code) => {
    const escapedCode = escapeCode(code);
    return `<code class="hljs">${escapedCode}</code>`;
  };

  marked.setOptions({
    renderer: renderer,
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  });

  return (
    <div className="App">
     <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Write Your Markdown</h2>
          <div className="text-sm">
            <button className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 mr-1" onClick={() => setAlignment('text-left')}>
              <ArrowNarrowLeftIcon className="w-4 h-4" />
            </button>
            <button className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 mr-1" onClick={() => setAlignment('text-center')}>
              <ViewListIcon className="w-4 h-4" />
            </button>
            <button className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 mr-1" onClick={() => setAlignment('text-right')}>
              <ArrowNarrowRightIcon className="w-4 h-4" />
            </button>
            <button className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300" onClick={() => setAlignment('text-justify')}>
              <ChevronUpIcon className="w-4 h-4" />
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            <button className="mx-1 px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 mr-1" onClick={setCompactWidth}>
              <VariableIcon className="w-4 h-4" />
            </button>
            <button className="mx-1 px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300" onClick={setFullWidth}>
              <ArrowsExpandIcon className="w-4 h-4" />
            </button>
          </div>

        </div>
        <textarea id="markdownInput" className="w-full h-56 p-2 bg-gray-100 rounded-lg resize-none" placeholder="Type your Markdown text here..." onKeyUp={(e) => setContent(e.target.value)}></textarea>
      </div>

      <div className={`bg-white p-6 rounded-lg shadow-md mx-auto ${previewWidth}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4 text-black">Preview</h2>
          <button className="mx-1 px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-150" onClick={downloadImage}>
            <DownloadIcon className="w-4 h-4" />
          </button>
        </div>
        <div id="markdownOutputContainer" className={`text-white bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 rounded-lg ${previewWidth}`}>
          <div
            className={`${alignment} text-white prose dark:prose`} dangerouslySetInnerHTML={{__html: renderContent(content)}}
          ></div>
        </div>
      </div>





      </div>
    </div>
    </div>
  );
}

function escapeCode(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };

  const replacer = (match) => map[match];
  return str.replace(/[&<>]/g, replacer);
}



function renderContent(content = '') {
  return marked.parse(content);
}

export default App;
