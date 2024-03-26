const db = require("../database");
const setAuthCookie = require("../cookieHandler");

function showLoginForm(req, res) {
  res.render("login", { error: req.flash("error") }); // Passa a mensagem de erro flash para a view
}

function login(req, res) {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, user) => {
      if (err) {
        console.error(err);
        res.render("login", { error: "Erro ao verificar credenciais" });
      } else if (user) {
        req.session.authenticated = true;
        setAuthCookie(req, res);
        res.redirect("/");

        // Exibir mensagem de sucesso
        req.session.successMessage = "Login efetuado com sucesso.";
      } else {
        res.render("login", { error: "Usuário não encontrado" });
      }
    }
  );
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.clearCookie("auth");
      res.redirect("/login");
    }
  });
}

function register(req, res) {
  const { username, password } = req.body;

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) {
        console.error(err);
        res.render("register", { error: "Erro ao cadastrar usuário" });
      } else {
        // Após o cadastro bem-sucedido, autenticamos o usuário
        req.session.authenticated = true;
        // Definimos o cookie de autenticação
        setAuthCookie(req, res);
        // Redirecionamos para a página inicial
        res.redirect("/");

        // Exibir mensagem de sucesso
        req.flash('success', 'Usuário cadastrado com sucesso.');
      }
    }
  );
}

function showRegisterForm(req, res) {
  res.render("register");
}

module.exports = {
  showLoginForm,
  login,
  logout,
  showRegisterForm,
  register,
};
