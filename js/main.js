const pokemonName = document.querySelector('.name__data');
const pokemonID = document.querySelector('.number__data');
const pokemonImage = document.querySelector('.img__pokemon');

const form = document.querySelector('.formulario');
const input = document.querySelector('.input__search');

const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const btnSubmit = document.querySelector('.btn-submit');

const tipagens = document.querySelectorAll('.tipo');

let pokemonAtual = 1;

const listaTipos = [
    "fire",
    "water",
    "grass",
    'poison',
    'flying',
    'bug',
    'normal',
    'electric',
    'rock',
    'ground',
    'fairy',
    'fighting',
    'steel',
    'ice',
    'ghost',
    'psychic',
    'dragon',
    'dark'
]


const buscaPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}


const renderizaPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonID.innerHTML = '';

    const data = await buscaPokemon(pokemon);

    if (data) {

        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonID.innerHTML = data.id;
    
        if (data.id >= 650 && data.id <= 721) {
            pokemonImage.src = data['sprites']['versions']['generation-vi']['omegaruby-alphasapphire']['front_default']; 
        } else {
            if (data.id >= 722) {
                pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
            } else {
                pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            }
        }

        pokemonAtual = data.id;

        tipagens.forEach((boxType, i) => {

            let sourceType = data['types'][i]['type']['name'];

            const [, spanTipoSecundario] = tipagens;
            const verificaClassSecundaria = boxType.classList[1];

            boxType.innerHTML = '';
            boxType.innerHTML = sourceType;

            if(i === 0) {
                spanTipoSecundario.classList.add('hide');
            } else {
                spanTipoSecundario.classList.remove('hide');
            }

            listaTipos.forEach(tipagem => {
                if (sourceType === tipagem) {
                    boxType.classList.remove(verificaClassSecundaria);
                    boxType.classList.add(tipagem);
                }
            })
        })
        
    } else {
        pokemonName.innerHTML = 'not found :(';
        pokemonID.innerHTML = '';
        pokemonImage.style.display = 'none';

        tipagens.forEach((boxType) => {
            boxType.innerHTML = '';
            const verificaClassSecundaria = boxType.classList[1];
            boxType.classList.remove(verificaClassSecundaria);
        })
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderizaPokemon(input.value.toLowerCase());
    input.value = '';
})

btnPrev.addEventListener("click", () => {
    if(pokemonAtual > 1) {
        pokemonAtual -= 1;
        renderizaPokemon(pokemonAtual);
    } 
})

btnNext.addEventListener('click', () => {
    pokemonAtual += 1;
    renderizaPokemon(pokemonAtual);
})

renderizaPokemon(pokemonAtual);
