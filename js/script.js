document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('footer');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `${currentYear} - Desenvolvido por Lucas Chambi`;
    }

    // Lazy loading para imagens
    const images = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Executa na carga e quando mudar orientação
    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Acessibilidade: permite navegação por teclado nas figuras
    const figures = document.querySelectorAll('.secao__container figure');
    figures.forEach((figure, index) => {
        figure.setAttribute('tabindex', '0');
        figure.setAttribute('role', 'figure');
        figure.setAttribute('aria-label', `Imagem ${index + 1}: ${figure.querySelector('strong')?.textContent || 'Código Arduino'}`);
    });
});
