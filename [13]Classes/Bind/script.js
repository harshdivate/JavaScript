class App {
    constructor() {
        this.serverName = 'localhost';
        document.addEventListener('click',this.getServerName.bind(this));
    }

    getServerName() {
        console.log(this.serverName);
    }
}

const a = new App();
a.getServerName();