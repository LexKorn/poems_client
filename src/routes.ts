import { LOGIN_ROUTE, REGISTER_ROUTE, POEM_ROUTE, AUTHOR_ROUTE, AUTHORS_ROUTE, MAIN_ROUTE, NOTFOUND_ROUTE } from "./utils/consts";
import { AuthorPage, AuthorsPage, AuthPage, PoemPage, MainPage, Page404 } from './pages';

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: POEM_ROUTE + '/:id',
        Component: PoemPage
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