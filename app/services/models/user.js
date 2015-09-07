var User = (function () {
    function User(username, name, avatarUrl, id, following, followers) {
        this.username = username;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.id = id;
        this.following = following;
        this.followers = followers;
    }
    return User;
})();
exports["default"] = User;
