// TODO: Write code to define and export the Engineer class.  HINT: This class should
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name,id, email, username) {
        super(name, id, email);
        this.username = username;
}
    getGithub() {
        return this.username
    }}

module.exports = Engineer;
