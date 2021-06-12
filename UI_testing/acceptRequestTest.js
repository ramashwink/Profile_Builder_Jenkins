const {Builder,By,Key,util}=require("selenium-webdriver");

async function acceptRequest(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/login");
    await driver.findElement(By.name("email")).sendKeys("faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("Faculty4@gmail.com",Key.RETURN);
    let a1 = driver.actions();
    a1.pause(1000).perform();
    await driver.findElement(By.name("login")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("requests")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("description")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("accept")).click();
    a1.pause(1000).perform();
    await driver.findElement(By.name("acceptedRequest")).click();
}
acceptRequest();