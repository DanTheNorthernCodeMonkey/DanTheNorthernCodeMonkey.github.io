
(function () {
    var self = this;

    var appShellCacheName = 'appShell',
        dataCacheName = 'dataCache',
        appShellFiles = [
            // CDNd files, this is fucking horrible, cloudflare CDNs my shit anyway.
            // TODO: Make a gulp build script to consolidate all CSS into one file and all js into one file.
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
            'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
            '/css/rrssb.css',
            'grayscale.scss',
            'timeline.scss',
            //'/offline/index.html',
            '/'
        ];
     

    self.addEventListener('install', function(event) {
        console.log('Started', self);

        // Older service workers will cause this one to "wait". This skips the waiting stage.
        self.skipWaiting();

        console.log('Installed', event);

        function onInstall () {
            return caches.open('appShell')
                .then(function (cache) {
                    cache.addAll(appShellFiles);
                });
        }

        event.waitUntil(onInstall(event));
    });
    
    self.addEventListener('activate', function(event) {
        console.log('Activated', event);
    });
}());
