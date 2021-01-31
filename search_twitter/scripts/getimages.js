function getValuefrominput() {
    return $("input#text").val();
}

function getbearertoken() {
    const bearertoken = "AAAAAAAAAAAAAAAAAAAAAPYJGwEAAAAArCl07yydVXKotnRLXxLVS5W%2Bz1U%3D2BmtCegpSyQbFWhz6Z5JkBBaQ353fCmbdIG8WGwT5Ga0b2fboF";
    return bearertoken;
}


function getMediaObjectFromtweets(tweets) {
    return tweets.includes.media;
}

function getUrlFromMediaObjectsAndMedia_key(mediaObject, media_key) {

}

class MediaObject {
    constructor(tweets) {
        this.exampleTweetsIncludeMedia = [
            {
                "media_key": "3_1355701402106875905",
                "type": "photo",
                "url": "https://pbs.twimg.com/media/EtBrPg4UUAEuKMo.jpg"
            },
            {
                "media_key": "3_1355678691167092737",
                "type": "photo",
                "url": "https://pbs.twimg.com/media/EtBWlkCUwAEPM2o.jpg"
            },
            {
                "media_key": "3_1355651105024139267",
                "type": "photo",
                "url": "https://pbs.twimg.com/media/EtA9f1pUYAMWo_G.jpg"
            }
        ];

        this.exampleMediaObject = {
            "3_1355701402106875905": "https://pbs.twimg.com/media/EtBrPg4UUAEuKMo.jpg",
            "3_1355678691167092737": "https://pbs.twimg.com/media/EtBWlkCUwAEPM2o.jpg",
            "3_1355651105024139267": "https://pbs.twimg.com/media/EtA9f1pUYAMWo_G.jpg"
        };

        this.obj = Object.fromEntries(
            /* 
            exampleMediaObjectのように
            media_key:url
            となるようなobjectを
            exampleTweetsIncludeMediaのようなものから作る
            作る関数です。
            */
            tweets.includes.media.map(
                media => [
                    media.media_key, media.url
                ]
            )
        );
    }
    getUrlFromMedia_key(media_key) {
        return this.obj[media_key];
    }
}

$(function () {
    $("#send").on(
        "click",//when send button is clicked
        //() => $("div#preview_images").append("<p>as</p>")
        () => {
            const params =
            {
                "media.fields": "preview_image_url,url",
                "max_results": 10,
                "query": `${getValuefrominput()} has:images`,
                "expansions": "attachments.media_keys",
                //"tweet.fields":"entities,id,text"
            };

            const url = `https://api.twitter.com/2/tweets/search/recent?`+new URLSearchParams(params);

            fetch(
                url,
                {//init
                    method: 'GET',
                    headers: {
                        "Authorization":`Bearer ${getbearertoken()}`,
                    },
                }
            )//end of fetch
                .then(responce => {$("div#preview_images").append(`<p>${responce.text()}</p>`)});
            /* 
                .then(
                    response => response.json()
                )
                .then(
                    tweets => {
                        const mediaObject = new MediaObject(tweets);
                        $("div#preview_images").append("<p>as</p>")
                    }
                ) */
        }
    )
});