
(function () {

    var reg;
    var sub;
    var isSubscribed = false;
    var subscribeButton = document.querySelector('.button');
    var registerSync = document.querySelector('.register');


    /***** Service Worker Registration ****/

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        }).then(function (registration) {
            // Registration was successful :)
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            reg = registration;
            setupButtons();
            if (subscribeButton)
                subscribeButton.disabled = false;
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }


    /***** Push Manager registration ****/

    function subscribe() {
        // reg = registration event we captured earlier
        // push manager is the object we need to enable push notifications
        reg.pushManager.subscribe({ userVisibleOnly: true }) // userVisibleOnly = always show
            .then(function (pushSubscription) {
                sub = pushSubscription;
                console.log('Subscribed! Endpoint:', sub.endpoint);
                subscribeButton.textContent = 'Unsubscribe';
                isSubscribed = true;
            });
    }

    function unsubscribe() {
        sub.unsubscribe().then(function (e) {
            subscribeButton.textContent = 'Subscribe';
            console.log('Unsubscribed!', e);
            isSubscribed = false;
        }).catch(function (error) {
            console.log('Error unsubscribing', error);
            subscribeButton.textContent = 'Subscribe';
        });
    }

    /***** Background Sync Registration ****/

    function backgroundSync(e) {
        if (registerSync) {

            e.preventDefault();

            new Promise(function (resolve, reject) {
                Notification.requestPermission(function (result) {
                    if (result !== 'granted') return reject(Error("Denied notification permission"));
                    resolve();
                })

            }).then(function () {
                return navigator.serviceWorker.ready;
            }).then(function (reg) {
                return reg.sync.register('sync');
            }).then(function () {
                console.log('Sync registered');
            }).catch(function (err) {
                console.log('It broke');
                console.log(err.message);
            });
        }
    }

    function setupButtons() {

        subscribeButton = document.querySelector('.button');

        if (subscribeButton !== null) {
            subscribeButton.addEventListener('click', function () {
                if (isSubscribed) {
                    unsubscribe();
                } else {
                    subscribe();
                }
            });
        }

        registerSync = document.querySelector('.register');

        if (registerSync !== null) {
            registerSync.addEventListener('click', function (e) {
                backgroundSync(e);
            });
        }
    }

} ());
