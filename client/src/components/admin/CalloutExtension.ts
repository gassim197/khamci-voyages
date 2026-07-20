import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { TextSelection } from "@tiptap/pm/state";
import { CalloutView } from "./CalloutView";

// ─── Variantes disponibles ───────────────────────────────────────────────────
export const CALLOUT_VARIANTS = ["retenir", "conseil", "exemple", "erreur", "resultat"] as const;
export type CalloutVariant = (typeof CALLOUT_VARIANTS)[number];

/** Titre par défaut affiché en haut de chaque variante de callout. */
export const CALLOUT_DEFAULT_TITLES: Record<CalloutVariant, string> = {
  retenir: "À retenir",
  conseil: "Le conseil de KHAMCI VOYAGES",
  exemple: "Exemple concret",
  erreur: "Erreur fréquente",
  resultat: "Résultat observé",
};

/** Emoji illustrant chaque variante (affiché dans le menu d'insertion). */
export const CALLOUT_ICONS: Record<CalloutVariant, string> = {
  retenir: "📌",
  conseil: "💡",
  exemple: "📖",
  erreur: "⚠️",
  resultat: "✅",
};

function isCalloutVariant(value: string): value is CalloutVariant {
  return (CALLOUT_VARIANTS as readonly string[]).includes(value);
}

// ─── Typage des commandes ────────────────────────────────────────────────────
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      /** Insère un encadré éditorial (callout) de la variante donnée. */
      setCallout: (attrs: { variant: CalloutVariant; title?: string }) => ReturnType;
    };
  }
}

// ─── Nœud Tiptap "callout" ───────────────────────────────────────────────────
export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  isolating: true,

  addAttributes() {
    return {
      variant: {
        default: "retenir" as CalloutVariant,
        parseHTML: (element) => {
          const raw = element.getAttribute("data-variant") ?? "";
          return isCalloutVariant(raw) ? raw : "retenir";
        },
        renderHTML: (attributes) => ({ "data-variant": attributes.variant }),
      },
      title: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-title") ?? "",
        renderHTML: (attributes) => ({ "data-title": attributes.title }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.callout",
        // Le contenu éditable vit dans .callout-body ; le titre est lu depuis data-title.
        contentElement: ".callout-body",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const variant = isCalloutVariant(node.attrs.variant) ? node.attrs.variant : "retenir";
    const title = typeof node.attrs.title === "string" ? node.attrs.title : "";
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: `callout callout-${variant}` }),
      ["div", { class: "callout-title" }, title],
      ["div", { class: "callout-body" }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutView);
  },

  addCommands() {
    return {
      setCallout:
        ({ variant, title }) =>
        ({ state, chain }) => {
          const resolvedTitle = title ?? CALLOUT_DEFAULT_TITLES[variant];
          const insertPos = state.selection.from;
          return chain()
            .insertContent({
              type: this.name,
              attrs: { variant, title: resolvedTitle },
              content: [{ type: "paragraph" }],
            })
            .command(({ tr, dispatch }) => {
              if (dispatch) {
                // Place le curseur à l'intérieur du body (paragraphe vide) :
                // +1 pour entrer dans le callout, +1 pour entrer dans le paragraphe.
                const target = Math.min(insertPos + 2, tr.doc.content.size);
                tr.setSelection(TextSelection.near(tr.doc.resolve(target)));
              }
              return true;
            })
            .focus()
            .run();
        },
    };
  },
});

export default Callout;
