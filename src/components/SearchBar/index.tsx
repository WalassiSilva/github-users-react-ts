import { useState, KeyboardEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import classes from './index.module.css';

type SearchProps = {
    // função que recebe o user e retorta uma promise void
    loadUser: (userName: string) => Promise<void>
}

const SearchBar = ({loadUser} : SearchProps) => {

    const [userName, setUserName] = useState("");

    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'Enter'){
            loadUser(userName);
        }
    }

    return (
        <div className={classes.search}>
            <h2>Busque por um usuário</h2>
            <p>Conheça seus melhores repositorios</p>

            <div className={classes.search_container}>
                <input type="text" 
                placeholder='Digite o nome do usuário' 
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={handleKeyDown} />
                <button onClick={() => loadUser(userName)}><BsSearch /></button>
            </div>
        </div>
    )
}

export { SearchBar }