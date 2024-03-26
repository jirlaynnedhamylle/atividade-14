const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./database');
const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'suaChaveSecreta',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Middleware para ajustar o tipo MIME para arquivos CSS
app.use('/styles.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
}, express.static('public'));

// Rotas
app.get('/', bookController.showBooksForm);
app.get('/search', bookController.searchBooks); // Adicione esta linha para a rota de busca
app.get('/login', authController.showLoginForm);
app.post('/login', authController.login, (req, res) => {
    req.flash('success', 'Login feito com sucesso'); // Mensagem de sucesso ao fazer login
    res.redirect('/');
});
app.get('/logout', authController.logout);
app.get('/register', authController.showRegisterForm);
app.post('/register', authController.register, (req, res) => {
    req.flash('success', 'Usuário cadastrado com sucesso'); // Mensagem de sucesso ao se cadastrar
    res.redirect('/');
});

// Rota '/myaccount'
app.get('/myaccount', (req, res) => {
    // Verifica se o usuário está autenticado
    if (!req.session.authenticated) {
        req.flash('error', 'Você não está autenticado');
        return res.redirect('/login'); // Redireciona para a página de login se não estiver autenticado
    }

    // Consulta o banco de dados para obter os detalhes do usuário
    const userId = req.session.userId; // Supondo que você tenha uma chave de sessão para o ID do usuário
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (err) {
            req.flash('error', 'Erro ao buscar detalhes do usuário');
            return res.redirect('/');
        }
        // Consulta o banco de dados para obter a lista de todos os usuários cadastrados
        db.all('SELECT * FROM users', (err, allUsers) => {
            if (err) {
                req.flash('error', 'Erro ao buscar lista de usuários');
                return res.redirect('/');
            }
            res.render('myaccount', { user: user, allUsers: allUsers, error: req.flash('error') });
        });
    });
});


// Middleware para adicionar mensagens flash às views
app.use((req, res, next) => {
    res.locals.success = req.flash('success'); // Disponibiliza a mensagem flash de sucesso para todas as views
    res.locals.error = req.flash('error'); // Disponibiliza a mensagem flash de erro para todas as views
    next();
});

// Inicialização do servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
