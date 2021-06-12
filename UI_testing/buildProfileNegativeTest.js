const {Builder,By,Key,util}=require("selenium-webdriver");
async function buildProfile(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/login");
    await driver.findElement(By.name("email")).sendKeys("faculty6@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("6Faculty6@gmail.com",Key.RETURN);
    await driver.findElement(By.name("login")).click();

    await driver.findElement(By.name("profileFirstName")).sendKeys("Ram",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("profileLastName")).sendKeys("K",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("profileCity")).sendKeys("Chennai",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("profilePhoneNo")).sendKeys("7389109364",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("profileAddress")).sendKeys("19 A type 2 Quarters block 9",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("profileDescription")).sendKeys("ML enthusiast",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("build")).click();

    let a1 = driver.actions();
    a1.pause(1000).perform();

    await driver.findElement(By.name("department")).sendKeys("CSE",Key.RETURN);
    a1.pause(1000).perform();
    await driver.findElement(By.name("build")).click();
    

}
buildProfile();