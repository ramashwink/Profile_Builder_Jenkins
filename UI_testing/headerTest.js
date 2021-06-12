const {Builder,By,Key,util}=require("selenium-webdriver");

async function userHeader(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/login");
    let a1 = driver.actions()
    await driver.findElement(By.name("email")).sendKeys("faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("4Faculty4@gmail.com",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("login")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("stats")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("logout")).click();

}

userHeader();