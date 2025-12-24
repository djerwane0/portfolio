    #include <stdio.h>

    #define TAILLE 3

    void afficherGrille(char grille[TAILLE][TAILLE]) {
        printf("\n");
        for (int i = 0; i < TAILLE; i++) {
            for (int j = 0; j < TAILLE; j++) {
                printf(" %c ", grille[i][j]);
                if (j < TAILLE - 1) printf("|");
            }
            printf("\n");
            if (i < TAILLE - 1) printf("---|---|---\n");
        }
        printf("\n");
    }

    int verifierVictoire(char grille[TAILLE][TAILLE], char joueur) {
        // Vérification des lignes
        for (int i = 0; i < TAILLE; i++) {
            if (grille[i][0] == joueur && grille[i][1] == joueur && grille[i][2] == joueur)
                return 1;
        }
        // Vérification des colonnes
        for (int j = 0; j < TAILLE; j++) {
            if (grille[0][j] == joueur && grille[1][j] == joueur && grille[2][j] == joueur)
                return 1;
        }
        // Vérification des diagonales
        if (grille[0][0] == joueur && grille[1][1] == joueur && grille[2][2] == joueur)
            return 1;
        if (grille[0][2] == joueur && grille[1][1] == joueur && grille[2][0] == joueur)
            return 1;

        return 0;
    }

    int caseValide(char grille[TAILLE][TAILLE], int ligne, int colonne) {
        return (ligne >= 0 && ligne < TAILLE && colonne >= 0 && colonne < TAILLE && grille[ligne][colonne] == ' ');
    }

    int matchNul(char grille[TAILLE][TAILLE]) {
        for (int i = 0; i < TAILLE; i++) {
            for (int j = 0; j < TAILLE; j++) {
                if (grille[i][j] == ' ') return 0; // Au moins une case vide
            }
        }
        return 1; // Aucune case vide
    }

    void jouer() {
        char grille[TAILLE][TAILLE] = { {' ', ' ', ' '}, {' ', ' ', ' '}, {' ', ' ', ' '} };
        int ligne, colonne;
        char joueurActuel = '1';

        printf("Bienvenue au jeu du Morpion !\n");
        afficherGrille(grille);

        while (1) {
            printf("Joueur %c, entrez votre coup (ligne et colonne entre 0 et 2) : ", joueurActuel);
            scanf("%d %d", &ligne, &colonne);

            if (!caseValide(grille, ligne, colonne)) {
                printf("Coup invalide ! Réessayez.\n");
                continue;
            }

            grille[ligne][colonne] = joueurActuel;
            afficherGrille(grille);

            if (verifierVictoire(grille, joueurActuel)) {
                printf("Félicitations ! Le joueur %c a gagné !\n", joueurActuel);
                break;
            }

            if (matchNul(grille)) {
                printf("Match nul !\n");
                break;
            }

            // Changer de joueur
            joueurActuel = (joueurActuel == '1') ? '2' : '1';
        }
    }

    int main() {
        jouer();
        return 0;
    }
