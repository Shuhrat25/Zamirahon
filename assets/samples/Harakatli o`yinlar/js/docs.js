/* Documentation sample */

function loadPage(page) {

	var img = $('<img />');
	img.load(function() {
		var container = $('.sample-docs .p'+page);
		img.css({width: container.width(), height: container.height()});
		img.appendTo($('.sample-docs .p'+page));
		container.find('.loader').remove();
	});

	img.attr('src', 'pages/' +  (page-2) + '.jpg');

}

function addPage(page, book) {

	var id, pages = book.turn('pages');

	var element = $('<div />', {});

	if (book.turn('addPage', element, page)) {
		if (page<224) {
			element.html('<div class="gradient"></div><div class="loader"></div>');
			loadPage(page);
		}
	}
}

function updateTabs() {
	
	var tabs = {7: '  ', 12:'  ', 14:'  ', 16:'  ', 23:'  '},
		left = [],
		right = [],
		book = $('.sample-docs'),
		actualPage = book.turn('page'),
		view = book.turn('view');

	for (var page in tabs) {
		var isHere = $.inArray(parseInt(page, 10), view)!=-1;

		if (page>actualPage && !isHere)
			right.push('<a href="#page/' + page + '">' + tabs[page] + '</a>');
		else if (isHere) {
			
			if (page%2===0)
				left.push('<a href="#page/' + page + '" class="on">' + tabs[page] + '</a>');
			else
				right.push('<a href="#page/' + page + '" class="on">' + tabs[page] + '</a>');
		} else
			left.push('<a href="#page/' + page + '">' + tabs[page] + '</a>');

	}

	$('.sample-docs .tabs .left').html(left.join(''));
	$('.sample-docs .tabs .right').html(right.join(''));

}


function numberOfViews(book) {
	return book.turn('pages') / 2 + 1;
}


function getViewNumber(book, page) {
	return parseInt((page || book.turn('page'))/2 + 1, 10);
}


function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {

	var previewWidth = 115,
		previewHeight = 73,
		previewSrc = 'pics/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
}

const link = document.querySelector('a.link'),
	  pages = document.querySelectorAll('.pages li'),
	  lngBtn = document.querySelectorAll('.languages li'),
	  lngBox = document.querySelectorAll('.languages_menu');

pages.forEach(list => {
	list.addEventListener('click', ()=>{
		pages.forEach(book => {
			book.classList.remove('active');
		})
		list.classList.add('active')
		let listPage = list.dataset.page;

		link.href = `#page/${listPage}`;
		link.click();
	})
})

lngBtn.forEach(btns => {
	btns.addEventListener('click', ()=>{
		lngBtn.forEach(btn => {
			btn.classList.remove('active')
		})
		btns.classList.add('active')
		let btnData = btns.dataset.lng;

		if (btnData == 'uz') {
			link.href = `#page/4`;
			link.click();
		} else {
			link.href = `#page/114`;
			link.click();
		}

		lngBox.forEach(box => {
			let boxData = box.dataset.lng;

			if (btnData == boxData) {
				box.classList.add('active')
			} else{
				box.classList.remove('active')
			}
		})
	})
})

const showHide = document.querySelector('.show_hide'),
	  navbar = document.querySelector('.navbar'),
	  canvas = document.getElementById('canvas'),
	  fullScrBtn = document.querySelector('.fullscrin_btn'),
	  myDocument = document.documentElement;

showHide.addEventListener('click', () => {
	navbar.classList.toggle('active');
	canvas.classList.toggle('active');
})

fullScrBtn.addEventListener('click', ()=>{
	let fullbtn = fullScrBtn.querySelector('i');
	fullbtn.classList.toggle('fa-expand');
	fullbtn.classList.toggle('fa-compress');

	if (fullbtn.classList.contains('fa-compress')) {
		if (myDocument.requestFullscreen) {
			myDocument.requestFullscreen();
		} else if (myDocument.msRequestFullscreen) {
			myDocument.msRequestFullscreen();
		} else  if (myDocument.mozRequestFullscreen) {
			myDocument.mozRequestFullscreen();
		} else if (myDocument.webkitRequestFullscreen) {
			myDocument.webkitRequestFullscreen();
		}
	} else if (fullbtn.classList.contains('fa-expand')) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msexitFullscreen) {
			document.msexitFullscreen();
		} else  if (document.mozexitFullscreen) {
			document.mozexitFullscreen();
		} else if (document.webkitexitFullscreen) {
			document.webkitexitFullscreen();
		}
	}
})