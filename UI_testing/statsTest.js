const {Builder,By,Key,util}=require("selenium-webdriver");

async function statsCheck(){
    let driver = await new Builder().forBrowser("firefox").build();
    //await driver.get("http://localhost:8080/faculties/60b779b032177759d8f2332c");

    await driver.get("http://localhost:8080/login");
    await driver.findElement(By.name("email")).sendKeys("faculty3@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("3Faculty3@gmail.com",Key.RETURN);
    let a1 = driver.actions();
    a1.pause(1000).perform();
    await driver.findElement(By.name("login")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("stats")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("facultyViewCount")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("otherViewCount")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("weekly")).click();
    
}
statsCheck();