module.exports = {
    databaseConnection: require('./connection'),
    UserRepository: require('./repository/user-repository'),
    TokenRepository: require('./repository/token-repository'),
    PostRepository: require('./repository/post-repository'),
    CategoryRepository: require('./repository/category-repository'),
    TagRepository: require('./repository/tag-repository'),
    RoleRepository: require('./repository/role-repository'),
    PermissionRepository: require('./repository/permission-repository'),
    SubPermissionRepository: require('./repository/subPermission-repository'),
    SubCategoryRepository: require('./repository/subCategory-repository')
}
