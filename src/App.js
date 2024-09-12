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
    const [isSending, setIsSending] = useState(false);

    const pickRandomFriend = () => {
        const nonEmptyFriends = friends.filter(friend => friend.trim() !== '');
        if (nonEmptyFriends.length > 0) {
            setShowFriendsInput(false); // Hide the friends input div
            setUncoolFriend(true); // Show the uncool friend div
            loopRandomFriend(nonEmptyFriends.length * 10, nonEmptyFriends, 10);
        }
    };

    function loopRandomFriend(counter, nonEmptyFriends, timeout) {
        if (counter === 0) {
            setUncoolFriend(false); // Hide the uncool friend div
            setAngelFriend(true); // Show the angel friend div
            return;
        }
        const randomIndex = Math.floor(Math.random() * nonEmptyFriends.length);
        /* set timeout to show the random friend starting at 100 ms and increasing by 10 */
        setRandomFriend(nonEmptyFriends[randomIndex]);
        setTimeout(() => {
            counter--;
            timeout += 5;
            loopRandomFriend(counter, nonEmptyFriends, timeout);
        }, timeout);
    }

    const getPrize = () => {
        setAngelFriend(false);
        setPrize(true);
    }

    const sendEmailAddress = () => {
        let email = document.getElementById('email-value').value;
        let azureFunctionUrl = 'https://newmoment-buildcustomersdatabase-test.azurewebsites.net/api/CollectEmailsIsolated?code=GK9maLTw7qnyV23U1PIvWPfRbuAzVuxylH34iDhRNd5-AzFu2Ri7JQ%3D%3D'; // Replace with your Azure Function URL
        let body = JSON.stringify({ email: email });

        setIsSending(true); // Disable the button while sending the email address

        fetch(azureFunctionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
            mode: 'no-cors' // Set the mode to 'no-cors'
        })
        .then(response => {
            console.log(response);
            window.location.reload(false);
        })
        .catch((error) => {
            console.error(error);
            window.location.reload(false);
        });
    }
    
    if (loading) {
        return (
            <div className="loading">
                <img src={process.env.PUBLIC_URL + '/images/loading.webp'} alt="Loading" />
            </div>
        );
    }

    return (
        <div>
            <div className="row header text-center">
                <div className="col-12">
                    <img src={process.env.PUBLIC_URL + '/images/header.webp'} alt="Header" />
                </div>
            </div>
            {showFriendsInput && (
                <div className="row people rounded-top text-center">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-1">&nbsp;</div>
                            <div className="col-10">
                                <p>Vendosni emrat e secilit nga grupi tuaj që do të dalë sonte</p>
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
                                        placeholder={`Shoku #${index + 1}`}
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
                                        + Shto shok
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
                                    Përfundo
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
                                <p>Duke perzgjedhur UncoolFriend</p>
                            </div>
                            <div className="col-1">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-1">&nbsp;</div>
                            <div className="col-10">
                                <p>Engjëlli mbrojtës i caktuar për të gjithë grupin sonte:</p>
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
                                <p className="no-margin">URIME</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-2">
                                <p>{randomFriend}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-3">
                                <p className="no-margin">është</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-4">
                                <p className="no-margin">#UncoolFriend</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-3">
                                <p className="no-margin">dhe engjëlli juaj mbrojtës për sonte!</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 angel-friend-heading-5">
                                <p className="with-margin">Udhëtoni me kujdes, vendosni rripin e sigurimit dhe mos i jepni makinës me shpejtësi te lartë.<br />Mos u perpiqni të bini në sy duke rrezikuar veten dhe të tjerët.</p>
                            </div>
                        </div>
                        <div className="row no-margin">
                            <div className="col-6">
                                <p className="stay-btn w-100">
                                    #StayUncool
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="stay-btn w-100">
                                    #StaySafe
                                </p>
                            </div>
                        </div>
                        <div className="row no-margin">
                            <div className="col-12">
                                <button 
                                    id="get-prize" 
                                    className="btn btn-primary get-prize-btn w-100"
                                    onClick={getPrize}
                                >
                                    Merrni dhuratën tuaj #Uncool falas
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
                                <p>Vendos adresen e email-it për të tërhequr dhuratën t-shirt nga koleksioni i ri #Uncool prodhuar nga marka Zero Nero.
</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12" id="uncool-friend-div">
                                <input type="email" id="email-value" placeholder="name@emailaddress.com" className="form-control email-input" />
                            </div>
                        </div>
                        <div className="row with-margin">
                            <div className="col-12">
                                <button 
                                    id="send" 
                                    className="btn btn-primary send-btn"
                                    onClick={sendEmailAddress}
                                    disabled={isSending}
                                >
                                    {isSending ? (
                                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        'Dërgo'
                                    )}
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