async function InfoFetcher() {
    var url = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=1f0571a9cef2c02a19e6a2e65c8fa50e&artist=" + document.getElementById('ArtistName').value + "&album=" + document.getElementById('AlbumName').value + "&format=json";

    try {
        fetchedAnswer = await fetch(url);
        databankJson = await fetchedAnswer.json();
        infoPrinter();
    }
    catch {
        alert("Error! Burn it all down!");
    }
}

function infoPrinter() {
    document.getElementById("AlbumBasicInfo").innerHTML = "<h1>" + databankJson.album.name + "</h1> <h2>" + databankJson.album.artist + "</h2> <br><br><br> <p> Global Playcount: " + databankJson.album.playcount + "<br>Listeners: " + databankJson.album.listeners +  "</p>";

    var tagNumber;
    if (databankJson.album.tags != "") {
        if (databankJson.album.tags.tag.length >= 3) {
            tagNumber = 3;
        }
        else {
            tagNumber = databankJson.album.tags.tag.length;
        }
        let AlbumBasicInfo = document.getElementById("AlbumBasicInfo");
        AlbumBasicInfo.innerHTML += "<br> <h4> Tags: <h4>"
        for (let i = 0; i < tagNumber; i++) {
            AlbumBasicInfo.innerHTML += "<div class='tagpill'>" + databankJson.album.tags.tag[i].name + "</div>"
        }
    }

    let Cover = document.getElementById("CoverArt");
    Cover.setAttribute("alt", "Album Cover");
    Cover.setAttribute("id", "image");
    Cover.setAttribute("src", JSON.stringify(databankJson.album.image[3]).slice(30).replace('"}', ""));

    document.getElementById("Tracks").innerHTML = "<h4>Tracks: </h4>";
    if (Array.isArray(databankJson.album.tracks.track)) {
        for (let i = 0; i < databankJson.album.tracks.track.length; i++) {
            document.getElementById("Tracks").innerHTML += "<h3>"+ i + ". " + databankJson.album.tracks.track[i].name + "</h3><br>"
        }
    }
}