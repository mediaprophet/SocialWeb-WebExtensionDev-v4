const auth = solid.auth;
const rdf = $rdf;
const store = rdf.graph();
const fetcher = new rdf.Fetcher(store);

const FOAF = rdf.Namespace('http://xmlns.com/foaf/0.1/');
let currentSession = null;
let profileDocumentURI = null;

document.getElementById('loginButton').addEventListener('click', () => {
    auth.popupLogin({ popupUri: 'popup.html' }).then(fetchProfile);
});

document.getElementById('profileForm').addEventListener('submit', (event) => {
    event.preventDefault();
    saveProfile();
});

function fetchProfile() {
    auth.currentSession().then((session) => {
        if (!session) {
            console.log('The user is not logged in');
            return;
        }

        currentSession = session;
        console.log(`Logged in as ${session.webId}`);
        profileDocumentURI = session.webId.split('#')[0];
        loadProfile();
    });
}

function loadProfile() {
    fetcher.load(profileDocumentURI).then(() => {
        const name = store.any(rdf.sym(currentSession.webId), FOAF('name'));
        const email = store.any(rdf.sym(currentSession.webId), FOAF('mbox'));

        document.getElementById('name').value = name ? name.value : '';
        document.getElementById('email').value = email ? email.value.replace('mailto:', '') : '';
        document.getElementById('profileForm').style.display = 'block';
    });
}

function saveProfile() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const del = [];
    const ins = [];

    const profile = rdf.sym(currentSession.webId);
    const nameStatement = store.anyStatementMatching(profile, FOAF('name'));
    if (nameStatement) {
        del.push(nameStatement);
    }
    ins.push(rdf.st(profile, FOAF('name'), rdf.lit(name), rdf.sym(profileDocumentURI)));

    const emailStatement = store.anyStatementMatching(profile, FOAF('mbox'));
    if (emailStatement) {
        del.push(emailStatement);
    }
    ins.push(rdf.st(profile, FOAF('mbox'), rdf.sym(`mailto:${email}`), rdf.sym(profileDocumentURI)));

    store.updater.update(del, ins, (uri, ok, message) => {
        if (ok) {
            console.log('Profile updated successfully.');
        } else {
            console.error(`Update failed: ${message}`);
        }
    });
}
