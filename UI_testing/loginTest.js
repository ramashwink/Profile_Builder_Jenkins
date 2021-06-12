const {Builder,By,Key,util}=require("selenium-webdriver");

async function login(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/login");
    await driver.findElement(By.name("email")).sendKeys("faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("Faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("login")).click();
}
login();