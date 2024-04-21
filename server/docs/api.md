# APIs

## RESTful API

    POST /api/v1/data/statistic
        ...
        comment: get the statistic data by filtering conditions

    POST /api/v1/user/check
        ...
        comment: check the user status from cache

    POST /api/v1/user/register
        ...
        comment: register for new users

    POST /api/v1/user/login
        ...
        comment: sign in

    ...

## WebSocket

    ws://host:port/dataProbe
    comment: determine if some new records inserted into the system. true means inserted. If true, front-end page should refresh in real-time.

/// todo
