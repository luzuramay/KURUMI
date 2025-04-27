import React, { useState, useEffect } from 'react';
import GuessGrid from '../components/GuessGrid';
import Keyboard from '../components/Keyboard';
import { TUPI_WORDS } from '../utils/words';
import { evaluateGuess, LetterStatus } from '../utils/wordle';

const Game: React.FC = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<LetterStatus[][]>([]);
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [keyStatuses, setKeyStatuses] = useState<Record<string, LetterStatus>>({});

  useEffect(() => {
    const word = TUPI_WORDS[Math.floor(Math.random() * TUPI_WORDS.length)];
    setSolution(word);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-ZÇ]$/.test(key)) {
        e.preventDefault();
        handleKey(
          key === 'BACKSPACE' ? 'DEL' :
          key === 'Ç'         ? 'Ç'   :
          key === 'ENTER'     ? 'ENTER' : key
        );
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentGuess, gameOver, keyStatuses, guesses, statuses, turn]);

  const handleKey = (key: string) => {
    if (gameOver) return;
    if (key === 'ENTER') {
      if (currentGuess.length !== 5) return;
      const evals = evaluateGuess(currentGuess, solution);
      setGuesses([...guesses, currentGuess]);
      setStatuses([...statuses, evals]);
      setTurn(turn + 1);

      const newKeyStatuses = { ...keyStatuses };
      currentGuess.split('').forEach((char, i) => {
        const prev = newKeyStatuses[char];
        const curr = evals[i];
        if (prev === 'correct') return;
        if (prev === 'present' && curr === 'absent') return;
        newKeyStatuses[char] = curr;
      });
      setKeyStatuses(newKeyStatuses);

      if (currentGuess === solution) {
        setGameOver(true);
        setMessage('Você acertou!');
        setTimeout(() => window.location.reload(), 2000);
      } else if (turn + 1 >= 6) {
        setGameOver(true);
        setMessage(`A palavra era ${solution}`);
        setTimeout(() => window.location.reload(), 2000);
      }
      setCurrentGuess('');
    } else if (key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-ZÇ]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 p-4">
      
      <div
        className="p-4 rounded-xl mb-6"
        style={{ backgroundColor: 'hsla(219, 49.20%, 11.60%, 0.32)' }}
      >
        <GuessGrid guesses={[...guesses, currentGuess]} statuses={statuses} />
      </div>

      <div className="opacity-80">
        <Keyboard onKey={handleKey} keyStatuses={keyStatuses} />
      </div>

      {message && (
        <div className="absolute bottom-32 px-6 py-3 text-center text-xl font-semibold bg-green-600/90 text-white rounded-2xl shadow-lg transition-all z-50">
          {message}
        </div>
      )}
    </div>
  );
};

export default Game;
