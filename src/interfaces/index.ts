
enum service {
    auth = 'rhime/auth',
    feed = 'rhime/feed',
    notification = 'rhime/notification',
    post = 'rhime/post',
    comment = 'rhime/comment',
    recommendation = 'rhime/recommendation',
    spotify = 'rhime/spotify',
    user = 'rhime/user',
    userGraph = 'rhime/userGraph',
    like = 'rhime/like',
    likeCount = 'rhime/likeCount',
    userGraphView = 'userGraphView'
}

interface options {
    ttl?: number
}


interface config {
    url: string
}

export {config, options, service}