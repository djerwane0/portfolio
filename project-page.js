document.addEventListener('DOMContentLoaded', () => {
    // Gère proprement les boutons "Voir le code" quand le lien n'est pas encore renseigné.
    // Usage : ajouter data-missing-link="true" sur le <a>.
    document.querySelectorAll('[data-missing-link="true"]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert(
                "Lien du code non renseigné.\n\n" +
                "Ajoute ton URL GitHub (ou le chemin vers le fichier) dans l'attribut href du bouton."
            );
        });
    });
});
