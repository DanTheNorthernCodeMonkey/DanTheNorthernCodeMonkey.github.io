
(function () {

    var reg;
    var sub;
    var isSubscribed = false;
    var subscribeButton = document.querySelector('.button');
    var registerSync = document.querySelector('.register');

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        }).then(function (registration) {
            // Registration was successful :)
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            reg = registration;
            subscribeButton.disabled = false;
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }

    if (!subscribeButton)
        return;

    subscribeButton.addEventListener('click', function () {
        if (isSubscribed) {
            unsubscribe();
        } else {
            subscribe();
        }
    });

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
        sub.unsubscribe().then(function (event) {
            subscribeButton.textContent = 'Subscribe';
            console.log('Unsubscribed!', event);
            isSubscribed = false;
        }).catch(function (error) {
            console.log('Error unsubscribing', error);
            subscribeButton.textContent = 'Subscribe';
        });
    }

    if (!registerSync)
        return;

    document.querySelector('.register').addEventListener('click', function(event) {
      event.preventDefault();

      new Promise(function(resolve, reject) {
        Notification.requestPermission(function(result) {
          if (result !== 'granted') return reject(Error("Denied notification permission"));
          resolve();
        })
      }).then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(reg) {
        return reg.sync.register('syncTest');
      }).then(function() {
        log('Sync registered');
      }).catch(function(err) {
        log('It broke');
        log(err.message);
      });
    });

} ());
