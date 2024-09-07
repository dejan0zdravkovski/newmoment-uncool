import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a data fetch with a timeout
        setTimeout(() => {
            setMessage();
            setLoading(false);
        }, 3000); // Simulate a 2-second delay
    }, []);

    const [friends, setFriends] = useState(['']);

    const addFriendInput = () => {
        setFriends([...friends, '']);
    };

    const handleFriendChange = (index, event) => {
        const newFriends = [...friends];
        newFriends[index] = event.target.value;
        setFriends(newFriends);
    };

    if (loading) {
        return (
            <div className="loading">
                <img src={process.env.PUBLIC_URL + '/loading.png'} alt="Loading" className="loading-image" />
            </div>
        );
    }

    return (
        <div className="col-12">
            <div className="row header text-center">
                <div className="col-12">
                    <img src={process.env.PUBLIC_URL + '/header.png'} alt="Header" />
                </div>
            </div>
            <div className="row people rounded-top text-center">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <p>Input the names of everyone of the group going out tonight</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12" id="uncool-friend-div">
                            {friends.map((friend, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder={`Friend #${index + 1}`}
                                    className="form-control friend-input"
                                    value={friend}
                                    onChange={(event) => handleFriendChange(index, event)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="row with-margin">
                        <div className="col-12">
                            <button 
                                id="add-uncool-friend" 
                                className="btn btn-primary uncool-friend-add-btn"
                                onClick={addFriendInput}>
                                    + Add friend
                            </button>
                        </div>
                    </div>
                    <div className="row with-margin">
                        <div className="col-12">
                            <button id="pick-uncool-friend" className="btn btn-primary uncool-friend-pick-btn w-100">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;