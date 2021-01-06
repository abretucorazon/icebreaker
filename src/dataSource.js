//import firebase from 'firebase/app';
//import "firebase/firestore";

let db = window.firebase.firestore();

export async function listGames() {
    let docQS = await db.collection('games').get();
    if (!docQS.empty) {
        let docs = docQS.docs;
        docs.forEach((doc) => {
            let data = doc.data();
            console.log(data);
        });
    }
    else {
        alert("No document found");
    }
}

