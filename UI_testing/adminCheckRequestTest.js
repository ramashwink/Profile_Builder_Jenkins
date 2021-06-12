const {Builder,By,Key,util}=require("selenium-webdriver");
async function studentRegistering(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/login");
    await driver.findElement(By.name("email")).sendKeys("admin@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("Admin@123",Key.RETURN);
    let a1 = driver.actions();
    a1.pause(1000).perform();
    await driver.findElement(By.name("login")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("request")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("reset")).click();
    a1.pause(1000).perform();
   
}
studentRegistering();