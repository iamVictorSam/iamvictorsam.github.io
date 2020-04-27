//Init Github
const github = new Github;

//Init UI
const ui = new UI;

//Search Input
const searchUser = document.getElementById("searchUser");

//Search Input event listener
searchUser.addEventListener("keyup", (e) => {
    //Get Input text
    const userText = e.target.value;
    
    if(userText !== "") {
        //Make http call
        github.getUser(userText)
        .then(data => {
            if(data.profile.message === "Not Found") {
                //Show alert
                ui.showAlert("User Not Found", "alert alert-danger");
            } else {
                //Show profile
                ui.showProfile(data.profile);
                //Show repos
                ui.showRepos(data.repos);
            }
        })
    } else {
        //Clear Profile
        ui.clearProfile();
    }
});