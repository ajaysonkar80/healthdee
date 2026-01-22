interface Option {
  label: string;
  value: string;
}

interface Props {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}

export function RadioGroup({ value, onChange, options }: Props) {
  return (
    <div className="flex gap-3">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium ${
            value === opt.value
              ? "border-pink-400 bg-pink-50 text-pink-600"
              : "border-gray-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
