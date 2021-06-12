const {Builder,By,Key,util,WebElement}=require("selenium-webdriver");
async function example(){

    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:8080/login");
    
    await driver.findElement(By.name("email")).sendKeys("faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("Faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("login")).click();

    // for changing password

    await driver.findElement(By.name("btn")).click();
    /*await driver.findElement(By.name("changePassword")).click();

    await driver.findElement(By.name("oldPassword")).sendKeys("4Faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("newPassword")).sendKeys("Faculty4@gmail.com",Key.RETURN);

    await driver.findElement(By.name("change")).click();*/
    let a1 = driver.actions();
    a1.pause(1000).perform();

    //for editing personal details
    await driver.findElement(By.id("editPersonalDetails")).click();

    WebElement ;
    fname = driver.findElement(By.name("fname"));
    fname.clear();
    await driver.findElement(By.name("fname")).sendKeys("Gayathri",Key.RETURN);
    

    await driver.findElement(By.name("projectAvailability")).click();

    await driver.findElement(By.name("edit")).click();

}
example();



