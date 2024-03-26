function setAuthCookie(req, res) {
    // Cria um cookie chamado "auth" e associa a uma sessão
    if (req.session.authenticated) {
        res.cookie('auth', 'authenticated', { maxAge: 3600000 }); // Cookie expira em 1 hora (3600000 ms)
    } else {
        res.clearCookie('auth'); // Remove o cookie se o usuário não estiver autenticado
    }
}

module.exports = setAuthCookie;
