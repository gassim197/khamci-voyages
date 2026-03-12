import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface CityComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  cities: string[];
  error?: string;
  name?: string;
}

/**
 * CityCombobox - Champ combiné saisie libre + suggestions
 * Permet de taper n'importe quelle ville OU de choisir dans la liste prédéfinie
 */
export default function CityCombobox({
  value,
  onChange,
  placeholder = 'Tapez ou choisissez une ville',
  cities,
  error,
  name,
}: CityComboboxProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync inputValue when value prop changes externally
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim().length === 0) {
      setFiltered(cities.slice(0, 8));
    } else {
      const q = inputValue.toLowerCase();
      setFiltered(
        cities
          .filter(c => c.toLowerCase().includes(q))
          .slice(0, 8)
      );
    }
  }, [inputValue, cities]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // Commit the typed value on blur
        onChange(inputValue.trim());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [inputValue, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);
    setIsOpen(true);
  };

  const handleSelect = (city: string) => {
    setInputValue(city);
    onChange(city);
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    inputRef.current?.focus();
    setIsOpen(true);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && filtered.length > 0 && isOpen) {
      // Select first suggestion on Enter if dropdown is open
      e.preventDefault();
      handleSelect(filtered[0]);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full px-4 py-2 pr-16 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded"
              tabIndex={-1}
            >
              <X size={14} />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsOpen(prev => !prev);
              inputRef.current?.focus();
            }}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded"
            tabIndex={-1}
          >
            <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Dropdown suggestions */}
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-52 overflow-y-auto">
          {filtered.map(city => (
            <li
              key={city}
              onMouseDown={(e) => {
                e.preventDefault(); // prevent blur before click
                handleSelect(city);
              }}
              className={`px-4 py-2 cursor-pointer text-sm hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-300 transition-colors ${
                city === inputValue ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 font-medium' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {city}
            </li>
          ))}
          {/* Show "use typed value" hint if typed value doesn't match any city */}
          {inputValue.trim() && !cities.some(c => c.toLowerCase() === inputValue.toLowerCase()) && (
            <li
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(inputValue.trim());
              }}
              className="px-4 py-2 cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-t border-gray-100 dark:border-gray-700 italic"
            >
              Utiliser "{inputValue.trim()}"
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
