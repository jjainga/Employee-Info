// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, role, officeNum) {
        super(name, id, email, role)
        this.officeNum = officeNum;
}
    getOfficeNumber() {
        return this.officeNum
    }}

module.exports = Manager;


