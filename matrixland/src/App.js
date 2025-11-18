import React, { useState } from 'react';
import { Trophy, Star, BookOpen, Home, Award, Zap, CheckCircle, XCircle, HelpCircle, RefreshCw } from 'lucide-react';

const MatrixLand = () => {
  const [screen, setScreen] = useState('home');
  const [level, setLevel] = useState('basico');
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hints, setHints] = useState(3);
  const [failCount, setFailCount] = useState(0);

  // Generar matriz aleatoria
  const generateMatrix = (rows, cols, max = 10) => {
    return Array(rows).fill(0).map(() => 
      Array(cols).fill(0).map(() => Math.floor(Math.random() * max) + 1)
    );
  };

  // Operaciones de matrices
  const addMatrices = (a, b) => {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const subtractMatrices = (a, b) => {
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  const multiplyMatrices = (a, b) => {
    const result = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  };

  const transpose = (matrix) => {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  };

  const determinant2x2 = (matrix) => {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  };

  const determinant3x3 = (matrix) => {
    return (
      matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
      matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
      matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
    );
  };

  // Generar desafío
  const generateChallenge = () => {
    let challenge = {};
    
    if (level === 'basico') {
      const operations = ['suma', 'resta', 'transpuesta'];
      const op = operations[Math.floor(Math.random() * operations.length)];
      
      if (op === 'suma' || op === 'resta') {
        const matrixA = generateMatrix(2, 2, 5);
        const matrixB = generateMatrix(2, 2, 5);
        const result = op === 'suma' ? addMatrices(matrixA, matrixB) : subtractMatrices(matrixA, matrixB);
        
        challenge = {
          type: op,
          matrices: [matrixA, matrixB],
          answer: result,
          question: `¿Cuál es el resultado de la ${op} de estas matrices?`,
          hint: `Recuerda: en la ${op}, ${op === 'suma' ? 'sumas' : 'restas'} elemento por elemento.`
        };
      } else {
        const matrixA = generateMatrix(2, 2, 8);
        const result = transpose(matrixA);
        challenge = {
          type: 'transpuesta',
          matrices: [matrixA],
          answer: result,
          question: '¿Cuál es la transpuesta de esta matriz?',
          hint: 'La transpuesta intercambia filas por columnas.'
        };
      }
    } else if (level === 'intermedio') {
      const operations = ['multiplicacion', 'determinante2x2'];
      const op = operations[Math.floor(Math.random() * operations.length)];
      
      if (op === 'multiplicacion') {
        const matrixA = generateMatrix(2, 2, 5);
        const matrixB = generateMatrix(2, 2, 5);
        const result = multiplyMatrices(matrixA, matrixB);
        
        challenge = {
          type: 'multiplicacion',
          matrices: [matrixA, matrixB],
          answer: result,
          question: '¿Cuál es el producto de estas matrices?',
          hint: 'Multiplica fila por columna: suma los productos de elementos correspondientes.'
        };
      } else {
        const matrixA = generateMatrix(2, 2, 8);
        const result = determinant2x2(matrixA);
        
        challenge = {
          type: 'determinante2x2',
          matrices: [matrixA],
          answer: result,
          question: '¿Cuál es el determinante de esta matriz 2x2?',
          hint: 'Det = (a×d) - (b×c) para matriz [[a,b],[c,d]]'
        };
      }
    } else {
      const matrixA = generateMatrix(3, 3, 5);
      const result = determinant3x3(matrixA);
      
      challenge = {
        type: 'determinante3x3',
        matrices: [matrixA],
        answer: result,
        question: '¿Cuál es el determinante de esta matriz 3x3?',
        hint: 'Usa la regla de Sarrus o expansión por cofactores.'
      };
    }
    
    setCurrentChallenge(challenge);
    setUserAnswer('');
    setFeedback(null);
  };

  // Verificar respuesta
  const checkAnswer = () => {
    if (!userAnswer) return;
    
    const challenge = currentChallenge;
    let isCorrect = false;
    
    if (Array.isArray(challenge.answer)) {
      try {
        const userMatrix = JSON.parse(userAnswer);
        isCorrect = JSON.stringify(userMatrix) === JSON.stringify(challenge.answer);
      } catch (e) {
        isCorrect = false;
      }
    } else {
      isCorrect = parseFloat(userAnswer) === challenge.answer;
    }
    
    if (isCorrect) {
      const points = level === 'basico' ? 10 : level === 'intermedio' ? 20 : 30;
      setScore(score + points);
      setFeedback({
        type: 'success',
        message: `¡Excelente! +${points} puntos 🎉`,
        explanation: 'Tu respuesta es correcta.'
      });
      setFailCount(0);
      
      // Logros
      if (score + points >= 100 && !achievements.includes('centurion')) {
        setAchievements([...achievements, 'centurion']);
      }
    } else {
      setFailCount(failCount + 1);
      setFeedback({
        type: 'error',
        message: '¡Incorrecto! Intenta de nuevo 💪',
        explanation: `Respuesta correcta: ${Array.isArray(challenge.answer) ? JSON.stringify(challenge.answer) : challenge.answer}`
      });
    }
  };

  const showHint = () => {
    if (hints > 0) {
      setHints(hints - 1);
      alert(currentChallenge.hint);
    }
  };

  // Componente Matriz
  const MatrixDisplay = ({ matrix, label }) => (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold text-cyan-300 mb-2">{label}</div>
      <div className="bg-gray-800 p-3 rounded-lg border-2 border-cyan-500">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-2 mb-2 last:mb-0">
            {row.map((val, j) => (
              <div key={j} className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // Pantalla Principal
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-gray-900 bg-opacity-90 rounded-3xl shadow-2xl p-8 border-4 border-cyan-400">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-4">
              MATRIXLAND
            </h1>
            <p className="text-xl text-cyan-300">¡Domina las matrices jugando! 🎮</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-6 rounded-xl text-center transform hover:scale-105 transition">
              <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="text-3xl font-bold text-white mb-2">{score}</div>
              <div className="text-sm text-gray-200">Puntos</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl text-center transform hover:scale-105 transition">
              <Award className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="text-3xl font-bold text-white mb-2">{achievements.length}</div>
              <div className="text-sm text-gray-200">Logros</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-600 to-red-600 p-6 rounded-xl text-center transform hover:scale-105 transition">
              <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="text-3xl font-bold text-white mb-2">{hints}</div>
              <div className="text-sm text-gray-200">Pistas</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => { setLevel('basico'); setScreen('game'); generateChallenge(); }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition flex items-center justify-center gap-3"
            >
              <Star className="w-6 h-6" />
              Nivel Básico
            </button>
            
            <button
              onClick={() => { setLevel('intermedio'); setScreen('game'); generateChallenge(); }}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-700 transition flex items-center justify-center gap-3"
            >
              <Star className="w-6 h-6" />
              Nivel Intermedio
            </button>
            
            <button
              onClick={() => { setLevel('avanzado'); setScreen('game'); generateChallenge(); }}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-pink-700 transition flex items-center justify-center gap-3"
            >
              <Star className="w-6 h-6" />
              Nivel Avanzado
            </button>
            
            <button
              onClick={() => setScreen('tutorial')}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition flex items-center justify-center gap-3"
            >
              <BookOpen className="w-6 h-6" />
              Tutorial
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de Juego
  if (screen === 'game' && currentChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900 bg-opacity-90 rounded-3xl shadow-2xl p-6 border-4 border-cyan-400">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setScreen('home')}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Inicio
              </button>
              
              <div className="flex gap-4">
                <div className="bg-cyan-600 px-4 py-2 rounded-lg text-white font-bold">
                  Puntos: {score}
                </div>
                <div className="bg-purple-600 px-4 py-2 rounded-lg text-white font-bold">
                  Pistas: {hints}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-xl mb-6">
              <h2 className="text-2xl font-bold text-white text-center">
                {currentChallenge.question}
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mb-6">
              {currentChallenge.matrices.map((matrix, i) => (
                <MatrixDisplay
                  key={i}
                  matrix={matrix}
                  label={currentChallenge.matrices.length > 1 ? `Matriz ${String.fromCharCode(65 + i)}` : 'Matriz'}
                />
              ))}
            </div>
            
            {feedback && (
              <div className={`p-4 rounded-xl mb-4 ${feedback.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                <div className="flex items-center gap-3 text-white">
                  {feedback.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  <div>
                    <div className="font-bold">{feedback.message}</div>
                    <div className="text-sm">{feedback.explanation}</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  Tu respuesta:
                  {Array.isArray(currentChallenge.answer) && 
                    <span className="text-sm text-gray-400 ml-2">(Formato: [[a,b],[c,d]])</span>
                  }
                </label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border-2 border-cyan-500 focus:border-pink-500 outline-none"
                  placeholder={Array.isArray(currentChallenge.answer) ? '[[1,2],[3,4]]' : 'Escribe el número'}
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={checkAnswer}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition"
                >
                  Verificar Respuesta
                </button>
                
                <button
                  onClick={showHint}
                  disabled={hints === 0}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-700 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <HelpCircle className="w-5 h-5" />
                  Pista
                </button>
                
                <button
                  onClick={generateChallenge}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-700 transition flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Nuevo
                </button>
              </div>
            </div>
            
            {failCount >= 2 && (
              <div className="mt-4 bg-yellow-600 p-3 rounded-lg text-white text-center">
                💡 ¿Necesitas ayuda? Usa una pista o revisa el tutorial
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Pantalla Tutorial
  if (screen === 'tutorial') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-90 rounded-3xl shadow-2xl p-8 border-4 border-cyan-400">
          <button
            onClick={() => setScreen('home')}
            className="mb-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Volver
          </button>
          
          <h1 className="text-4xl font-bold text-cyan-400 mb-6">📚 Tutorial de MATRIXLAND</h1>
          
          <div className="space-y-6 text-white">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-cyan-300 mb-3">🎯 Objetivo</h2>
              <p className="text-gray-300">Resuelve operaciones con matrices para ganar puntos y desbloquear logros.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-green-400 mb-3">➕ Suma y Resta</h2>
              <p className="text-gray-300 mb-2">Se suman o restan elemento por elemento:</p>
              <code className="text-cyan-300">[[1,2],[3,4]] + [[5,6],[7,8]] = [[6,8],[10,12]]</code>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-yellow-400 mb-3">✖️ Multiplicación</h2>
              <p className="text-gray-300">Multiplica fila por columna y suma los resultados.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-purple-400 mb-3">🔄 Transpuesta</h2>
              <p className="text-gray-300">Intercambia filas por columnas.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-pink-400 mb-3">📊 Determinante</h2>
              <p className="text-gray-300 mb-2">Para 2x2: Det = (a×d) - (b×c)</p>
              <p className="text-gray-300">Para 3x3: Usa la regla de Sarrus.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MatrixLand;