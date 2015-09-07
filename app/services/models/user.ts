export default class User {
    constructor(
        public username:string,
        public name:string,
        public avatarUrl:string,
        public id:number,
        public following:number,
        public followers:number) {
    }
}