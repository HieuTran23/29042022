module.exports = {
    databaseConnection: require('./connection'),
    UserRepository: require('./repository/user-repository'),
    TokenRepository: require('./repository/token-repository'),
    PostRepository: require('./repository/post-repository'),
    CategoryRepository: require('./repository/category-repository')
}
