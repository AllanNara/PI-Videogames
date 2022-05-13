function* generatorKey() {
    let number = 100000;
    while(true) {
        number++;
        yield number
    }
};

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
    };

    if(!newGame.description) {
        errors.description = 'Description is required'
    }else if(newGame.description.length < 50) {
        errors.description = 'La descripcion no debe contener menos de 50 caracteres'
    };
    
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

function handleChange(e, state, seting, setErrors, nameGames) {
    if(typeof state[e.target.name] === 'object') {
        if(e.target.value !== 'DEFAULT' && !state[e.target.name].includes(e.target.value)) {
            seting({
                ...state,
                [e.target.name]: [...state[e.target.name], e.target.value]
            });
            e.target.value = 'DEFAULT';
            if(setErrors) {
                setErrors(validation({
                    ...state,
                    [e.target.name]: [...state[e.target.name], e.target.value]
                }, nameGames));
            }
        };
    } else {
        seting({
            ...state,
            [e.target.name]: e.target.value
        });
        if(setErrors) {
            setErrors(validation({
                ...state,
                [e.target.name]: e.target.value
            }, nameGames));
        } 
    };
};

function removeItem(e, state, seting) {
    seting({
        ...state,
        [e.target.name]: state[e.target.name].filter(item => item !== e.target.value)
    });
};

function changeSort(e, games) {
    switch(e.target.value) {
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
            break;
        case 'rating':
            games.sort((a, b) => {
                return b.rating - a.rating
            });
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

const keyForChild = generatorKey();

module.exports = {
    keyForChild,
    validation,
    changeSort,
    sortByGenre,
    removeItem,
    handleChange
};
