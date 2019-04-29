'use strict';

(function() {
	const data = new Date(Date.parse('2017-03-06T10:40:00-07:00'));
	const hours = data.getHours();
	const minutes = data.getMinutes();
	
	return `${hours}:${minutes}`
})()

(function() {
	const data = new Date(Date.parse('2017-03-06T11:40:00-07:00'));
	const hours = data.getHours();
	const minutes = data.getMinutes();
	
	return `${hours}:${minutes}`
})()

/*data.toDateString()*/



/*article.detail.js (line #157)*/
/*
<span class="entry-meta__time" data-hook="meta-time" data-edition="${page.edition}" data-date="<fmt:formatDate value="${item.publishedDate}" type="both"  dateStyle="short" timeStyle="short" />" data-shortdate="<fmt:formatDate value="${item.publishedDate}" pattern="yyyy-MM-dd"/>"></span>
*/