// bookController.js

// Importe o pacote 'connect-flash'
const flash = require('connect-flash');

// Array de objetos simulando o banco de dados de livros
const booksDB = [
    { id: 1, title: "Livro 1", author: "Autor 1", year: 2020 },
    { id: 2, title: "Livro 2", author: "Autor 2", year: 2019 },
    { id: 3, title: "Livro 3", author: "Autor 3", year: 2018 },
    { id: 4, title: "Livro 4", author: "Autor 3", year: 2017 },
    { id: 5, title: "Livro 5", author: "Autor 3", year: 2016 },
    { id: 6, title: "Livro 6", author: "Autor 3", year: 2015 },
    { id: 7, title: "Livro 7", author: "Autor 3", year: 2014 },
    { id: 8, title: "Livro 8", author: "Autor 3", year: 2013 },
    { id: 9, title: "Livro 9", author: "Autor 3", year: 2012 },
    { id: 10, title: "Livro 10", author: "Autor 3", year: 2011 }
];

// Função para renderizar o formulário de busca de livros
function showBooksForm(req, res) {
    // Obtém os parâmetros de pesquisa digitados pelo usuário
    const searchTitle = req.query.title || '';
    const searchYear = req.query.year || '';

    // Renderiza a página inicial com todos os livros como resultados de busca
    res.render('index', { allBooks: booksDB, books: booksDB, searchTitle: searchTitle, searchYear: searchYear });
}

// Função para buscar livros com base nos parâmetros fornecidos
function searchBooks(req, res) {
    const title = req.query.title;
    const year = req.query.year;

    if (title && year) {
        // Lógica para buscar livros pelo título e ano
        const booksFound = searchByTitleAndYear(title, year);
        res.render('index', { books: booksFound, searchTitle: title, searchYear: year });
    } else if (title) {
        // Lógica para buscar livros pelo título
        const booksFound = searchByTitle(title);
        res.render('index', { books: booksFound, searchTitle: title, searchYear: '' });
    } else if (year) {
        // Lógica para buscar livros pelo ano
        const booksFound = searchByYear(year);
        res.render('index', { books: booksFound, searchTitle: '', searchYear: year });
    } else {
        // Se nenhum parâmetro de busca for fornecido, mostrar todos os livros
        res.render('index', { allBooks: booksDB, books: booksDB, searchTitle: '', searchYear: '' });
    }
}

// Função para buscar livros pelo título e ano
function searchByTitleAndYear(title, year) {
    return booksDB.filter(book => book.title.toLowerCase().includes(title.toLowerCase()) && book.year == year);
}

// Função para buscar livros pelo título
function searchByTitle(title) {
    return booksDB.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
}

// Função para buscar livros pelo ano
function searchByYear(year) {
    return booksDB.filter(book => book.year == year);
}

module.exports = {
    showBooksForm,
    searchBooks
};
