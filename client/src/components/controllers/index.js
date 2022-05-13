function* generatorKey() {
    let number = 100000;
    while(true) {
        number++;
        yield number
    }
};

const keyForChild = generatorKey();

    // CONTROL DE FORMULARIO
function validation(newGame, nameGames) {
    let errors = {};

    const image = newGame.image ?
    newGame.image.split('.')[newGame.image.split('.').length - 1]
    : null;
    
    if(!newGame.platforms.length) {
        errors.platforms = 'Platform is required'
    } else if(newGame.platforms.includes('Select...') || newGame.genres.includes('Select...')) {
        alert('FATAL ERROR');
        return window.location.reload()
    };
    if(!newGame.name) {
        errors.name = 'Name is required'
    } else if(newGame.name > 40) {
        errors.name = 'Name must have only 40 characters'
    } else if(nameGames.includes(newGame.name)) {
        errors.name = 'El nombre ya existe! Por favor elija otro'
    }
    if(!newGame.description) {
        errors.description = 'Description is required'
    }else if(newGame.description.length < 50) {
        errors.description = 'La descripcion no debe contener menos de 50 caracteres'
    }
    if(!/^[0-9]+(\.[0-9]{0,2})?$/.test(newGame.rating)) {
        errors.rating = 'Rating debe contener solo numeros'
    }else if(newGame.rating > 5 || newGame.rating < 0) {
        errors.rating = 'Rating debe ser un numero entre 0 y 5'
    };
    if(newGame.released > new Date().toISOString().split('T')[0]) {
        errors.released = 'Released debe ser una fecha anterior a la seleccionada'
    } else if(newGame.released < "1958-10-17") {
        errors.released = 'Released debe ser una fecha posterior a la seleccionada'
    };
    if(image) {
        if(image.toLowerCase() !== 'jpg' && image.toLowerCase() !== 'png') {
                errors.image = 'Image solo acepta URL con formatos .JPG / .PNG'
            };
    };
    return errors
};

function handleChange(e, games, newGame, setNewGame, setErrors) {
    const nameGames = games.map(elem => elem.name)
    if(typeof newGame[e.target.name] === 'object') {
        if(e.target.value !== 'DEFAULT' && !newGame[e.target.name].includes(e.target.value)) {
            const gameCreate = {
                ...newGame,
                [e.target.name]: [...newGame[e.target.name], e.target.value]
            };
            setNewGame(gameCreate);
            setErrors(validation(gameCreate, nameGames));
        };
        e.target.value = 'DEFAULT'
    } else {
        const gameCreate = {
            ...newGame,
            [e.target.name]: e.target.value
        };
        setNewGame(gameCreate);
        setErrors(validation(gameCreate, nameGames));
    }
};

function handleSubmit(e, postNewGame, newGame, errors, setNewGame, history, dispatch) {
    e.preventDefault();
    if(!newGame.name || !newGame.description || !newGame.platforms.length){
        return alert('Faltan datos obligatorios')
    } else if(Object.keys(errors).length) {
        return alert('Verificar si los datos son validos')
    } else {
        dispatch(postNewGame(newGame));
        setNewGame({
            name: '',
            description: '',
            rating: 0,
            platforms: [],
            genres: [],
            image: '',
            released: new Date().toISOString().split('T')[0]
        });
        alert('Juego creado con exito!!');
        return history.push(`/home/create/redirecting`)

    };
};

function removeItem(e, setNewGame, newGame) {
    e.preventDefault()
    setNewGame({
        ...newGame,
        [e.target.name]: newGame[e.target.name].filter(item => item !== e.target.value)
    })
};

function changeSort(data, games, dispatch, isLoading, setFilter, filter) {
    switch(data) {
        case 'A-Z':
            games.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if(isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) {
                    if(nameA > nameB) return 1
                    if(nameA < nameB) return -1
                    return 0
                }
                if(!isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) return 1
                if(isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) return -1
                if(!isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) return nameA - nameB
                return 0
            });
            dispatch(isLoading(true));
            setFilter({...filter, sort: 'A-Z'});
            setTimeout(() => {dispatch(isLoading(false))}, 600);
            break;
        case 'Z-A':
            games.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if(isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) {
                    if(nameA < nameB) return 1
                    if(nameA > nameB) return -1
                    return 0
                }
                if(!isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) return -1
                if(isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) return 1
                if(!isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) return nameB - nameA
                return 0
            });
            dispatch(isLoading(true));
            setFilter({...filter, sort: 'Z-A'});
            setTimeout(() => {dispatch(isLoading(false))}, 600);
            break;
        case 'rating':
            games.sort((a, b) => {
                return b.rating - a.rating
            });
            dispatch(isLoading(true));
            setFilter({...filter, sort: 'rating'});
            setTimeout(() => {dispatch(isLoading(false))}, 600);
            break;
        default: break
    };
};

function sortByGenre(gameGenres, selectGenres) {
    for (let i = 0; i < selectGenres.length; i++) {
        if(!gameGenres.includes(selectGenres[i])) return false     
    }
    return true
};

function filterOrigin(e, filter, dispatch, setFilter, isLoading, resetPages) {
    if(e.target.value !== filter.isData) {
        dispatch(isLoading(true));
        setFilter({
            ...filter,
            isData: e.target.value
        });
        setTimeout(() => {dispatch(isLoading(false))}, 600);
    };
    resetPages();
};

function handleChangeHome(e, filter, dispatch, isLoading, setFilter, resetPages) {
    if(e.target.value !== 'DEFAULT' && !filter[e.target.name].includes(e.target.value)) {
        dispatch(isLoading(true));
        setFilter({
            ...filter,
            [e.target.name]: [...filter[e.target.name], e.target.value]
        });
        e.target.value = 'DEFAULT';
        setTimeout(() => {dispatch(isLoading(false))}, 600);
        resetPages();
    };
};

const removeItemHome = (e, dispatch, isLoading, setFilter, filter, resetPages) => {
    dispatch(isLoading(true));
    setFilter({
        ...filter,
        [e.target.name]: filter[e.target.name].filter(item => item !== e.target.value)
    });
    setTimeout(() => {dispatch(isLoading(false))}, 600);
    resetPages();
};

module.exports = {
    keyForChild,
    //FORM
    validation,
    handleChange,
    removeItem,
    handleSubmit,
    //HOME
    changeSort,
    sortByGenre,
    filterOrigin,
    handleChangeHome,
    removeItemHome
}