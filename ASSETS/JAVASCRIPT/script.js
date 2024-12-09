var redirect_uri = 'http://127.0.0.1:5500/index.html';
var client_id = '2783c30aabce4354abf0ea968e643045';
var client_secret = 'fff0e6ff640843299fdbaeb8db69774d';
const AUTHORIZE = 'https://accounts.spotify.com/authorize';
var check;

let btn = document.getElementById('connect');
let authID = document.getElementById('copy');
let spotico = document.getElementById('spotico');
let copyico = document.getElementById('copyico');
let eyeico = document.getElementById('eyeico');
let crossico = document.getElementById('crossico');

function onPageLoad() {
    if (window.location.search.length > 0) {
        handleRedirect();
    }
    else {
        check = localStorage.getItem('AuthCode');
        if (check == 'null' || check == null) {
            btn.value = 'Connect to Spotify';
        }
        else {
            connected();
        }
    }
}

function requestAuthorization() {
    let readPrivate = 'user-read-private';
    let readEmail = 'user-read-email';
    let modPlayback = 'user-modify-playback-state';
    let readPlaybackPos = 'user-read-playback-position';
    let readLibrary = 'user-library-read';
    let stream = 'streaming';
    let readPlaybackState = 'user-read-playback-state';
    let readRecent = 'user-read-recently-played';
    let readPravatePl = 'playlist-read-private';
    let modLibrary = 'user-library-modify';

    let scopes = `${readPrivate} ${readEmail} ${modPlayback} ${readPlaybackPos} ${readLibrary} ${stream} ${readPlaybackState} ${readRecent} ${readPravatePl} ${modLibrary}`; 

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=" + scopes;
    window.location.href = url;
}

function handleRedirect() {
    let code = getCode();
    localStorage.setItem('AuthCode', code);
    window.history.pushState("", "", redirect_uri);
    onPageLoad();
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code');
    }
    return code;
}

function connected() {
    btn.classList.add('hide');
    authID.classList.remove('hide');
    spotico.classList.add('hide');
    copyico.classList.remove('hide');
    authID.value = localStorage.getItem('AuthCode');
    eyeico.classList.remove('hide');
    crossico.classList.remove('hide');
}

function disconnect() {
    localStorage.setItem('AuthCode', null);
    btn.classList.remove('hide');
    btn.value = 'Connect to Spotify';
    authID.classList.add('hide');
    spotico.classList.remove('hide');
    copyico.classList.add('hide');
    eyeico.classList.add('hide');
    crossico.classList.add('hide');
}

function copyCode() {
    authID.select();
    authID.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(authID.value);

    var tooltip = document.getElementById('myTooltip');
    tooltip.innerHTML = "Copied";
}

function outFunc() {
    var tooltip = document.getElementById('myTooltip');
    tooltip.innerHTML = "Copy";
}

function showIt() {
    if (authID.type === "password") {
        authID.type = "text";
        eyeico.classList.remove('fa-eye-slash');
        eyeico.classList.add('fa-eye');
    }
    else {
        authID.type = "password";
        eyeico.classList.remove('fa-eye');
        eyeico.classList.add('fa-eye-slash');
    }
}