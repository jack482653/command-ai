const fs = require('fs');

const HOME_DIR = process.env.HOME;
const CONFIG_FILE = `${HOME_DIR}/.open-ai-cli`;

class Config {
    constructor() {
        this.config = {
            "name": "My App",
            "version": "1.0.0",
            "env": "dev"
        };
    }
    get(key) {
        return this.config[key];
    }

    static getConfig() {
      try {
        return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
      } catch (error) {
        return {};
      }
    }

    static getValue(key) {
      const config = this.getConfig();

      return config[key];
    }

    static update(key, value) {
      const config = this.getConfig();
      config[key] = value;

      fs.writeFileSync(CONFIG_FILE, JSON.stringify(config));
    }

    static removeConfig() {
      fs.unlinkSync(CONFIG_FILE)
    }
}

module.exports = Config;