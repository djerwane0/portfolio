document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Effet de machine à écrire (Inchangé) ---
    const textElement = document.querySelector('.typing-text');
    if (textElement) {
        const words = ["Développeur C / Python", "Passionné par le Web", "Explorateur de Code"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                charIndex--;
                textElement.textContent = currentWord.substring(0, charIndex);
            } else {
                charIndex++;
                textElement.textContent = currentWord.substring(0, charIndex);
            }

            let typeSpeed = isDeleting ? 80 : 150;
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(typeEffect, typeSpeed);
        }
        typeEffect();
    }

    // --- 2. Animation au scroll (Inchangé) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } 
        });
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- 3. Fond Canvas : Symboles de Code Flottants ---
    const canvas = document.getElementById('canvas-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let symbolsArray = [];
        
        // Liste des symboles "Dev" qui vont flotter
        const devSymbols = ['{ }', '</>', '0', '1', ';', '#', '&&', '||', '[]', 'C', 'Py', 'js'];

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasSize();

        window.addEventListener('resize', () => {
            setCanvasSize();
            init(); 
        });

        // Gestion souris (Juste un léger effet de repoussement, très soft)
        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class CodeSymbol {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.text = devSymbols[Math.floor(Math.random() * devSymbols.length)];
                this.size = Math.random() * 15 + 10; // Taille discrète (10px à 25px)
                this.speedY = Math.random() * 1 + 0.5; // Monte doucement
                this.opacity = Math.random() * 0.5 + 0.1; // Transparence variable
            }

            update() {
                // Le symbole monte
                this.y -= this.speedY;

                // Interaction douce avec la souris (les symboles s'écartent un peu)
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        const forceDirectionX = dx / distance;
                        const force = (100 - distance) / 100;
                        const directionX = forceDirectionX * force * 2;
                        this.x -= directionX;
                    }
                }

                // Si le symbole sort en haut, il revient en bas (boucle infini)
                if (this.y < -50) {
                    this.y = canvas.height + 50;
                    this.x = Math.random() * canvas.width;
                    this.text = devSymbols[Math.floor(Math.random() * devSymbols.length)];
                }
            }

            draw() {
                ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`; // Vert néon avec transparence
                ctx.font = `${this.size}px 'Fira Code', monospace`; // Police code
                ctx.fillText(this.text, this.x, this.y);
            }
        }

        function init() {
            symbolsArray = [];
            // Densité modérée (pas trop chargé)
            const numberOfSymbols = (canvas.height * canvas.width) / 10000; 
            for (let i = 0; i < numberOfSymbols; i++) {
                symbolsArray.push(new CodeSymbol());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < symbolsArray.length; i++) {
                symbolsArray[i].update();
                symbolsArray[i].draw();
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();
    }
});