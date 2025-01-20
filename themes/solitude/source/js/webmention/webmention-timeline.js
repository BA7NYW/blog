function webmention() {
    const webmentionsPromise = window.webmentionContext.webmentionsPromise;
    var html = '';
    html +=`<div>`
    html +=`<p>` + GLOBAL_CONFIG.lang.webmention.title + `</p></br>`
    html +=`<form action="` + webmentionEndpoint + `" class="form-webmention" method="post" target="_blank"><input type="url" name="source" id="form-webmention-source" placeholder="` + GLOBAL_CONFIG.lang.webmention.placeholder + `" required=""> <input type="hidden" name="target" value="${window.location.href}"> <input type="submit" value="Send Webmention" class="form-webmention-btn"></form></br>`
    html +=`</div>`
    webmentionsPromise && webmentionsPromise
        .then(function (data) {
            
            const distinctMentions = [
                ...new Map(data.children.map((item) => [item.author.url, item])).values()].sort((a, b) => new Date(a['wm-received']) - new Date(b['wm-received']));

            html += `<div><p>`;

            if (distinctMentions.length > 0) {
                html += GLOBAL_CONFIG.lang.webmention.likes + `</p>`;
            }
            html += `<div className="webmention-avatars">`;
            distinctMentions.forEach(function (reply) {
                html += `<a class="avatar-wrapper" href=${reply.author.url} key=${reply.author.name}><image class="wm-avatar" loading="lazy" src=${reply.author.photo != "" ? reply.author.photo: "/img/avatar.png"} data-nimg="fill" sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"/></a>`;
            });
            html += `</div>`;

            const replies = distinctMentions.filter(
                (mention) => ('in-reply-to' in mention || 'mention-of' in mention)&& 'content' in mention
            );
            if (replies && replies.length) {
                html +=  `<div class="webmention-replies">`;
                html += `</br><h3>` + GLOBAL_CONFIG.lang.webmention.comment + `</h3>`;
                html += `<ul class="replies">`;
                replies.forEach(function (reply){
                    html += `<li class="reply" key=${reply["wm-id"]}>`;
                    html += `<div>`;
                    html += `<a class="avatar-wrapper" href=${reply.author.url} key=${reply.author.name}><image class="wm-avatar" loading="lazy" src=${reply.author.photo != "" ? reply.author.photo: "/img/avatar.png"} alt=${reply.author.name} data-nimg="fill" sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"/></a>`;
                    html += `</div>`;
                    html += `<div class="text">`;
                    html += `<p class="reply-author-name"><a href=${reply.url} target="_blank">${reply.author.name}</a></p>`;
                    html += `<p class="reply-content">${reply.content.text.slice(0, 200)}</p>`;
                    html += `</div>`;
                    html += `</li>`;

                });
                html += `</ul>`;
                html += `</div>`;
            }
        })
        .catch(function (ex) {
            console.error('fetch webmention error' + ex);
        });
    document.querySelector('div.webmention-timeline').innerHTML = html;
}
window.WebMentionLoad = function () {
	if (document.querySelector('.webmention-timeline')) webmention();
};
window.addEventListener("load", WebMentionLoad)
document.addEventListener("pjax:complete", WebMentionLoad)