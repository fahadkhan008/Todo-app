import readlineSync from "readline-sync";
import figlet from "figlet";
import chalk from "chalk";
let todos = [];
let idCounter = 1;
function displayTitle() {
    console.log(chalk.redBright(figlet.textSync("Todo CLI", { horizontalLayout: "full" })));
}
function addTodo() {
    const task = readlineSync.question(chalk.blue("Enter the task: "));
    if (task.trim().length === 0) {
        console.log(chalk.red("Task cannot be empty. Please try again."));
        return;
    }
    todos.push({ id: idCounter++, task });
    console.log(chalk.green("Todo added successfully!"));
}
function deleteTodo() {
    if (todos.length === 0) {
        console.log(chalk.red("No todos to delete."));
        return;
    }
    displayTodos();
    const id = parseInt(readlineSync
        .question(chalk.blue("Enter the ID of the todo to delete: "))
        .trim(), 10);
    if (isNaN(id)) {
        console.log(chalk.red("Invalid ID. Please enter a valid number."));
        return;
    }
    const initialLength = todos.length;
    todos = todos.filter((todo) => todo.id !== id);
    if (todos.length === initialLength) {
        console.log(chalk.red(`Todo with ID ${id} not found.`));
    }
    else {
        console.log(chalk.green("Todo deleted successfully!"));
    }
}
function displayTodos() {
    if (todos.length === 0) {
        console.log(chalk.white("No todos to display."));
        return;
    }
    console.log(chalk.magenta("-------- Todos --------"));
    todos.forEach((todo) => console.log(chalk.cyan(`ID: ${todo.id} - Task: ${todo.task}`)));
}
function showMenu() {
    console.log(chalk.magenta("\n-------- Menu --------"));
    console.log(chalk.blue("1. Add a todo"));
    console.log(chalk.blue("2. Delete a todo"));
    console.log(chalk.blue("3. List todos"));
    console.log(chalk.blue("4. Exit"));
}
function main() {
    displayTitle();
    while (true) {
        showMenu();
        const choice = readlineSync
            .question(chalk.yellow("Choose an action (1/2/3/4): "))
            .trim();
        switch (choice) {
            case "1":
                addTodo();
                break;
            case "2":
                deleteTodo();
                break;
            case "3":
                displayTodos();
                break;
            case "4":
                console.log(chalk.green("Exiting..."));
                return;
            default:
                console.log(chalk.red("Invalid choice. Please choose 1, 2, 3, or 4."));
        }
    }
}
main();
