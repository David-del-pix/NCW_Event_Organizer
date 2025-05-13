document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelector('a[href="logout.html"]').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html';
    });
});
