const {Builder,By,Key,util}=require("selenium-webdriver");

async function loginNegativeCase(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/login");
    await driver.findElement(By.name("login")).click();

    let a1 = driver.actions();
    a1.pause(1000).perform();

    await driver.findElement(By.name("email")).sendKeys("noname",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("password",Key.RETURN);
    await driver.findElement(By.name("login")).click();
    await driver.get("http://localhost:8080/login");

    a1.pause(1000).perform();
    await driver.findElement(By.name("email")).sendKeys("faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("Faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("login")).click();

}
loginNegativeCase();