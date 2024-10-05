import { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, get} from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAD_BvWOuXdHrDPjAw9Zwv3M4t4pWFGhps",
    authDomain: "cs392-tutorial-1ed1d.firebaseapp.com",
    databaseURL: "https://cs392-tutorial-1ed1d-default-rtdb.firebaseio.com",
    projectId: "cs392-tutorial-1ed1d",
    storageBucket: "cs392-tutorial-1ed1d.appspot.com",
    messagingSenderId: "827236214410",
    appId: "1:827236214410:web:d4ce7c6521474c98e1af73"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
  
    useEffect(() => (
      onValue(ref(database, path), (snapshot) => {
       const value = transform ? transform(snapshot.val()) : snapshot.val();
       setData( value );
      }, (error) => {
        setError(error);
      })
    ), [ path ]);
  
    return [ data, error ];
  };
  
  const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
  };
  
  export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
      update(ref(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
    }, [database, path]);
  
    return [updateData, result];
  };