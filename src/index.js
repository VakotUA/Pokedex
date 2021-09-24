import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './Components/cards.js';
import './Styles/cards.css';
import './Styles/header.css';

function useForceUpdate(){
	const [value, setValue] = useState(0);
	if (value === 0) {}
		return () => setValue(value => value + 1);
}

function App() {
	// принудительное обновление состояния компонентов страницы
	const forceUpdate = useForceUpdate();

	// номер текущей страницы
	const [page, setPage] = useState(1);
	const maxPage = () => {
		return Math.ceil(localStorage.length / pagination);
	}

	// поле ввода поиска
	const [search, setSearch] = useState('');

	// пагинация (10/20/50)
	const [pagination, setPagination] = useState(10);

	// загрузка всех возможных тэгов
	const [tags, setTags] = useState([]);
	const loadTags = () => {
		let xml = new XMLHttpRequest();
		xml.open("GET", 'https://pokeapi.co/api/v2/type/', false);
		xml.send(null);

		let allTags = [];
		let tagsAPI = JSON.parse(xml.responseText).results;

		for (let i = 0; i < tagsAPI.length; i++) {
			allTags.push(tagsAPI[i].name);
		}
		setTags(allTags);
	}

	// загрузка всех возможных покемонов (1118шт)
	const [pokemons, setPokemons] = useState([]);
	const loadPokemons = () => {
		let xml = new XMLHttpRequest();

		xml.open("GET", 'https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0', false);
		xml.send(null);

		let allPokemons = [];
		let pokemonsAPI = JSON.parse(xml.responseText).results;

		for (let i = 0; i < pokemonsAPI.length; i++) {
			allPokemons.push(pokemonsAPI[i]);
		}
		setPokemons(allPokemons)
	}

	const [storage, setStorage] = useState([]);

	// добавление/удаление тегов для поиска
	const toggleTags = (tag) => {
		let str = storage;
		for (let i = 0; i < str.length; i++) {
			if (str[i] === tag) {
				str.splice(i, 1);
				return;
			}
		}
		str.push(tag);
		setStorage(str);
	}

	// визуализация добавления/удаления тегов для поиска
	const isActive = (tag) => {
		let active = false;
		storage.forEach(str => {
			if (str === tag) {
				active = true;
			}
		});
		return active;
	}

	const paginationChange = (newPagination) => {
		let count = Math.ceil(page * pagination / newPagination);
		setPage(count > maxPage ? maxPage : (count < 1 ? 1 : count));
		setPagination(newPagination);
	}

	// localStorage.clear();
	// sessionStorage.clear();

	useEffect(() => {
		localStorage.clear();
		sessionStorage.clear();
		loadPokemons()
		loadTags()
	}, [])

	return (
		<div id="background">
			<div id="navigation-bar">
				<div id="title">Pokedex by Vakot</div>
				<div id="search-block">
					<button id="search-button" onClick={() => {
						sessionStorage.clear();
						localStorage.clear();
						setPage(1);
						var e = document.getElementById("search");
						setSearch(e.value);
						e.value = "";
					}}></button>
					<input id="search" type="text" placeholder="Search..."></input>
				</div>
			</div>
			<div id="pages">
				<button className="page-button s1 prv"
					onClick={() => setPage(page-1 < 1 ? 1 : page-1)}>
					<img className="page-img previous" alt=""/>
				</button>
				<button className="page-button s2 str"
					onClick={() => setPage(1)}>
				</button>
				<button className="page-button s3">{page}</button>
				<button className="page-button s2 end"
					onClick={() => setPage(maxPage())}>
				</button>
				<button className="page-button s1 nxt"
					onClick={() => setPage(page+1 > maxPage() ? maxPage() : page+1)}>
				</button>
			</div>
			<div id="pagination-buttons">
				<button className="pagination-button" onClick={()=>paginationChange(10)}>10</button>
				<button className="pagination-button" onClick={()=>paginationChange(20)}>20</button>
				<button className="pagination-button" onClick={()=>paginationChange(50)}>50</button>
			</div>

			<div className="container">
				<Cards pagination={pagination} page={page} pokemons={pokemons} search={search}/>
			</div>

			<ul id="tags-list" onClick={forceUpdate}>
				{tags.map(tag => 
					<li
						className={"tag-button " + (isActive(tag) ? "active " : " ") + tag}
						key={tag}
						onClick={() => toggleTags(tag)}
					>
						{tag}
					</li>
				)}
				<li id="clear" className="tag-button active" onClick={() => {
					sessionStorage.clear();
					localStorage.clear();
					setStorage([]);
				}}></li>
				<li id="search-by-tag" className="tag-button active" onClick={() => {
					localStorage.clear();
					sessionStorage.clear();
					setSearch('');
					storage.forEach(str => {
						sessionStorage.setItem(sessionStorage.length, JSON.stringify(str));
					});
				}}></li>
			</ul>
		</div>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);