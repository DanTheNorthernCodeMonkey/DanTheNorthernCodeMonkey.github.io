$(function () {

    var reg,
        sub,
        isSubscribed = false,
        $subscribeButton = $('.subscribe'),
        $registerSync = $('.register');
    
    /***** Service Worker Registration ****/

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        }).then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            
            reg = registration;

            setupButtons();

        }).catch(function (err) {
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
                $subscribeButton.textContent = 'Unsubscribe';
                isSubscribed = true;
            });
    }

    function unsubscribe() {
        sub.unsubscribe().then(function (e) {
            $subscribeButton.textContent = 'Subscribe';
            console.log('Unsubscribed!', e);
            isSubscribed = false;
        }).catch(function (error) {
            console.log('Error unsubscribing', error);
            $subscribeButton.textContent = 'Subscribe';
        });
    }

    /***** Background Sync Registration ****/

    function backgroundSync(e) {
        if ($registerSync) {

            e.preventDefault();

            new Promise(function (resolve, reject) {
                Notification.requestPermission(function (result) {
                    if (result !== 'granted') return reject(Error("Denied notification permission"));
                    resolve();
                });

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
        
        if ($subscribeButton.length > 0) {
            $subscribeButton.on('click', function () {
                if (isSubscribed) {
                    unsubscribe();
                } else {
                    subscribe();
                }
            });
        }

        if ($registerSync.length > 0) {
            $registerSync.on('click', function (e) {
                backgroundSync(e);
            });
        }
    }
});
