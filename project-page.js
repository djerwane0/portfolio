document.addEventListener('DOMContentLoaded', () => {
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
