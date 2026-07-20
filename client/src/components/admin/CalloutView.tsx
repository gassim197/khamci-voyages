import { NodeViewWrapper, NodeViewContent, type NodeViewProps } from "@tiptap/react";
import { CALLOUT_DEFAULT_TITLES, type CalloutVariant } from "./CalloutExtension";

/**
 * Vue d'édition d'un callout dans l'éditeur admin.
 *
 * - Le wrapper porte les classes `callout callout-{variant}` : le rendu WYSIWYG
 *   utilise donc EXACTEMENT le même CSS (client/src/styles/callout.css) que le
 *   rendu public, garantissant la cohérence visuelle.
 * - Le titre est éditable inline via un <input> logé dans une zone
 *   `contentEditable={false}` (protège la saisie du titre des raccourcis
 *   ProseMirror et empêche Backspace de supprimer le bloc par accident).
 * - Le corps est le contenu formatable réel, rendu par <NodeViewContent>.
 *
 * La sérialisation vers la DB n'utilise PAS cette vue : elle passe par
 * `renderHTML` de l'extension, qui produit le HTML de stockage propre.
 */
export function CalloutView({ node, updateAttributes }: NodeViewProps) {
  const variant = node.attrs.variant as CalloutVariant;
  const title = (node.attrs.title as string) ?? "";

  return (
    <NodeViewWrapper
      className={`callout callout-${variant}`}
      data-variant={variant}
      data-title={title}
    >
      <div className="callout-title" contentEditable={false}>
        <input
          className="callout-title-input"
          value={title}
          onChange={(e) => updateAttributes({ title: e.target.value })}
          onKeyDown={(e) => {
            // Empêche les raccourcis de l'éditeur de s'appliquer pendant la
            // saisie du titre (Entrée = valider, on ne crée pas de nouveau bloc).
            e.stopPropagation();
            if (e.key === "Enter") e.preventDefault();
          }}
          placeholder={CALLOUT_DEFAULT_TITLES[variant]}
          aria-label="Titre de l'encadré"
          spellCheck={false}
        />
      </div>
      <NodeViewContent className="callout-body" />
    </NodeViewWrapper>
  );
}

export default CalloutView;
