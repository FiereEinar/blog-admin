import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Blogpage from './pages/Blogpage';
import Landingpage from './pages/Landingpage';
import LoginPage from './pages/LoginPage';
import NotfoundPage from './pages/NotfoundPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import TopicPage from './pages/TopicPage';
import SignupPage from './pages/SignupPage';
import App from './App';

export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			errorElement: <NotfoundPage />,
			children: [
				{
					index: true,
					element: <Landingpage />,
				},
				{
					path: '/blogs',
					element: <Blogpage />,
				},
				{
					path: '/blog/:blogId',
					element: <BlogDetailsPage />,
				},
				{
					path: '/topic/:topicId',
					element: <TopicPage />,
				},
			],
		},
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/signup',
			element: <SignupPage />,
		},
	]);

	return <RouterProvider router={route}></RouterProvider>;
}
