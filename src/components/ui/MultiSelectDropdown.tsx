import { useState } from 'react';
import { X } from 'lucide-react';
import { Label } from '../ui/label';

interface MultiSelectDropdownProps {
  label: string;
  options: { id: number; name: string }[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  placeholder?: string;
}

export function MultiSelectDropdown({
  label,
  options,
  selectedIds,
  onChange,
  placeholder = 'Select...',
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(i => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const filteredOptions = options.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative space-y-1">
      <Label>{label}</Label>
      <div
        className="border rounded-xl p-2 min-h-[44px] flex flex-wrap items-center gap-2 cursor-pointer"
        onClick={() => setOpen(prev => !prev)}
      >
        {selectedIds.map(id => {
          const option = options.find(o => o.id === id);
          if (!option) return null;
          return (
            <span
              key={id}
              className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 flex items-center gap-1"
            >
              {option.name}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(id);
                }}
              />
            </span>
          );
        })}
        <span className={`text-gray-400 ${selectedIds.length > 0 ? 'hidden' : ''}`}>
          {placeholder}
        </span>
      </div>

      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-2 outline-none"
              autoFocus
            />
          </div>

          {filteredOptions.length > 0 ? (
            filteredOptions.map(o => (
              <div
                key={o.id}
                className={`px-3 py-2 cursor-pointer flex justify-between items-center hover:bg-blue-50 ${
                  selectedIds.includes(o.id) ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleSelect(o.id)}
              >
                {o.name}
                {selectedIds.includes(o.id) && <span>✓</span>}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500 text-sm">No options found</div>
          )}
        </div>
      )}
    </div>
  );
}
