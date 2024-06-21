import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Blogpage from './pages/Blogpage';
import Landingpage from './pages/Landingpage';
import LoginPage from './pages/LoginPage';
import NotfoundPage from './pages/NotfoundPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import TopicPage from './pages/TopicPage';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import BlogEditPage from './pages/BlogEditPage';

export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			errorElement: <NotfoundPage />,
			children: [
				{
					index: true,
					element: (
						<ProtectedRoute>
							<Landingpage />
						</ProtectedRoute>
					),
				},
				{
					path: '/blogs',
					element: (
						<ProtectedRoute>
							<Blogpage />
						</ProtectedRoute>
					),
				},
				{
					path: '/blog/:blogId/edit',
					element: (
						<ProtectedRoute>
							<BlogEditPage />
						</ProtectedRoute>
					),
				},
				{
					path: '/blog/:blogId',
					element: (
						<ProtectedRoute>
							<BlogDetailsPage />
						</ProtectedRoute>
					),
				},
				{
					path: '/topic/:topicId',
					element: (
						<ProtectedRoute>
							<TopicPage />
						</ProtectedRoute>
					),
				},
			],
		},
		{
			path: '/login',
			element: <LoginPage />,
		},
	]);

	return <RouterProvider router={route}></RouterProvider>;
}
