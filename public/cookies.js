document.addEventListener('DOMContentLoaded', function() {
    const cookieDisclaimer = document.getElementById('cookieDisclaimer');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const closeCookieDisclaimerBtn = document.getElementById('closeCookieDisclaimer');

    // Verifica se o usuário já aceitou os cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieDisclaimer.style.display = 'block'; // Exibe o aviso de cookies
    } else {
        cookieDisclaimer.style.display = 'none'; // Esconde o aviso de cookies
    }

    // Função para aceitar os cookies
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true'); // Armazena que os cookies foram aceitos
        cookieDisclaimer.style.display = 'none'; // Esconde o aviso de cookies
    });

    // Função para fechar o aviso de cookies
    closeCookieDisclaimerBtn.addEventListener('click', function() {
        cookieDisclaimer.style.display = 'none'; // Esconde o aviso de cookies
    });
});
