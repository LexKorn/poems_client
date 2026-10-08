import { LOGIN_ROUTE, REGISTER_ROUTE, AUTHOR_ROUTE, AUTHORS_ROUTE, MAIN_ROUTE, NOTFOUND_ROUTE } from "./utils/consts";
import { AuthorPage, AuthorsPage, AuthPage, MainPage, Page404 } from './pages';

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: AUTHORS_ROUTE,
        Component: AuthorsPage
    },
    {
        path: AUTHOR_ROUTE + '/:id',
        Component: AuthorPage
    },
    {
        path: NOTFOUND_ROUTE,
        Component: Page404
    },
];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTER_ROUTE,
        Component: AuthPage
    }
];