import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setUncoolFriend(false);
            setLoading(false);
        }, 3000); // Simulate a 3-second delay
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

    const [randomFriend, setRandomFriend] = useState('');
    const [showFriendsInput, setShowFriendsInput] = useState(true);
    const [showUncoolFriend, setUncoolFriend] = useState(true);

    const pickRandomFriend = () => {
        const nonEmptyFriends = friends.filter(friend => friend.trim() !== '');
        if (nonEmptyFriends.length > 0) {
            setShowFriendsInput(false); // Hide the friends input div
            setUncoolFriend(true); // Show the uncool friend div
            loopRandomFriend(nonEmptyFriends.length * 10, nonEmptyFriends);
        }
    };

    function loopRandomFriend(counter, nonEmptyFriends) {
        if (counter === 0) {
            return;
        }
        const randomIndex = Math.floor(Math.random() * nonEmptyFriends.length);
        /* set timeout to show the random friend after 0.5 seconds */
        setRandomFriend(nonEmptyFriends[randomIndex]);
        setTimeout(() => {
            counter--;
            loopRandomFriend(counter, nonEmptyFriends);
        }, 500);
    }

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
            {showFriendsInput && (
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
                                <button 
                                    id="pick-uncool-friend" 
                                    className="btn btn-primary uncool-friend-pick-btn w-100"
                                    onClick={pickRandomFriend}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showUncoolFriend && (
                <div className="row uncool rounded-top text-center">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 uncool-friend-heading">
                                <p>CHOOSING THE UNCOOL FRIEND</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p>the designated guardian angel for the whole group tonight</p>
                            </div>
                        </div>
                        {randomFriend && (
                            <div className="row with-margin">
                                <div className="col-3">&nbsp;</div>
                                <div className="col-6 angel-friend rounded-circle">
                                    {randomFriend}
                                </div>
                                <div className="col-3">&nbsp;</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;