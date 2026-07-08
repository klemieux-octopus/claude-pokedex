/**
 * Choisit l'artwork à afficher selon le toggle shiny, avec repli sur l'artwork
 * par défaut quand la variante shiny est absente. Partagé par la liste et le
 * volet de détail pour que la règle « shiny → sinon défaut » vive à un seul endroit.
 */
export function pickArtwork(
  shiny: boolean,
  shinyUrl: string | null,
  defaultUrl: string | null,
): string | null {
  return shiny ? (shinyUrl ?? defaultUrl) : defaultUrl
}
