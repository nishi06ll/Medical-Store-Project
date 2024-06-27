import { createBrowserRouter } from "react-router-dom";
import Singup from "./components/auth/Singup";
import Login from "./components/auth/Login";
import ListPosts from "./components/blog/ListPost";
import AddPost from "./components/blog/AddPost";
import ViewPost from "./components/blog/ViewPost";
import DeleteListitem from "./components/blog/DeleteListitem";
import EditPost from "./components/blog/EditPost";
import App from "./App";

const router = createBrowserRouter([
    { path:'/app',element: <App/>},
    { path:'', element: <Singup/>},
    { path:'/login', element: <Login/>},
    { path:'/list', element:<ListPosts/>},
    { path:'/add', element: <AddPost/>},
    { path:'/blog/posts/delete', element:<DeleteListitem/>},
    { path:'/blog/posts/:postId/edit', element:<EditPost/>},
    { path: 'blog/posts/:postId', element: <ViewPost/>},
   
])

export default router