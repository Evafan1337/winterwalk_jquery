// Проверка наличия jQuery
// javascript:(function(){var msg;if (window.jQuery) {msg = 'You are running jQuery version: ' + jQuery.fn.jquery;} else {msg = 'jQuery is not installed';}alert(msg);})();;

const pageInfo = [
	{
		id: 1,
		slideTextPrev: `Тенистый лес захватывает своей мрачностью. Лишь в местах куда могуть попасть солнечные лучи можно наблюдать красивый перелив свежевыпавшего снега, который на свету кажется чистым золотом.`,
		slideTextMain: `Глаз не может уловить детали: какие объекты находятся далеко, а какие близко. Фотоаппарат справляется с этим еще хуже. Стоящая перед взором картина напоминает полотно художника авантюриста, который решил поэксперементировать с формами и цветами.`,
		photoTitle: `Солнце пробивается через ветки`,
		photoFile: `DSC_0161.JPG`
	},
	{
		id: 2,
		slideTextPrev: `Лучи зимнего солнца пробиваются через густой сосновый бор. Блики словно пульсар остаются в глазах простака, решившего присмотреться к нему.`,
		slideTextMain: `Проходя через таких великанов невольно ощущаешь себя ребенком в окружении взрослых. Могучие деревья своими кронами скрывают чистое солнечное небо.`,
		photoTitle: `Солнце пробивается через ветки`,
		photoFile: `hRWWvBw2yTQ.jpg`
	},
	{
		id: 3,
		slideTextPrev: `Солнце зимой по-особенному яркое за счет белоснежных сугробов, которых в лесу не занимать. Только истиный/настоящий любитель/ценитель здешних лесов знает тайные тропки и красивые виды.`,
		slideTextMain: `Глаз не может уловить детали: какие объекты находятся далеко, а какие близко. Фотоаппарат справляется с этим еще хуже. Стоящая перед взором картина напоминает полотно художника авантюриста, который решил поэксперементировать с формами и цветами.`,
		photoTitle: `Солнце пробивается через ветки`,
		photoFile: `IPlVo0KvNKY.jpg`
	}
]

/**
  * Шаблон страницы превью
  */
const createPreview = () => {
	return $(`<section class="preview">
				<div class="preview__inner container blur-elem">
					<h2 class="preview__header">Онлайн-галерея: "Любительские фотокарточки"</h2>
					<span class="preview__text">
						Прогуляйтесь по зимнему лесу в морозный будний день. Насладитесь пением ветра и хрустом снега под ногами.
					</span>
					<!-- <a href="slide-example-show-text.html" class="preview__button">Начать просмотр</a> -->
					<button class="preview__button">Начать просмотр</button>
				</div>
			</section>`)
}

/**
  * Шаблон слайда
  * @param {array} data
  */
const createSlideTemplate = (data, pageInfoLength) => {
	return $(`<section class="slide-${data[`id`]} controls">
				<div class="controls__left"></div>
				<div class="controls__right"></div>
				<div class="slide__inner  container">
					<div class="slide__text-info blur-elem">
						<p class="slide__text">${data[`slideTextPrev`]}</p>

						<p class="slide__text slide__text--part2">${data[`slideTextMain`]}</p>
					</div>

					<div class="slide__bottom-info blur-elem">
						<h2 class="slide__header">Фото №${data[`id`]}. "${data[`photoTitle`]}"</h2>
						<ul class="slide__controls">
							<li class="slide__controls-elem slide__controls-elem--back">Назад</li>
							<li class="slide__controls-elem slide__controls-elem--read">Скрыть/Показать интерфейс</li>
							${checkForLastSlide(data[`id`], pageInfoLength)}
						</ul>
					</div>
				</div>
			</section>`);
}

/**
  * Проверка на последний слайд в шаблоне
  * @param {number} slideId - номер слайда для отрисовки
  * @param {number} slideArrayLegth - длина массива со слайдами
  * Если длина массива равна с номером текущего ( на очереди последний слайд)
  * то возвращаем элемент "В начало", иначе "Вперед"
  */
const checkForLastSlide = (slideId, slideArrayLegth) => {
	if(slideId == slideArrayLegth){
		return `<li class="slide__controls-elem slide__controls-elem--right">В начало</li>`;
	}else {
		return `<li class="slide__controls-elem slide__controls-elem--right">Вперед</li>`
	}
}

/**
  *	Создается элемент слайда.
  * @param {number} slideId - номер слайда для отрисовки
  * Если id слайда не равен -1 и id слайда не равен количеству всех слайдов
  * То отображается слайд идущий по порядку
  * Иначе отображается слайд превью ( начальный )
  */
const createSlideElement = (slideId) => {
	if(slideId !== -1 && slideId !== pageInfo.length){
		const elem = createSlideTemplate(pageInfo[slideId], pageInfo.length).hide();
		$(`.entry-point`).append(elem);
		elem.show(1500);
		setClickHandlers();
	} else {
		const elem = createPreview().hide();
		$(`.entry-point`).append(elem);
		elem.show(1500);
		currentPage = -1;
		setPreviewButtonHandler();
	}
}

/**
  *	Устанавливается обработчик для кнопки "Начать просмотр"
  */
const setPreviewButtonHandler = () => {
	$(`.preview__button`).click(function(evt){
		$(`.entry-point`).children().remove(1000);
		currentPage = currentPage + 1;
		createSlideElement(currentPage);
		setClickHandlers();
	});
}

/**
  *	Устанавливаются обработчики для кнопок слайда
  */
const setClickHandlers = () => {
	const nextSlideHandler = () => {
		currentPage = currentPage + 1;
		$(`.entry-point`).children().remove(1000);
		createSlideElement(currentPage, pageInfo.length);
	}

	const backSlideHandler = () => {
		currentPage = currentPage - 1;
		if(currentPage == -2){
			currentPage = -1;
		}

		$(`.entry-point`).children().remove(1000);
		createSlideElement(currentPage, pageInfo.length);
	}

	$(`.slide__controls-elem--back`).off();
	$(`.slide__controls-elem--read`).off();
	$(`.slide__controls-elem--hide`).off();
	$(`.slide__controls-elem--right`).off();
	$(`.controls__left`).off();
	$(`.controls__right`).off();

	$(`.slide__controls-elem--back`).click(function(evt){
		backSlideHandler();
	});

	$(`.controls__left`).click(function(evt){
		backSlideHandler();
	});

	$(`.slide__controls-elem--read`).click(function(evt){
		$(`.slide__text-info`).toggle(300);
	});

	$(`.slide__controls-elem--hide`).click(function(evt){
		$(`.slide__text-info`).hide();
	});

	$(`.slide__controls-elem--right`).click(function(evt){
		nextSlideHandler();
	});

	$(`.controls__right`).click(function(evt){
		nextSlideHandler();
	});
}


//	Создается элемент и скрывается
let previewElem = createPreview().hide();
//	Добавляется к селектору .entry-point
$(`.entry-point`).append(previewElem);
//	Показ с анимацией 500мс
previewElem.show(500);

let currentPage = -1;
setPreviewButtonHandler();
