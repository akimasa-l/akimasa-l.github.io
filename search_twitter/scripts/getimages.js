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

function getValuefrominput() {
    return $("input#get").val();
}

function getbearertoken() {
    const bearertoken = "AAAAAAAAAAAAAAAAAAAAAPYJGwEAAAAArCl07yydVXKotnRLXxLVS5W%2Bz1U%3D2BmtCegpSyQbFWhz6Z5JkBBaQ353fCmbdIG8WGwT5Ga0b2fboF";
    return bearertoken;
}


function getMediaObjectFromtweets(tweets) {
    return tweets.includes.media;
}

function setImages(tweets, mediaObject/* :MediaObject */) {
    for (const elem of tweets.data) {
        if (elem.attachments) {
            const media_key = elem.attachments.media_keys[0];
            $("div#preview_images").append(`<p><img class=\"images_twitter\" src=${mediaObject.getUrlFromMedia_key(media_key)} alt=${elem.id}></p>`);
        }
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
                //"tweet.fields":"entities,id,text",
                "bearertoken": getbearertoken(),
            };

            const url = `https://script.google.com/macros/s/AKfycbzrJ3zuUniQAi7fMlbORhOrnnnMCR9MIKwBHpGWpg3F5H3Dh4gfdZv-/exec?` + new URLSearchParams(params);

            fetch(
                url,
                {//init
                    method: 'GET',
                    //mode: "no-cors",
                    //credentials: 'include',
                    /* headers: {
                        "Authorization":`Bearer ${getbearertoken()}`,
                    }, */
                }
            )//end of fetch
                /* .then(response=>response.text())
                    .then(response => {$("div#preview_images").append(`<p>${response/* +getValuefrominput() }</p > `)}); */

                .then(
                    response => response.json()
                )
                .then(
                    tweets => {
                        const mediaObject = new MediaObject(tweets);
                        setImages(tweets, mediaObject)
                    }
                )
        }
    )
});