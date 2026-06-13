import React, { useState, useEffect, useRef } from 'react';

interface PythonInterpreterProps {
  initialCode?: string;
  code?: string;
  onCodeChange?: (code: string) => void;
}

const PythonInterpreter: React.FC<PythonInterpreterProps> = ({ 
  initialCode = 'print("Hello, World!")',
  code: externalCode,
  onCodeChange
}) => {
  const [internalCode, setInternalCode] = useState(initialCode);
  const code = externalCode !== undefined ? externalCode : internalCode;
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    if (onCodeChange) {
      onCodeChange(newCode);
    } else {
      setInternalCode(newCode);
    }
  };

  useEffect(() => {
    const loadPyodide = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 检查全局loadPyodide是否存在
        if (typeof (window as any).loadPyodide === 'function') {
          // @ts-ignore
          const pyodideInstance = await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
          });
          setPyodide(pyodideInstance);
          setIsLoading(false);
          
          // 预加载常用数据分析库
          setIsLoadingPackages(true);
          try {
            await pyodideInstance.loadPackage(['numpy', 'pandas']);
          } catch (pkgError) {
            console.warn('Failed to load some packages:', pkgError);
            // 继续，即使包加载失败
          }
          setIsLoadingPackages(false);
        } else {
          throw new Error('Pyodide library not loaded');
        }
      } catch (error: any) {
        console.error('Failed to load Pyodide:', error);
        setError(`Failed to load Python interpreter: ${error.message}`);
        setIsLoading(false);
        setIsLoadingPackages(false);
      }
    };

    // 延迟加载，确保页面其他内容已加载
    const timer = setTimeout(loadPyodide, 1000);
    return () => clearTimeout(timer);
  }, []);

  const runCode = async () => {
    if (!pyodide) return;

    setOutput('');
    try {
      // 重置输出捕获
      let outputBuffer = '';
      
      // 使用更简单的输出捕获方式
      pyodide.globals.set('console', {
        log: (text: string) => {
          outputBuffer += text + '\n';
        }
      });
      
      // 重定向print函数，避免无限递归
      pyodide.runPython(`
import builtins
original_print = builtins.print
def custom_print(*args, **kwargs):
    console.log(' '.join(map(str, args)))
builtins.print = custom_print
`);
      
      // 执行用户代码
      await pyodide.runPythonAsync(code);
      
      // 更新输出
      setOutput(outputBuffer);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Python 解释器</h3>
        <div className="flex space-x-2">
          <button
            onClick={clearOutput}
            className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            清除
          </button>
          <button
            onClick={runCode}
            disabled={isLoading || isLoadingPackages || !pyodide}
            className="text-xs px-2 py-1 bg-black text-white hover:bg-gray-800 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '加载中...' : isLoadingPackages ? '加载库中...' : '运行'}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
            className="w-full h-48 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm bg-white text-black"
            placeholder="输入Python代码..."
          />
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded p-3 font-mono text-sm h-32 overflow-auto text-gray-900">
          {error ? (
            <div className="text-red-600">{error}</div>
          ) : isLoading ? (
            <div className="text-gray-600">正在加载Python解释器，请稍候...</div>
          ) : isLoadingPackages ? (
            <div className="text-gray-600">正在加载数据分析库(numpy, pandas)，请稍候...</div>
          ) : (
            output || '运行结果将显示在这里...'
          )}
        </div>
        {error && (
          <div className="mt-3 text-sm text-gray-600">
            <p>提示：Python解释器需要从CDN加载，可能需要网络连接。如果持续失败，请检查网络连接或稍后再试。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PythonInterpreter;