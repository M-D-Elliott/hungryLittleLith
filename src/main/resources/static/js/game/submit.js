const baseUrl = "http://localhost:8080";

const playerUsername = document.querySelector('#currentPlayerUsername');

const MUST_BE_LOGGED_IN_MESSAGE = "You must be logged in to submit scores.";

function submitScoreToAPI(score) {

    if(!validateLoginStatus(playerUsername)){
        return false;
    }

    if (score == null || score == undefined) {
        console.error("Sorry, dev, you forgot to include the score.");
    }

    const csrfToken = document.querySelector('#csrf').value;

    const config = {
        method: "post",
        mode: "cors",
        credentials: "include",
        redirect: "error",

        body: JSON.stringify({
            value: score,
            player_Username: playerUsername.value,
            platform_ID : 1,
        }),
        headers: new Headers({
            "Content-Type": 'application/json',
            'X-CSRF-TOKEN': csrfToken
        }),
    };

    fetch(baseUrl + '/api/score/add', config)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (replays) {
                    alert("success!");
                });
            } else {
                console.error("Problem submitting score.");
            }
        })
        .catch(function (response) {
            alert(response);
        });
}

function validateLoginStatus(playerUsername){
    if (playerUsername == null || playerUsername == undefined || playerUsername.value == "guest") {
        alert(MUST_BE_LOGGED_IN_MESSAGE);
        return false;
    }
    return true;
}

validateLoginStatus(playerUsername);