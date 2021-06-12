const {Builder,By,Key,util}=require("selenium-webdriver");

async function editProfile(){
    let driver = await new Builder().forBrowser("firefox").build();
    //await driver.get("http://localhost:8080/faculties/60b779b032177759d8f2332c");

    await driver.get("http://localhost:8080/login");
    await driver.findElement(By.name("email")).sendKeys("faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("password")).sendKeys("4Faculty4@gmail.com",Key.RETURN);
    await driver.findElement(By.name("login")).click();

    await driver.findElement(By.name("addLink")).click();
    await driver.findElement(By.name("link")).sendKeys("https://www.linkedin.com/in/gayathri-v-016854196/",Key.RETURN);
    await driver.findElement(By.name("add")).click();

    await driver.findElement(By.name("selectPreferences")).click();
    await driver.findElement(By.name("availablePreferences")).click();
    await driver.findElement(By.name("tickButton")).click();

    await driver.findElement(By.name("publicationName")).sendKeys("CVPR",Key.RETURN);
    await driver.findElement(By.name("startDate")).sendKeys("03-06-2021",Key.RETURN);
    await driver.findElement(By.name("endDate")).sendKeys("04-09-2021",Key.RETURN);
    await driver.findElement(By.name("link")).sendKeys("https://www.linkedin.com/in/gayathri-v-016854196/",Key.RETURN);
    await driver.findElement(By.name("add")).click();


}

editProfile();