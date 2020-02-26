const baseUrl = "http://localhost:8080";

const REPLAY_FAILURE_WARNING = "Could not fetch replays.";

const currentUser = document.querySelector('#currentPlayerUsername').value;

// retrieving replayS:
const replayButtons = document.querySelectorAll("a.showReplays");

replayButtons.forEach(function (replayButton) {
    replayButton.addEventListener("click", function (e) {
        //removes event listener.
        replayButton.outerHTML = replayButton.outerHTML;

        const replayListTarget = replayButton.getAttribute("data-target");

        const scoreID = replayButton.getAttribute("data-scoreID");

        const replayListContainer = document.querySelector(replayListTarget);

        fetchReplaysForScore(replayListContainer, scoreID);
    });
});

function fetchReplaysForScore(replayListContainer, scoreID) {
    const config = {
        method: "get",
        mode: "cors",
        credentials: "include",
        redirect: "error",
    };

    fetch(baseUrl + '/api/replay/' + scoreID, config)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (replays) {
                    return bindReplays(replays, replayListContainer);
                });
            } else {
                const replayListMessages = replayListContainer.querySelector("ul > li");
                replayListMessages.innerText = "No replays found.";
            }
        })
        .catch(function () {
            const replayListMessages = replayListContainer.querySelector("ul > li");
            replayListMessages.innerText = REPLAY_FAILURE_WARNING;
        });
}

function bindReplays(replays, replayListContainer) {
    const replayList = replayListContainer.querySelector("ul");

    while (replayList.firstChild) {
        replayList.removeChild(replayList.firstChild);
    }

    const csrfToken = replayListContainer.querySelector('.csrf').value;

    let html = "";

    replays.forEach(replay => {
        html += constructNewReplay(replay, csrfToken);
    });

    replayList.innerHTML = html;
}

function constructNewReplay(replay, csrfToken) {

    const deleteForm = (currentUser == replay.score.player.userName) ? `
    
    <form method="POST" style="display:inline;" class="form-inline" onSubmit="deleteReplay(this); return false;">
        <input type="hidden" name="_csrf" value="${csrfToken}" class="csrf">
        <span class="form-group">
            <input type="hidden" class="deleteReplayID" name="id" value="${replay.id}" />
        </span>
        <span class="form-group">
            <input type="hidden" class="deleteReplayPlayerUsername" name="player_Username" value="${replay.score.player.userName}" />
        </span>
        <span class="form-group">
            <button class="btn btn-danger" type="submit">Delete</button>
        </span>
    </form>
    ` : ``;

    return `<li>
        <span><a href="${replay.url}" target="blank">Link -- external</a></span>
        <span>&nbsp;||&nbsp;</span>
        <span>${replay.uploadedOn}</span>
        <span>&nbsp;||&nbsp;</span>
        ${deleteForm}
    </li>`;
}

//adding replays:
function addReplay(form) {

    const scoreID = form.querySelector('.addReplayScoreID').value;
    const playerUsername = form.querySelector('.addReplayPlayerUsername').value;
    const url = form.querySelector('.addReplayUrl').value;
    const csrfToken = form.querySelector('.csrf').value;

    var config = {
        method: "post",
        mode: "cors",
        credentials: "include",
        redirect: "error",
        body: JSON.stringify({
            replayUrl: url,
            scoreID: scoreID,
            player_Username: playerUsername
        }),
        headers: new Headers({
            "Content-Type": 'application/json',
            'X-CSRF-TOKEN': csrfToken
        }),
    };

    url.value = "";

    fetch(baseUrl + "/api/replay/add", config)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (replay) {
                    const replayList = form.parentNode.querySelector("ul");

                    const removeMe = replayList.querySelector('.removeMe');
                    if (removeMe != null) {
                        replayList.removeChild(removeMe);
                    }
                    const newReplay = constructNewReplay(replay, csrfToken);
                    replayList.innerHTML = replayList.innerHTML + newReplay;
                });
            } else {
                response.json().then(function (error) {
                    const errorField = form.parentNode.querySelector(".replayAddErrors");
                    errorField.innerText = error;
                });

            }
        })
        .catch(function (response) {
            const errorField = form.parentNode.querySelector(".replayAddErrors");
            errorField.innerText = "Could not add replay."
        });
}

function deleteReplay(form) {

    const replayID = form.querySelector('.deleteReplayID').value;
    const playerUsername = form.querySelector('.deleteReplayPlayerUsername').value;
    const csrfToken = form.querySelector('.csrf').value;

    var config = {
        method: "post",
        mode: "cors",
        credentials: "include",
        redirect: "error",
        body: JSON.stringify({
            replayID: replayID,
            player_Username: playerUsername
        }),
        headers: new Headers({
            "Content-Type": 'application/json',
            'X-CSRF-TOKEN': csrfToken
        }),
    };

    fetch(baseUrl + "/api/replay/delete", config)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (replayObject) {
                    const replayListing = form.parentNode;

                    const replayList = replayListing.parentNode;

                    replayList.removeChild(replayListing);

                    const errorField = replayList.parentNode.querySelector(".replayAddErrors");
                    errorField.innerText = "";

                });
            } else {
                console.error(response);
            }

        })
        .catch(function () {
            const errorField = form.parentNode.parentNode.parentNode.querySelector(".replayAddErrors");
            errorField.innerText = "Could not delete replay.";
        });
}