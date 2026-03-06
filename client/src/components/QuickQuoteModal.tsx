import { X } from "lucide-react";
import ServiceQuoteForm from "./ServiceQuoteForm";

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export default function QuickQuoteModal({
  isOpen,
  onClose,
  source = "general",
}: QuickQuoteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold gradient-text">Demander un Devis</h2>
            <p className="text-sm text-gray-600">Choisissez le service qui vous intéresse</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <ServiceQuoteForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
