import { UserProps } from '../../types/user';
import { useState } from 'react'
import { SearchBar } from '../../components/SearchBar'
import { User } from '../../components/User';
import { Error } from '../../components/Error';

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);

    const LoadUser = async (userName: string) => {
        const res = await fetch(`https://api.github.com/users/${userName}`);

        const data = await res.json();

        const respositories = await fetch(`https://api.github.com/users/${userName}/repos?per_page=10`);
        
        console.log( await respositories.json());

        setError(false);
        setUser(null);

        if (res.status === 404) {
            setError(true);
            return;
        }

        const { avatar_url, login, location, followers, following, repos } = data;

        const userData: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following,
            repos,
        };

        setUser(userData);
    };
    return (
        <div>
            <SearchBar loadUser={LoadUser} />
            {user && <User {...user} />}
            {error && <Error />}
        </div>
    )
}

export { Home }