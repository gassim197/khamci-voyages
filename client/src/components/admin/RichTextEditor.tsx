import { useEffect } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Undo,
  Redo,
} from "lucide-react";

type RichTextEditorProps = {
  /** HTML actuel du contenu */
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  /** hauteur min en px (défaut 400) */
  minHeight?: number;
};

// ─── Bouton de la toolbar ────────────────────────────────────────────────────
type ToolbarButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
};

function ToolbarButton({ onClick, isActive, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={isActive}
      className={[
        "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors",
        "text-gray-600 dark:text-gray-300",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" : "",
        disabled ? "cursor-not-allowed opacity-40 hover:bg-transparent dark:hover:bg-transparent" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-6 w-px shrink-0 self-center border-l border-gray-200 dark:border-gray-700" />;
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────
function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    if (editor.state.selection.empty) {
      window.alert("Sélectionnez d'abord le texte à lier");
      return;
    }
    const url = window.prompt("URL du lien :", "https://");
    if (url === null) return; // annulation
    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url.trim() }).run();
  };

  const addImage = () => {
    const url = window.prompt("URL de l'image :", "/images/blog/");
    if (url === null || url.trim() === "") return;
    editor.chain().focus().setImage({ src: url.trim(), alt: "Illustration" }).run();
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 rounded-t-xl border-b border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-900">
      {/* Groupe 1 — Styles de caractère */}
      <ToolbarButton
        title="Gras (Ctrl+B)"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <BoldIcon size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Italique (Ctrl+I)"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <ItalicIcon size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Souligné (Ctrl+U)"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      >
        <UnderlineIcon size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Barré (Ctrl+Shift+X)"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        <Strikethrough size={16} />
      </ToolbarButton>

      <Divider />

      {/* Groupe 2 — Structure */}
      <ToolbarButton
        title="Grand titre (H2)"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
      >
        <Heading1 size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Sous-titre (H3)"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
      >
        <Heading2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Citation"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
      >
        <Quote size={16} />
      </ToolbarButton>

      <Divider />

      {/* Groupe 3 — Alignement */}
      <ToolbarButton
        title="Aligner à gauche"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Centrer"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Aligner à droite"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight size={16} />
      </ToolbarButton>

      <Divider />

      {/* Groupe 4 — Listes */}
      <ToolbarButton
        title="Liste à puces"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Liste numérotée"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        <ListOrdered size={16} />
      </ToolbarButton>

      <Divider />

      {/* Groupe 5 — Insertions */}
      <ToolbarButton title="Lien" onClick={setLink} isActive={editor.isActive("link")}>
        <LinkIcon size={16} />
      </ToolbarButton>
      <ToolbarButton title="Image" onClick={addImage}>
        <ImageIcon size={16} />
      </ToolbarButton>
      <ToolbarButton title="Séparateur" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={16} />
      </ToolbarButton>

      <Divider />

      {/* Groupe 6 — Historique */}
      <ToolbarButton
        title="Annuler (Ctrl+Z)"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Rétablir (Ctrl+Y)"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo size={16} />
      </ToolbarButton>
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────
export function RichTextEditor({ value, onChange, placeholder, minHeight = 400 }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        // Link et Underline sont fournis séparément avec notre configuration
        link: false,
        underline: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-orange-600 hover:underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg my-4 max-w-full" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: placeholder ?? "Rédige ton article ici…",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-headings:font-bold prose-a:text-orange-600 max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Synchronise le contenu externe (ex : chargement d'un article à éditer)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-orange-500 dark:border-gray-700">
      <Toolbar editor={editor} />
      <div className="rounded-b-xl bg-white p-4 dark:bg-gray-900 md:p-6" style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
