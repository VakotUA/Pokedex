import React from 'react';

function Cards(props) {
	const pagination = props.pagination;
	const page = props.page;
	const pokemons = props.pokemons;
	const search = props.search;

	//получаем карточки на вывод
	const getCards = (search) => {
		let tags = [];
		let result = [];
		let counter;

		// фильтр по имени
		if (search !== '') {
			for (let i = 0; i < pokemons.length; i++) {
				if (pokemons[i].name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
					result.push(pokemons[i]);
				}
			}
		}

		// вывод покемонов из прошлых поисков
		else if (localStorage.length > 0) {
			let keys = Object.keys(localStorage);
			for(let i in keys) {
				result.push(JSON.parse(localStorage.getItem(i)));
			}
		}

		// фильтр по тегу
		else if (sessionStorage.length > 0) {
			let keys = Object.keys(sessionStorage);
			for(let i in keys) {
				tags[i] = JSON.parse(sessionStorage.getItem(i));
			}
			if (tags.length <= 2) {
				pokemons.forEach(pokemon => {
					let pokeTags = getTags(pokemon);
					if (tags.every(item => pokeTags.includes(item))) {
						result.push(pokemon);
					}
				});
			}
		}

		// вывод всех покемонов (если нет фильтров)
		else {
			result = pokemons;
		}

		// сохранение результатов в localStorage (для быстрого перехода между страницами)
		if (localStorage.length === 0) {
			result.forEach(item => {
				localStorage.setItem(localStorage.length, JSON.stringify(item));
			});
		}

		return result.slice((page-1)*pagination, page*pagination);
	}

	//получаем тэги для нужного покемона
	const getTags = (pokemon) => {
		let xml = new XMLHttpRequest();
		xml.open("GET", pokemon.url, false);
		xml.send(null);

		let url = JSON.parse(xml.responseText);

		let tagsStr = url.types.map((tag) => {return tag.type.name});
		return tagsStr;
	}

	// получаем изображение нужного покемона
	const getImage = (pokemon) => {
		let xml = new XMLHttpRequest();
		xml.open("GET", pokemon.url, false);
		xml.send(null);

		let url = JSON.parse(xml.responseText);

		return (<img src={url.sprites.front_default} className="pokemon-image" alt=""></img>)
	}

	const cards = getCards(search);

	//вывод полученых карточек одной страницы
	if (cards.length === 0) {
		return <h1>Not found</h1>;
	}
	return (
		<ul id="card-field">{cards.map(card => (
			<li className="card" key={card.name} >
				<h5>{card.name}</h5>
				{getImage(card)}
				<div className="pokemon-tags">
					<p className="pokemon-tag">Type:</p>
					{getTags(card).map((tag) => {
						return <span className={"pokemon-tag " + tag} key={tag}>{tag}</span>
					})}
				</div>
			</li>
		))}</ul>
	)
}

export default Cards;