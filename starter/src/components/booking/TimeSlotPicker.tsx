interface TimeSlotPickerProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const availableSlots = ["09:00", "10:30", "13:00", "14:30", "16:00"];

export function TimeSlotPicker({ selectedTime, onSelectTime }: TimeSlotPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Velg tidspunkt
      </label>
      <div className="grid grid-cols-3 gap-3">
        {availableSlots.map((time) => (
          <button
            type="button"
            key={time}
            onClick={() => onSelectTime(time)}
            className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
              selectedTime === time
                ? "bg-purple-700 text-white border-purple-700 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:border-purple-300"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}