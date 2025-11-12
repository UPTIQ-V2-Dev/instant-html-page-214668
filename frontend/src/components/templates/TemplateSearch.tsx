import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TemplateSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TemplateSearch = ({ 
  value, 
  onChange, 
  placeholder = "Search templates..." 
}: TemplateSearchProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localValue, onChange]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-9 pr-10"
      />
      {localValue && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};