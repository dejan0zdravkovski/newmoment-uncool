import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setUncoolFriend(false);
            setAngelFriend(false);
            setPrize(false);
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
    const [showAngelFriend, setAngelFriend] = useState(true);
    const [showPrize, setPrize] = useState(true);

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
            setUncoolFriend(false); // Hide the uncool friend div
            setAngelFriend(true); // Show the angel friend div
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

    const getPrize = () => {
        setAngelFriend(false);
        setPrize(true);
    }

    const sendEmailAddress = () => {
        //send it to Azure Function

        window.location.reload(false);
    }

    if (loading) {
        return (
            <div className="loading">
                <img src={process.env.PUBLIC_URL + '/images/loading.png'} alt="Loading" className="loading-image" />
            </div>
        );
    }

    return (
        <div className="col-12">
            <div className="row header text-center">
                <div className="col-12">
                    <img src={process.env.PUBLIC_URL + '/images/header.png'} alt="Header" />
                </div>
            </div>
            {showFriendsInput && (
                <div className="row people rounded-top text-center">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-1">&nbsp;</div>
                            <div className="col-10">
                                <p>Input the names of everyone of<br />the group going out tonight</p>
                            </div>
                            <div className="col-1">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-1">&nbsp;</div>
                            <div className="col-10" id="uncool-friend-div">
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
                            <div className="col-1">&nbsp;</div>
                        </div>
                        <div className="row with-margin">
                            <div className="col-1">&nbsp;</div>
                            <div className="col-10">
                                <button 
                                    id="add-uncool-friend" 
                                    className="btn btn-primary uncool-friend-add-btn"
                                    onClick={addFriendInput}>
                                        + Add friend
                                </button>
                            </div>
                            <div className="col-1">&nbsp;</div>
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
                            <div className="col-1">&nbsp;</div>
                            <div className="col-10 uncool-friend-heading">
                                <p>CHOOSING <br />THE UNCOOL FRIEND</p>
                            </div>
                            <div className="col-1">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-1">&nbsp;</div>
                            <div className="col-10">
                                <p>the designated guardian angel<br />for the whole group tonight:</p>
                            </div>
                            <div className="col-1">&nbsp;</div>
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
            {showAngelFriend && (
                <div className="row angel rounded-top text-center">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 angel-friend-heading-1">
                                <p className="with-margin">Congratulations</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-2">
                                <p>{randomFriend}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-3">
                                <p className="no-margin">THE</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-4">
                                <p className="no-margin">UNCOOLFRIEND</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-3">
                                <p className="no-margin">FOR TONIGHT!</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-5">
                                <p className="with-margin">Drive safe, do not drink and drive,<br />and don't try to impress anyone<br />with dangerous driving</p>
                            </div>
                        </div>
                        <div className="row with-margin">
                            <div className="col-12">
                                <button 
                                    id="get-prize" 
                                    className="btn btn-primary get-prize-btn w-100"
                                    onClick={getPrize}
                                >
                                    Get your free #Uncool gift
                                </button>
                            </div>
                        </div>
                        <div className="row with-margin">
                            <div className="col-6">
                                <button className="btn btn-primary stay-btn w-100">
                                    #StayUncool
                                </button>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-primary stay-btn w-100">
                                    #StaySafe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showPrize && (
                <div className="row prize rounded-top text-center">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 send-email-heading">
                                <p>Send your email address to receive<br />a hoodie created by ZeroNero<br />of their new #Uncool Collection</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12" id="uncool-friend-div">
                                <input type="text" placeholder="name@emailaddress.com" className="form-control email-input" />
                            </div>
                        </div>
                        <div className="row with-margin">
                            <div className="col-12">
                                <button 
                                    id="send" 
                                    className="btn btn-primary send-btn"
                                    onClick={sendEmailAddress}
                                >
                                    SEND
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;