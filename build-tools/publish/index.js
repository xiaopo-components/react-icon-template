const npmLogin = require("npm-cli-login");
const { exec } = require("child_process");

function getNpmLoginData() {
  if (process.env["NODE_USERNAME"]) {
    // use system env
    const username = process.env["NODE_USERNAME"];
    const password = process.env["NODE_PASSWORD"];
    const email = process.env["NODE_EMAIL"];
    const registry = process.env["NODE_REGISTRY"];
    return { username, password, email, registry };
  } else {
    return require("../../publish-config.json");
  }
}

function main() {
  const { username, password, email, registry } = getNpmLoginData();
  npmLogin(username, password, email, registry);
  console.log(
    "----------------\n" + "user login success\n" + "----------------"
  );

  exec(`npm publish --registry=${registry}`, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
}

// run main
main();
