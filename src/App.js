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
    link.download = `preview-${generateRandomName(10)}.png`;
    link.click();
  } catch (err) {
    console.error('Failed to download the image:', err);
  }
};

function generateRandomName(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const gradients = [
  {
    name: 'Blue-Purple-Pink',
    class: 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500',
    textColor: 'text-white',
  },
  {
    name: 'Purple-Pink-Orange',
    class: 'bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500',
    textColor: 'text-white',
  },
  {
    name: 'Teal-Purple-Orange',
    class: 'bg-gradient-to-br from-teal-400 via-purple-500 to-orange-500',
    textColor: 'text-white',
  },
  {
    name: 'Green-Blue-Purple',
    class: 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-500',
    textColor: 'text-white',
  },
  {
    name: 'Pink-Orange-Yellow',
    class: 'bg-gradient-to-br from-pink-400 via-orange-500 to-yellow-500',
    textColor: 'text-white',
  },
  {
    name: 'Yellow-Green-Blue',
    class: 'bg-gradient-to-br from-yellow-400 via-green-500 to-blue-500',
    textColor: 'text-black',
  },
];




function App() {
  let [content, setContent] = useState('');
  const [alignment, setAlignment] = useState('text-left');
  const [previewWidth, setPreviewWidth] = useState('w-full');
  const [gradient, setGradient] = useState("bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500");

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
        <h2 className="text-xl font-bold">Write Your Markdown</h2>
        <div className="flex items-center justify-between mb-2">
          <select class="mx-1 px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300" onChange={(e) => setGradient(e.target.value)}>
            <option value="bg-gradient-to-r from-green-400 via-blue-500 to-blue-500">Green to Blue</option>
            <option value="bg-gradient-to-tl from-red-400 via-yellow-500 to-yellow-500">Red to Yellow</option>
            <option value="bg-gradient-to-tr from-indigo-400 via-teal-500 to-teal-500">Indigo to Teal</option>
            <option value="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">Pink to Yellow</option>
            <option value="bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500">Purple to Red</option>
            <option value="bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500">Sunrise Splash</option>
            <option value="bg-gradient-to-r from-blue-700 via-teal-500 to-cyan-500">Ocean Depths</option>
            <option value="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600">Twilight Magic</option>
            <option value="bg-gradient-to-r from-green-500 via-lime-500 to-cyan-400">Tropical Paradise</option>
            <option value="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">Cotton Candy Dream</option>
            <option value="bg-gradient-to-r from-green-400 via-blue-600 to-purple-700">Aurora Whispers</option>
            <option value="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600">Sunset Serenade</option>
            <option value="bg-gradient-to-t from-pink-600 via-purple-700 to-indigo-800">Starry Night</option>
            <option value="bg-gradient-to-br from-yellow-300 via-orange-400 to-red-600">Citrus Burst</option>
            <option value="bg-gradient-to-bl from-lime-400 via-emerald-500 to-teal-600">Forest Canopy</option>
            <option value="bg-gradient-to-tl from-indigo-400 via-purple-500 to-pink-700">Mystic Twilight</option>
            <option value="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">Tranquil Waters</option>
            <option value="bg-gradient-to-b from-fuchsia-500 via-purple-700 to-blue-900">Galactic Voyage</option>
            <option value="bg-gradient-to-tr from-green-500 via-yellow-500 to-red-600">Autumn Breeze</option>
            <option value="bg-gradient-to-t from-rose-500 via-pink-500 to-indigo-700">Lavender Fields</option>
            <option value="bg-gradient-to-l from-yellow-400 via-lime-500 to-emerald-600">Meadow Sunrise</option>
            <option value="bg-gradient-to-br from-purple-400 via-blue-500 to-teal-500">Cerulean Dream</option>
            <option value="bg-gradient-to-bl from-red-500 via-amber-400 to-orange-600">Desert Glow</option>
            <option value="bg-gradient-to-tl from-violet-600 via-indigo-700 to-blue-800">Nebula Gaze</option>


          </select>
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
        <div id="markdownOutputContainer" className='flex bg-gray-100 items-center p-5'>
        <div className={`p-4 shadow-lg rounded-lg ${gradient} ${previewWidth}`} >
          <div
            className={`${alignment} text-white prose dark:prose`} dangerouslySetInnerHTML={{__html: renderContent(content)}}
          ></div>
        </div>
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
