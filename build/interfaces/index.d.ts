declare enum service {
    auth = "rhime/auth",
    client = "rhime/client",
    feed = "rhime/feed",
    notification = "rhime/notification",
    post = "rhime/post",
    recommendation = "rhime/recommendation",
    spotify = "rhime/spotify",
    user = "rhime/user",
    userGraph = "rhime/userGraph",
    userGraphView = "userGraphView"
}
interface options {
    ttl?: number;
}
interface config {
    serviceName: service;
    url: string;
    endpoint: string;
}
export { config, options, service };
