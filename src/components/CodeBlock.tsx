import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python' }) => {
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightAll();
    }
  }, [code]);

  return (
    <div className="mt-4 mb-6">
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex items-center">
          <span className="text-gray-400 text-xs font-medium">{language}</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;